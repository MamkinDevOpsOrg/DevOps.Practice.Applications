const express = require('express');
const configController = require('./config.controller');

const configRouter = express.Router();

configRouter.get('/', configController.getConfig);

module.exports = configRouter;
