import Task from "../models/Task.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { z } from "zod";

// Zod validation schema for creating a task
const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  category: z
    .string()
    .max(50, "Category cannot exceed 50 characters")
    .optional()
    .default("general"),
});

// Zod validation schema for updating a task
const updateTaskSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  category: z.string().max(50).optional(),
  completed: z.boolean().optional(),
});

/**
 * Get all tasks
 * @route GET /api/tasks
 */
export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().lean();
  return sendSuccess(res, tasks, "Tasks retrieved successfully");
});

/**
 * Get a single task by ID
 * @route GET /api/tasks/:id
 */
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).lean();

  if (!task) {
    return sendError(res, "Task not found", 404);
  }

  return sendSuccess(res, task, "Task retrieved successfully");
});

/**
 * Create a new task
 * @route POST /api/tasks
 */
export const createTask = asyncHandler(async (req, res) => {
  // Validate request body
  const validatedData = createTaskSchema.parse(req.body);

  const task = await Task.create(validatedData);
  return sendSuccess(res, task, "Task created successfully", 201);
});

/**
 * Update a task
 * @route PUT /api/tasks/:id
 */
export const updateTask = asyncHandler(async (req, res) => {
  // Validate request body
  const validatedData = updateTaskSchema.parse(req.body);

  const task = await Task.findById(req.params.id);

  if (!task) {
    return sendError(res, "Task not found", 404);
  }

  // Update fields
  Object.assign(task, validatedData);
  await task.save();

  return sendSuccess(res, task, "Task updated successfully");
});

/**
 * Delete a task
 * @route DELETE /api/tasks/:id
 */
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return sendError(res, "Task not found", 404);
  }

  await task.deleteOne();

  return sendSuccess(res, null, "Task deleted successfully");
});

/**
 * Toggle task completion status
 * @route PATCH /api/tasks/:id/toggle
 */
export const toggleTaskCompletion = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return sendError(res, "Task not found", 404);
  }

  task.completed = !task.completed;
  await task.save();

  return sendSuccess(
    res,
    task,
    `Task marked as ${task.completed ? "completed" : "pending"}`,
  );
});
