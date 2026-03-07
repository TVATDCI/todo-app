// src/components/TaskList.jsx
import React, { useEffect, useState } from "react";
import { fetchTasks } from "../api/tasksApi";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    loadTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <ul className="taskUi">
        {tasks.map((task) => (
          <li className="taskLi" key={task.id}>
            {task.title} {task.category} {task.description}{" "}
            {task.completed ? "(Completed)" : "(Pending)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
