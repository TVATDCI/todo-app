# Todo App — Full-Stack Task Manager

---

## About This Project

This project was originally built in 2024 as a **student learning exercise** during a full-stack web development course. It was designed to explore the fundamentals of:

- Building a REST API with **Node.js and Express**
- Consuming that API from a **React** frontend using `axios`
- Separating concerns between frontend and backend in a monorepo structure

The original version was intentionally simple — in-memory data storage, a single page UI, and hardcoded URLs — because the goal was learning, not production readiness.

---

## Current Status — Modernization in Progress (March 2026)

Two years later, this project is being refactored from a student prototype into a **clean, portfolio-quality application**. The original code is preserved on the `main` branch as a historical reference point.

The refactor is being done **one side at a time** — server first, then client — so that each phase can be reviewed and understood independently.

**Why refactor rather than rewrite from scratch?**
Because working through real, imperfect code and improving it incrementally is exactly what day-to-day engineering looks like. The audit findings, architecture decisions, and step-by-step plan are documented in [`refactor-plan-v1.md`](refactor-plan-v1.md).

---

## What Changed Between 2024 and 2026

| Area                   | Then (2024)                                      | Now (planned)                                   |
| ---------------------- | ------------------------------------------------ | ----------------------------------------------- |
| **Build tool**         | Create React App (deprecated)                    | Vite                                            |
| **Data storage**       | In-memory arrays (lost on restart)               | MongoDB + Mongoose                              |
| **API design**         | Incomplete CRUD, no validation                   | Full CRUD + Zod validation                      |
| **Error handling**     | Middleware existed but was never registered      | `asyncHandler` + `errorHandler` wired correctly |
| **Security**           | None                                             | `helmet`, CORS restriction, rate limiting       |
| **Environment config** | Hardcoded `localhost` ports everywhere           | `.env` files, `dotenv`, Vite proxy              |
| **Frontend routing**   | One page with all features stacked               | `react-router-dom` v6, separate pages           |
| **API layer (client)** | Mix of API module and raw `axios` calls          | Centralized `axios.create` instance             |
| **UI completeness**    | Add only, no delete or complete toggle in UI     | Full CRUD visible in the interface              |
| **Architecture**       | Two separate Express servers (ports 5001 & 5002) | Single unified Express server                   |

---

## Project Structure (Post-Refactor Target)

```
todo-app/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── api/             # Centralized axios API modules
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks (useTasks, useUsers, etc.)
│   │   └── pages/           # Page-level components (TasksPage, UsersPage, ProductsPage)
│   └── vite.config.js
│
└── server/                  # Express backend (Node.js + MongoDB)
    └── src/
        ├── controllers/     # Business logic (taskController, userController, productController)
        ├── middleware/       # asyncHandler, errorHandler
        ├── models/          # Mongoose schemas (Task, User, Product)
        └── routes/          # Express routers
```

---

## Getting Started

### Prerequisites

- Node.js >= 20
- MongoDB running locally (or a MongoDB Atlas connection string)

### Server

```bash
cd server
cp .env.example .env          # fill in MONGO_URI and CLIENT_ORIGIN
npm install
npm run dev                   # starts on http://localhost:5001
```

### Client

```bash
cd client
cp .env.example .env          # VITE_API_URL=http://localhost:5001
npm install
npm run dev                   # starts on http://localhost:5173
```

---

## API Overview (after refactor)

| Method | Endpoint            | Description                           |
| ------ | ------------------- | ------------------------------------- |
| GET    | `/api/tasks`        | Get all tasks                         |
| POST   | `/api/tasks`        | Create a task                         |
| PUT    | `/api/tasks/:id`    | Update a task (e.g. toggle completed) |
| DELETE | `/api/tasks/:id`    | Delete a task                         |
| GET    | `/api/users`        | Get all users                         |
| POST   | `/api/users`        | Create a user                         |
| PUT    | `/api/users/:id`    | Update a user                         |
| DELETE | `/api/users/:id`    | Delete a user                         |
| GET    | `/api/products`     | Get all products                      |
| POST   | `/api/products`     | Create a product                      |
| PUT    | `/api/products/:id` | Update a product                      |
| DELETE | `/api/products/:id` | Delete a product                      |

---

## Refactor Plan

The full audit, decision log, and step-by-step checklist are in [`refactor-plan-v1.md`](refactor-plan-v1.md).

---

## License

This project is open-source under the MIT License.
