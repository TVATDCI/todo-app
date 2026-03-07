// fe-client/src/components/AddProduct.jsx
import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/products", {
        name,
        price: parseFloat(price),
      });
      setMessage("Product added successfully!");
      onProductAdded(response.data); // Notify parent of new product
      setName("");
      setPrice("");
    } catch (error) {
      setMessage("Failed to add product. Please try again.");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <h3>Added product will be store in the backend</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProduct;
