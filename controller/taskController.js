const log4js = require('log4js');
const path = require('path');

const Task = require('../models/Task');

const logger = log4js.getLogger(`${path.basename(__filename).split('.')[0]}`);

const DEFAULT_PAGE_SIZE = process.env.DEFAULT_PAGE_SIZE;
const DEFAULT_PAGE_NUMBER = process.env.DEFAULT_PAGE_NUMBER;

const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status });
    res.status(201).send({
      success: true,
      message: 'Task created successfully.',
      payload: { task },
    });
  } catch (err) {
    logger.error(err.message)(err);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res
        .status(404)
        .send({ success: false, message: 'Task not found' });
    }
    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();
    res.status(200).send({
      success: true,
      message: 'Task updated successfully.',
      payload: { task },
    });
  } catch (err) {
    logger.error(err.message)(err.message);
    res.status(500).send({ success: false, message: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const page = req.query.page || DEFAULT_PAGE_NUMBER;
    const pageSize = req.query.pageSize || DEFAULT_PAGE_SIZE;
    const offset = (page - 1) * pageSize;

    const tasks = await Task.findAndCountAll({
      limit: pageSize,
      offset,
      order: [['updatedAt', 'DESC']],
    });
    const response = {
      totalCount: tasks.count,
      pageNumber: page,
      pageSize: pageSize,
      data: tasks.rows,
    };

    res.status(200).send({
      success: true,
      message: 'Tasks retrieved successfully.',
      payload: response,
    });
  } catch (err) {
    logger.error(err.message)(error);
    res.status(500).send({ success: false, message: 'Error fetching tasks' });
  }
};

module.exports = {
  createTask,
  updateTask,
  getTasks,
};
