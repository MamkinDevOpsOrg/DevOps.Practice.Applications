const express = require('express');
const friendsRouter = require('./friends/friends.router');
const loadRouter = require('./load/load.router');
const configRouter = require('./config/config.router');

const api = express.Router();

api.use('/friends', friendsRouter);
api.use('/load', loadRouter);
api.use('/config', configRouter);

module.exports = api;
