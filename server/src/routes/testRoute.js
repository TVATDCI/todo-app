import express from 'express';
import { getTestController } from '../controllers/testController.js';

const router = express.Router();

// Example route handler
router.get('/example', getTestController); // GET /api/example

export default router;
