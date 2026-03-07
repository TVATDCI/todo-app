import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 5002; // Changed port to avoid conflict

// Add middleware to enable CORS to allow requests from the frontend
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

const FILE_PATH = "./users.txt";

// route check
app.get("/", (req, res) => {
  res.send("Hello, world! This fs.js file is running on the backend server.");
});

// POST: Save user data to users.txt
app.post("/users", (req, res) => {
  const user = req.body;

  if (!user.name || !user.email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  // Format user data as a string
  const userData = `Name: ${user.name}, Email: ${user.email}\n`;

  // Append the user data to the file
  fs.appendFile(FILE_PATH, userData, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res.status(500).json({ error: "Failed to save user data." });
    }
    res.status(201).json({ message: "User data saved successfully!" });
  });
});

// GET: Retrieve user data from users.txt
app.get("/users", (req, res) => {
  fs.readFile(FILE_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Failed to retrieve user data." });
    }

    const users = data.trim().split("\n").map((line, index) => ({
      id: index + 1,
      user: line,
    }));

    res.json(users);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
