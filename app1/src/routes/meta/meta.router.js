const express = require('express');
const metaController = require('./meta.controller');

const metaRouter = express.Router();

metaRouter.get('/', metaController.getInstanceIdentity);

module.exports = metaRouter;
