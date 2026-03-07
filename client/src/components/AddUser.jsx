// fe-client/src/components/AddUser.jsx
import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5002/users", {
        name,
        email,
      });
      setMessage(response.data.message);
      setName("");
      setEmail("");
    } catch (error) {
      setMessage("Failed to add user. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Please Add User's name & Email. All will store in user.txt</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddUser;
