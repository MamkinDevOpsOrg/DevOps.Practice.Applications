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
      SELECT
        COUNT(*) AS total_sessions,
        COUNT(DISTINCT ph.session_id) AS sessions_with_hits,
        COUNT(DISTINCT pc.session_id) AS sessions_with_clicks
      FROM user_session us
      LEFT JOIN page_hit ph ON us.session_id = ph.session_id
      LEFT JOIN page_click pc ON us.session_id = pc.session_id;
    `);

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows[0]),
    };
  } catch (err) {
    console.error('Query error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  } finally {
    await client.end();
  }
};
