import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

/**
 * Lambda handler for consuming analytics events from SQS.
 *
 * - Uses pg.Pool to allow safe re-use of DB connections.
 * - Wraps each record in try/catch to isolate failures.
 * - Designed for batch processing from SQS.
 */
export const handler = async (event) => {
  const client = await pool.connect();

  try {
    for (const record of event.Records) {
      try {
        const body = JSON.parse(record.body);
        const { session_id, user_id, event_type } = body;

        if (!session_id || !user_id || !event_type) {
          console.warn(
            'Skipping record — missing session_id/user_id/event_type'
          );
          continue;
        }

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
          console.warn('Unknown event_type:', event_type);
        }
      } catch (recordErr) {
        console.error('⚠️ Failed to process message:', recordErr);
      }
    }

    return {
      statusCode: 200,
      body: 'Batch processed successfully',
    };
  } catch (err) {
    console.error('❌ Error processing batch:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Batch failed', details: err.message }),
    };
  } finally {
    client.release();
  }
};
