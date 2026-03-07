import { useState, useEffect, useCallback } from "react";
import {
  fetchTasks,
  createTask,
  toggleTask,
  deleteTask,
  updateTask,
} from "../api/tasksApi.js";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch {
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (payload) => {
    const newTask = await createTask(payload);
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggle = async (id) => {
    const updated = await toggleTask(id);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const edit = async (id, payload) => {
    const updated = await updateTask(id, payload);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const remove = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    toggle,
    edit,
    remove,
    reload: loadTasks,
  };
}
