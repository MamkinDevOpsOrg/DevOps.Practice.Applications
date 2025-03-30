const express = require('express');
const friendsRouter = require('./friends/friends.router');

const api = express.Router();

api.use('/friends', friendsRouter);

module.exports = api;
