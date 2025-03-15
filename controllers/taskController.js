import { Task } from '../models/taskModel.js';
import { asyncWrapper } from '../middleware/asyncWrapper.js';
import { createCustomError } from '../errors/custom-error.js';

export const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});

  res.status(200).json({
    success: true,
    results: tasks.length,
    data: { tasks },
  });
});

export const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ success: true, data: { task } });
});

export const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: { task },
  });
});

export const updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: { task },
  });
});

export const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    msg: 'Task Deleted Successfully',
  });
});
