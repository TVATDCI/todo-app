import apiClient from "./client.js";

const BASE = "/api/users";

export const fetchUsers = async () => {
  const { data } = await apiClient.get(BASE);
  return data.data;
};

export const fetchUserById = async (id) => {
  const { data } = await apiClient.get(`${BASE}/${id}`);
  return data.data;
};

export const createUser = async (payload) => {
  const { data } = await apiClient.post(BASE, payload);
  return data.data;
};

export const updateUser = async (id, payload) => {
  const { data } = await apiClient.put(`${BASE}/${id}`, payload);
  return data.data;
};

export const deleteUser = async (id) => {
  await apiClient.delete(`${BASE}/${id}`);
};
