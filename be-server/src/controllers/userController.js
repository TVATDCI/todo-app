// Sample user data
const users = [
  { id: 1, name: "Jane Austen", status: "I find myself in tolerable health." },
  { id: 2, name: "John Doe", status: "Learning backend development." },
];

// GET all users
export const getAllUsers = (req, res, next) => {
  try {
    res.json(users);
  } catch (error) {
    next(error); // Pass error to errorHandler middleware
  }
};

// GET user by ID
export const getUserById = (req, res, next) => {
  try {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// POST create a new user
export const createUser = (req, res, next) => {
  try {
    const { id, name, status } = req.body;
    if (!id || !name || !status) {
      const error = new Error("Please provide id, name, and status.");
      error.statusCode = 400;
      throw error;
    }

    // Simulate adding a user (no database here, just for example)
    const newUser = { id, name, status };
    users.push(newUser);

    res.status(201).json({
      message: "User created successfully.",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};
