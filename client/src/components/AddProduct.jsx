import { useState } from "react";

export default function AddProduct({ onProductAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedPrice = parseFloat(price);
    if (!name.trim() || isNaN(parsedPrice) || parsedPrice < 0) return;
    setLoading(true);
    setError(null);
    try {
      await onProductAdded({
        name: name.trim(),
        price: parsedPrice,
        description,
      });
      setName("");
      setPrice("");
      setDescription("");
    } catch {
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="number"
        placeholder="Price *"
        value={price}
        min="0"
        step="0.01"
        onChange={(e) => setPrice(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />
      {error && <p className="error-text">{error}</p>}
      <button type="submit" disabled={loading || !name.trim() || !price}>
        {loading ? "Adding…" : "Add Product"}
      </button>
    </form>
  );
}
