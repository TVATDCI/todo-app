import express from 'express';
import { getAllUsers, getUserById, createUser } from '../controllers/userController.js';

const router = express.Router();

// Routes for users
router.get('/', getAllUsers); // GET /api/users
router.get('/:id', getUserById); // GET /api/users/:id
router.post('/', createUser); // POST /api/users


export default router;
