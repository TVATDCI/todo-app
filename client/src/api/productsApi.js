import apiClient from "./client.js";

const BASE = "/api/products";

export const fetchProducts = async () => {
  const { data } = await apiClient.get(BASE);
  return data.data;
};

export const fetchProductById = async (id) => {
  const { data } = await apiClient.get(`${BASE}/${id}`);
  return data.data;
};

export const createProduct = async (payload) => {
  const { data } = await apiClient.post(BASE, payload);
  return data.data;
};

export const updateProduct = async (id, payload) => {
  const { data } = await apiClient.put(`${BASE}/${id}`, payload);
  return data.data;
};

export const deleteProduct = async (id) => {
  await apiClient.delete(`${BASE}/${id}`);
};
