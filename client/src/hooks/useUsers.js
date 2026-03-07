import { useState, useEffect, useCallback } from "react";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/usersApi.js";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const addUser = async (payload) => {
    const newUser = await createUser(payload);
    setUsers((prev) => [newUser, ...prev]);
  };

  const edit = async (id, payload) => {
    const updated = await updateUser(id, payload);
    setUsers((prev) => prev.map((u) => (u._id === id ? updated : u)));
  };

  const remove = async (id) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  return { users, loading, error, addUser, edit, remove, reload: loadUsers };
}
