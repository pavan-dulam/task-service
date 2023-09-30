// models/Task.js
const { Sequelize, DataTypes } = require('sequelize');
const statusEnum = require('../enums/status');

const Database = require('../utils/dbConnector');

const db = new Database();
const sequelize = db.connection;
const TASK_TABLE_NAME = process.env.TASK_TABLE_NAME;
const Task = sequelize.define(TASK_TABLE_NAME, {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Title cannot be empty.',
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Status cannot be empty.',
      },
      isIn: {
        args: [[statusEnum.OPEN, statusEnum.INPROGRESS, statusEnum.COMPLETED]],
        msg: `Invalid status value.`,
      },
    },
  },
});

sequelize.sync(); // Create the table if it doesn't exist

module.exports = Task;
