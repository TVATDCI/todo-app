// Version: 2
import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js"; // Global error handling middleware
import userRoutes from "./routes/userRoute.js"; // Import user routes
import productRoutes from "./routes/productRoute.js"; // Import product routes (if applicable)

const app = express();
const port = 8000;

// Middleware for cross-origin and parsing JSON
app.use(cors());
app.use(express.json());

// Sample middlewares (optional, but showing for learning purposes)
app.use((req, res, next) => {
  console.log("First middleware executed!");
  next();
});

app.use((req, res, next) => {
  console.log("Second middleware executed!");
  res.setHeader("X-Powered-By", "My Awesome Middleware");
  next();
});

app.use((req, res, next) => {
  console.log("Last middleware executed!");
  next();
});

// Attach Routes
app.use("/api/users", userRoutes); // All user-related routes (GET/POST)
app.use("/api/products", productRoutes); // All product-related routes (GET/POST)

// Base endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the version 2: This is a lazy Backend Server!");
});

// Sample Error Handling
app.get("/test-error", (req, res) => {
  throw new Error(
    "This is an internal test error. Look above it is set with status (in errorHandler.js) code 500 - Internal Server Error."
  );
});

// Global Error Handler (placed after all routes)
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

{
  /**
  server.js version 1:
  import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js"; // Ensure the path is correct

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json()); // For parsing JSON in request bodies

// Sample middleware (First, Second, Last)
const firstMiddleware = (req, res, next) => {
  console.log("First middleware executed!");
  next();
};

const secondMiddleware = (req, res, next) => {
  console.log("Second middleware executed!");
  res.setHeader("X-Powered-By", "My Awesome Middleware");
  next();
};

const lastMiddleware = (req, res, next) => {
  console.log("Last middleware executed!");
  next();
};

app.use(firstMiddleware);
app.use(secondMiddleware);
app.use(lastMiddleware);

// Sample data and routes
const users = [
  { id: 1, name: "Jane Austen", status: "I find myself in tolerable health." },
  { id: 2, name: "John Doe", status: "Learning backend development." },
];

app.get("/", (req, res) => {
  res.send("Welcome to the lazy Backend Server!");
});

app.get("/user", (req, res) => {
  res.json(users);
});

app.post("/user", (req, res) => {
  const { id, name, status } = req.body;

  if (!id || !name || !status) {
    const error = new Error("Please provide id, name, and status.");
    error.statusCode = 400;
    throw error;
  }

  const user = users.find((u) => u.id === id);
  if (user) {
    user.name = name;
    user.status = status;
    res.json({ message: "User updated successfully.", user });
  } else {
    res.status(404).json({ message: "User not found." });
  }
});

app.patch("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, status } = req.body;

  const user = users.find((u) => u.id === userId);
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  if (name) user.name = name;
  if (status) user.status = status;

  res.json({ message: "User updated successfully.", user });
});

// Global Error Handler (Must come after all routes/middleware)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

   */
}
