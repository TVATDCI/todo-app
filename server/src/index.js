import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Route imports
import tasksRoute from "./routes/tasksRoute.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";

// Middleware imports
import errorHandler from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Security: Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

// Middleware setup
app.use(helmet()); // Security headers
app.use(morgan("dev")); // HTTP request logging
app.use(limiter); // Apply rate limiting
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  }),
); // Enable CORS with restricted origin
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Todo App API is running",
    version: "1.0.0",
  });
});

// API routes
app.use("/api/tasks", tasksRoute);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Start HTTP server
    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      console.log(`\n${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        console.log("HTTP server closed");

        try {
          await mongoose.connection.close();
          console.log("MongoDB connection closed");
          process.exit(0);
        } catch (err) {
          console.error("Error during shutdown:", err);
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error("Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    // Listen for shutdown signals
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
