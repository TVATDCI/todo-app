import express from 'express';
import { getAllProducts, getProductById, createProduct } from "../controllers/productController.js";

const router = express.Router();

// Routes for products
router.get('/', getAllProducts); // GET /api/products
router.get('/:id', getProductById); // GET /api/products/:id
router.post('/', createProduct); // POST /api/products

export default router;
