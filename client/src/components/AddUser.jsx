import { useState } from "react";

export default function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await onUserAdded({ name: name.trim(), email: email.trim(), status });
      setName("");
      setEmail("");
      setStatus("active");
    } catch {
      setError("Failed to add user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Add User</h2>
      <input
        type="text"
        placeholder="Full name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="email"
        placeholder="Email address *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        disabled={loading}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
      </select>
      {error && <p className="error-text">{error}</p>}
      <button type="submit" disabled={loading || !name.trim() || !email.trim()}>
        {loading ? "Adding…" : "Add User"}
      </button>
    </form>
  );
}
