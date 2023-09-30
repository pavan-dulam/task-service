const { Op } = require('sequelize');
const log4js = require('log4js');
const path = require('path');

const Task = require('../models/Task');

const logger = log4js.getLogger(`${path.basename(__filename).split('.')[0]}`);

const status = require('../enums/status');

const calculateMetrics = async (req, res) => {
  try {
    const { startYear, startMonth, endYear, endMonth } = req.query;
    if (startYear && startMonth && endYear && endMonth) {
      // Create an array of month-year combinations within the specified range
      const dateRange = [];
      let currentDate = new Date(startYear, startMonth - 1); // Month is 0-based
      const endDate = new Date(endYear, endMonth - 1);

      while (currentDate <= endDate) {
        const month = currentDate.toLocaleString('default', { month: 'long' });
        const year = currentDate.getFullYear();
        dateRange.push(`${month} ${year}`);
        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      // Calculate metrics for each month in the date range
      const monthMetrics = await Promise.all(
        dateRange.map(async (date) => {
          const endDateOfMonth = new Date(
            new Date(date).getFullYear(),
            new Date(date).getMonth() + 1,
            0,
            23,
            59,
            59,
            999
          );
          logger.log(
            'new Date(date)===',
            new Date(date),
            'endDateOfMonth=',
            endDateOfMonth
          );
          const openTasks = await Task.count({
            where: {
              status: 'open',
              createdAt: {
                [Op.gte]: new Date(date),
                [Op.lt]: endDateOfMonth,
              },
            },
          });
          const inProgressTasks = await Task.count({
            where: {
              status: 'inprogress',
              createdAt: {
                [Op.gte]: new Date(date),
                [Op.lt]: endDateOfMonth,
              },
            },
          });
          const completedTasks = await Task.count({
            where: {
              status: 'completed',
              createdAt: {
                [Op.gte]: new Date(date),
                [Op.lt]: endDateOfMonth,
              },
            },
          });

          return {
            date: date,
            metrics: {
              open_tasks: openTasks,
              inprogress_tasks: inProgressTasks,
              completed_tasks: completedTasks,
            },
          };
        })
      );
      res.status(200).json(monthMetrics);
    } else {
      // Calculate overall metrics
      const openTasks = await Task.count({ where: { status: status.OPEN } });
      const inProgressTasks = await Task.count({
        where: { status: status.INPROGRESS },
      });
      const completedTasks = await Task.count({
        where: { status: status.COMPLETED },
      });

      res.status(200).json({
        open_tasks: openTasks,
        inprogress_tasks: inProgressTasks,
        completed_tasks: completedTasks,
      });
    }
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ error: 'Error calculating task metrics' });
  }
};

module.exports = {
  calculateMetrics,
};
