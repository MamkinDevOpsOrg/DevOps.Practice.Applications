const fetch = require('node-fetch');

async function getAnalyticsStats(req, res) {
  try {
    const response = await fetch(process.env.ANALYTICS_STATS_URL);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error('Failed to fetch analytics stats:', err);
    res.status(500).json({ error: 'Unable to fetch analytics stats' });
  }
}

module.exports = { getAnalyticsStats };
