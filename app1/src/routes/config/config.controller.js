const ANALYTICS_STATS_URL = process.env.ANALYTICS_STATS_URL || '';

async function getConfig(req, res) {
  res.json({ analyticsStatsUrl: ANALYTICS_STATS_URL });
}

module.exports = { getConfig };
