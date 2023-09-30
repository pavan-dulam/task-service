const express = require('express');
const Router = express.Router();
const { catchErrors } = require('../utils/custom-helpers');
const metricsController = require('../controller/metricsController');

// Calculate and retrieve month-wise task metrics within a date range
Router.get('/', catchErrors(metricsController.calculateMetrics));

module.exports = Router;
