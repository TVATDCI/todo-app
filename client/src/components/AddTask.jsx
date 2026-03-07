// src/components/AddTask.jsx
import React, { useState } from "react";
import { createTask } from "../api/tasksApi";

const AddTask = ({ onTaskAdded }) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      const addedTask = await createTask(newTask);
      onTaskAdded(addedTask); // Notify parent component of new task
      setNewTask(""); // Clear input
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
