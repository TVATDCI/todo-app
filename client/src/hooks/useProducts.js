import { useState, useEffect, useCallback } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productsApi.js";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addProduct = async (payload) => {
    const newProduct = await createProduct(payload);
    setProducts((prev) => [newProduct, ...prev]);
  };

  const edit = async (id, payload) => {
    const updated = await updateProduct(id, payload);
    setProducts((prev) => prev.map((p) => (p._id === id ? updated : p)));
  };

  const remove = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return {
    products,
    loading,
    error,
    addProduct,
    edit,
    remove,
    reload: loadProducts,
  };
}
