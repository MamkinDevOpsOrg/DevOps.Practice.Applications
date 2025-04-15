const express = require('express');
const loadController = require('./load.controller');

const loadRouter = express.Router();

loadRouter.get('/cpu', loadController.load_cpu);
loadRouter.get('/cpu/:cpu_utilization', loadController.load_cpu);
loadRouter.get('/mem', loadController.load_mem);

module.exports = loadRouter;
