import { ZodError } from "zod";

const errorHandler = (err, req, res, next) => {
  // Zod validation errors → 400 Bad Request
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: err.errors
        .map((e) => `${e.path.join(".") || "field"}: ${e.message}`)
        .join("; "),
    });
  }

  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
