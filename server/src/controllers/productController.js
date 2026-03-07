import Product from "../models/Product.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { z } from "zod";

// Zod validation schema for creating a product
const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Name cannot exceed 100 characters"),
  price: z.number().min(0, "Price cannot be negative"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

// Zod validation schema for updating a product
const updateProductSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  price: z.number().min(0).optional(),
  description: z.string().max(500).optional(),
});

/**
 * Get all products
 * @route GET /api/products
 */
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().lean();
  return sendSuccess(res, products, "Products retrieved successfully");
});

/**
 * Get a single product by ID
 * @route GET /api/products/:id
 */
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).lean();

  if (!product) {
    return sendError(res, "Product not found", 404);
  }

  return sendSuccess(res, product, "Product retrieved successfully");
});

/**
 * Create a new product
 * @route POST /api/products
 */
export const createProduct = asyncHandler(async (req, res) => {
  // Validate request body
  const validatedData = createProductSchema.parse(req.body);

  const product = await Product.create(validatedData);
  return sendSuccess(res, product, "Product created successfully", 201);
});

/**
 * Update a product
 * @route PUT /api/products/:id
 */
export const updateProduct = asyncHandler(async (req, res) => {
  // Validate request body
  const validatedData = updateProductSchema.parse(req.body);

  const product = await Product.findById(req.params.id);

  if (!product) {
    return sendError(res, "Product not found", 404);
  }

  // Update fields
  Object.assign(product, validatedData);
  await product.save();

  return sendSuccess(res, product, "Product updated successfully");
});

/**
 * Delete a product
 * @route DELETE /api/products/:id
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return sendError(res, "Product not found", 404);
  }

  await product.deleteOne();

  return sendSuccess(res, null, "Product deleted successfully");
});
