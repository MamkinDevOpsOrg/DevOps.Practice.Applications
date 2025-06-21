const express = require('express');
const { getAnalyticsStats } = require('./analytics.controller');

const router = express.Router();

router.get('/stats', getAnalyticsStats);

module.exports = router;
