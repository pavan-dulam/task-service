const express = require('express');
const Router = express.Router();
const { catchErrors } = require('../utils/custom-helpers');
const taskController = require('../controller/taskController');

// Create a task
Router.post('/', catchErrors(taskController.createTask));

// Update a task
Router.put('/:id', catchErrors(taskController.updateTask));

// Get all tasks with pagination
Router.get('/', catchErrors(taskController.getTasks));

module.exports = Router;
