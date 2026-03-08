import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// Route imports
import tasksRoute from "./routes/tasksRoute.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";

// Middleware imports
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Security: Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
