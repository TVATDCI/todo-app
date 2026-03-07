import apiClient from "./client.js";

const BASE = "/api/tasks";

export const fetchTasks = async () => {
  const { data } = await apiClient.get(BASE);
  return data.data;
};

export const fetchTaskById = async (id) => {
  const { data } = await apiClient.get(`${BASE}/${id}`);
  return data.data;
};

export const createTask = async (payload) => {
  const { data } = await apiClient.post(BASE, payload);
  return data.data;
};

export const updateTask = async (id, payload) => {
  const { data } = await apiClient.put(`${BASE}/${id}`, payload);
  return data.data;
};

export const toggleTask = async (id) => {
  const { data } = await apiClient.patch(`${BASE}/${id}/toggle`);
  return data.data;
};

export const deleteTask = async (id) => {
  await apiClient.delete(`${BASE}/${id}`);
};
