import { Client } from 'pg';

export const handler = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();

    const result = await client.query(`
      EXPLAIN ANALYZE
      SELECT
        *
      FROM user_session us
      LEFT JOIN page_hit ph ON us.session_id = ph.session_id
      LEFT JOIN page_click pc ON us.session_id = pc.session_id
      WHERE us.session_id = (
        SELECT session_id
        FROM user_session
        ORDER BY RANDOM()
        LIMIT 1
      );
    `);

    return {
      statusCode: 200,
      body: JSON.stringify({
        explain: result.rows.map((row) => row['QUERY PLAN']),
      }),
    };
  } catch (error) {
    console.error('❌ Error executing EXPLAIN ANALYZE query:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    await client.end();
  }
};
