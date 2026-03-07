// fe-client/src/api/tasksApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5001/api/tasks";

export const fetchTasks = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createTask = async (title) => {
  const response = await axios.post(BASE_URL, { title });
  return response.data;
};

export const updateTask = async (id, updatedTask) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedTask);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
