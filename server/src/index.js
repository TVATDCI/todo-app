import express from "express";
import cors from "cors"; 
import testRoute from "../src/routes/testRoute.js";
import tasksRoute from "../src/routes/tasksRoute.js";
import productRoute from "../src/routes/productRoute.js";
import userRoute from "../src/routes/userRoute.js";
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware setup
app.use(cors()); // Enable CORS if needed
app.use(express.json()); // Parse incoming JSON requests

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello, world! This is your backend server. It's up and running! Today is a good day to code. Let's learn about REST APIs and how to build them. You can find me in index.js in the src folder.");
});

// Example endpoint
app.get("/users", (req, res) => {
  res.send("This is the users route or endpoint in the backend server. In this case, http://localhost:5001/users. It is sent as a string response to the client.");
});

// Modularized routes
app.use("/api/test", testRoute); // Existing test route
app.use("/api/tasks", tasksRoute); // Tasks route
app.use("/api/products", productRoute); // Product management route
app.use("/api/users", userRoute); // User management route

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
