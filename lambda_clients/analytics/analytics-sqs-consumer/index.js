import { Client } from 'pg';

const client = new Client({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

export const handler = async (event) => {
  try {
    await client.connect();

    for (const record of event.Records) {
      // Lambda receives messages in batches from SQS (up to batchSize).
      // If an error occurs during processing, the ENTIRE batch is retried.
      // To avoid message loss or duplicate processing:
      // - Ensure inserts are idempotent (e.g., use ON CONFLICT in SQL).
      // - Wrap per-message logic in try/catch to prevent one failure from affecting others.
      // - Consider configuring a Dead Letter Queue (DLQ) for permanently failing messages.

      const body = JSON.parse(record.body);

      const { session_id, user_id, event_type } = body;
      if (!session_id || !user_id || !event_type) continue;

      await client.query(
        `
        INSERT INTO user_session (session_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (session_id) DO NOTHING
      `,
        [session_id, user_id]
      );

      if (event_type === 'page_hit') {
        const { hit_id, url, referrer, user_agent, timestamp } = body;
        await client.query(
          `
          INSERT INTO page_hit (hit_id, session_id, url, referrer, user_agent, timestamp)
          VALUES ($1, $2, $3, $4, $5, $6)
        `,
          [hit_id, session_id, url, referrer, user_agent, timestamp]
        );
      } else if (event_type === 'page_click') {
        const {
          click_id,
          url,
          element_id,
          element_class,
          element_text,
          timestamp,
        } = body;
        await client.query(
          `
          INSERT INTO page_click (click_id, session_id, url, element_id, element_class, element_text, timestamp)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
          [
            click_id,
            session_id,
            url,
            element_id,
            element_class,
            element_text,
            timestamp,
          ]
        );
      } else {
        console.warn('⚠️ Unknown event_type:', event_type);
      }
    }

    await client.end();
    return { statusCode: 200, body: 'Batch processed' };
  } catch (err) {
    console.error('❌ Error processing batch:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process events',
        details: err.message,
      }),
    };
  }
};
