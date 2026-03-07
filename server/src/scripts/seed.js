import dotenv from "dotenv";
import mongoose from "mongoose";
import Task from "../models/Task.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

// Load environment variables
dotenv.config({ path: "./.env" });

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Task.deleteMany({});
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data");

    // Seed Tasks
    const tasks = [
      {
        title: "Learn React",
        description: "Study React hooks and components",
        category: "coding",
        completed: false,
      },
      {
        title: "Build a todo app",
        description: "Create a full-stack todo application",
        category: "project",
        completed: true,
      },
      {
        title: "Read documentation",
        description: "Read MongoDB and Mongoose docs",
        category: "learning",
        completed: false,
      },
      {
        title: "Write tests",
        description: "Add unit tests for controllers",
        category: "testing",
        completed: false,
      },
      {
        title: "Deploy to production",
        description: "Set up Docker and deploy",
        category: "devops",
        completed: false,
      },
      {
        title: "Code review",
        description: "Review pull requests",
        category: "collaboration",
        completed: true,
      },
      {
        title: "Fix bugs",
        description: "Address reported issues",
        category: "bug",
        completed: true,
      },
      {
        title: "Update dependencies",
        description: "Keep packages up to date",
        category: "maintenance",
        completed: false,
      },
    ];

    // Seed Users
    const users = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        status: "active",
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        status: "active",
      },
      {
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        status: "inactive",
      },
      {
        name: "Alice Williams",
        email: "alice.williams@example.com",
        status: "active",
      },
      {
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        status: "pending",
      },
    ];

    // Seed Products
    const products = [
      {
        name: "Laptop",
        price: 999.99,
        description: "High-performance laptop for developers",
      },
      {
        name: "Mouse",
        price: 49.99,
        description: "Wireless ergonomic mouse",
      },
      {
        name: "Keyboard",
        price: 129.99,
        description: "Mechanical keyboard with RGB lighting",
      },
      {
        name: "Monitor",
        price: 399.99,
        description: "27-inch 4K display",
      },
      {
        name: "Headphones",
        price: 199.99,
        description: "Noise-cancelling headphones",
      },
      {
        name: "Webcam",
        price: 79.99,
        description: "1080p HD webcam",
      },
      {
        name: "USB-C Hub",
        price: 59.99,
        description: "Multi-port USB-C hub",
      },
      {
        name: "Standing Desk",
        price: 449.99,
        description: "Electric height-adjustable desk",
      },
    ];

    // Insert data
    await Task.insertMany(tasks);
    await User.insertMany(users);
    await Product.insertMany(products);

    console.log("Seed data inserted successfully");
    console.log(`- ${tasks.length} tasks`);
    console.log(`- ${users.length} users`);
    console.log(`- ${products.length} products`);

    // Disconnect
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
