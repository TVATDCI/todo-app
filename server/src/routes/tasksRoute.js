// be-server/routes/tasksRoute.js
import express from "express";

const router = express.Router();

// In-memory task data (for simplicity)
let tasks = [
  { id: 1, title: "Sample Task 1:", completed: false },
  { id: 2, title: "Sample Task 2:", completed: true },
  {
    id: 3,
    title: "Going track of your daily tasks is important",
    description:
      "In the world of technology, it is important to keep track of your daily tasks. This is a sample task to demonstrate how to build a simple todo app.",
    category: "Self Improvement",
  },
];

// GET all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET formatted task details
router.get("/formatted/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const formattedTask = `
    Task ID: ${task.id}.
    Title: ${task.title}.
    Description: ${task.description}.
    Category: ${task.category}.
  `;
  res.send(formattedTask);
});

// POST a new task
router.post("/", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  res.json(newTask);
});

// PUT to update a task's completion status
router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = req.body.completed ?? task.completed;
  res.json(task);
});

// DELETE a task
router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.json(deletedTask);
});

export default router;
