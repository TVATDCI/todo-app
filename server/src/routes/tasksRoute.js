import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from "../controllers/taskController.js";

const router = express.Router();

// Routes for tasks
router.get("/", getAllTasks); // GET /api/tasks
router.get("/:id", getTaskById); // GET /api/tasks/:id
router.post("/", createTask); // POST /api/tasks
router.put("/:id", updateTask); // PUT /api/tasks/:id
router.delete("/:id", deleteTask); // DELETE /api/tasks/:id
router.patch("/:id/toggle", toggleTaskCompletion); // PATCH /api/tasks/:id/toggle

export default router;
