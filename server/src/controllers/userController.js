import User from "../models/User.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { z } from "zod";

// Zod validation schema for creating a user
const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "User name is required")
    .max(50, "Name cannot exceed 50 characters"),
  email: z.string().email("Invalid email format"),
  status: z
    .enum(["active", "inactive", "pending"])
    .optional()
    .default("active"),
});

// Zod validation schema for updating a user
const updateUserSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  email: z.string().email().optional(),
  status: z.enum(["active", "inactive", "pending"]).optional(),
});

/**
 * Get all users
 * @route GET /api/users
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().lean();
  return sendSuccess(res, users, "Users retrieved successfully");
});

/**
 * Get a single user by ID
 * @route GET /api/users/:id
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).lean();

  if (!user) {
    return sendError(res, "User not found", 404);
  }

  return sendSuccess(res, user, "User retrieved successfully");
});

/**
 * Create a new user
 * @route POST /api/users
 */
export const createUser = asyncHandler(async (req, res) => {
  // Validate request body
  const validatedData = createUserSchema.parse(req.body);

  const user = await User.create(validatedData);
  return sendSuccess(res, user, "User created successfully", 201);
});

/**
 * Update a user
 * @route PUT /api/users/:id
 */
export const updateUser = asyncHandler(async (req, res) => {
  // Validate request body
  const validatedData = updateUserSchema.parse(req.body);

  const user = await User.findById(req.params.id);

  if (!user) {
    return sendError(res, "User not found", 404);
  }

  // Check if email is being changed and if it's already in use
  if (validatedData.email && validatedData.email !== user.email) {
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return sendError(res, "Email already in use", 400);
    }
  }

  // Update fields
  Object.assign(user, validatedData);
  await user.save();

  return sendSuccess(res, user, "User updated successfully");
});

/**
 * Delete a user
 * @route DELETE /api/users/:id
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return sendError(res, "User not found", 404);
  }

  await user.deleteOne();

  return sendSuccess(res, null, "User deleted successfully");
});
