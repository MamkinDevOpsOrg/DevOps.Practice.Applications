const express = require('express');
const friendsRouter = require('./friends/friends.router');
const loadRouter = require('./load/load.router');
const analyticsRouter = require('./analytics/analytics.router');

const api = express.Router();

api.use('/friends', friendsRouter);
api.use('/load', loadRouter);
api.use('/analytics', analyticsRouter);

module.exports = api;
