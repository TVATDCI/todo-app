# Refactor Plan v1 — Todo App Modernization

> **Context:** This is a student project originally built in 2024. After a 2-year pause, it is being
> refactored into a clean, portfolio-quality full-stack application. The goal is not just to make it
> work better, but to reflect current industry standards — proper architecture, real persistence,
> security basics, and a maintainable codebase.

---

## What Was Wrong (Audit Summary)

Before writing a single line of new code, a full audit of the codebase was performed. Key findings:

### Server

| Problem                                                                   | Location                          | Severity     |
| ------------------------------------------------------------------------- | --------------------------------- | ------------ |
| `errorHandler` middleware exists but is never registered                  | `src/index.js`                    | Critical     |
| Import paths are wrong (`../src/routes/` from inside `src/`)              | `src/index.js`                    | Bug          |
| `asyncHandler` middleware exists but is never used                        | All controllers/routes            | Bug          |
| Dead `GET /users` route returns plain text, not JSON                      | `src/index.js`                    | Minor        |
| `server.js` is an orphaned legacy file (port 8000, never run)             | `server.js`                       | Cleanup      |
| `fs.js` is a completely separate Express app on port 5002                 | `fs.js`                           | Architecture |
| `testController.js` / `testRoute.js` are scaffolding only                 | `src/controllers/`, `src/routes/` | Cleanup      |
| All data is in-memory — lost on every server restart                      | All controllers                   | Major        |
| No input validation anywhere                                              | All controllers                   | Major        |
| No security middleware (`helmet`, rate limiting)                          | `src/index.js`                    | Major        |
| `cors()` allows all origins wildcard                                      | `src/index.js`                    | Minor        |
| No environment variable management (`dotenv`)                             | —                                 | Major        |
| `taskController.js` does not exist — logic lives in the route file        | `src/routes/tasksRoute.js`        | Architecture |
| No `updateUser`, `deleteUser`, `updateProduct`, `deleteProduct` endpoints | Controllers                       | Incomplete   |
| `main` field in `package.json` points to wrong file                       | `package.json`                    | Minor        |
| No `engines` field specifying Node.js version                             | `package.json`                    | Minor        |

### Client

| Problem                                                                          | Location                            | Severity      |
| -------------------------------------------------------------------------------- | ----------------------------------- | ------------- |
| `window.location.reload()` used instead of state update after adding a task      | `App.js`                            | Anti-pattern  |
| `TaskList` ignores the `tasks` prop passed from `App` — fetches on its own       | `TaskList.jsx`                      | Bug           |
| `handleTaskAdded` in `App.js` is dead code (never called)                        | `App.js`                            | Bug           |
| `AddUser` posts to port 5002 (`fs.js`) — a completely separate server            | `AddUser.jsx`                       | Architecture  |
| `AddProduct` uses raw `axios` with a hardcoded URL instead of an API module      | `AddProduct.jsx`                    | Inconsistency |
| All API URLs are hardcoded to `localhost:5001` — breaks in any other environment | `api/tasksApi.js`, `AddProduct.jsx` | Major         |
| No centralized Axios instance — no interceptors, no base URL config              | `api/`                              | Architecture  |
| No React Router — all three features render simultaneously on one page           | `App.js`                            | Architecture  |
| `react-scripts` (CRA) is deprecated and archived by Meta                         | `package.json`                      | Major         |
| No loading states, no user-visible error messages in any component               | All components                      | UX            |
| No delete or complete-toggle UI (backend endpoints exist, UI does not)           | `TaskList.jsx`                      | Incomplete    |
| `AddTask.jsx` has no `<form>` wrapper — Enter key does not submit                | `AddTask.jsx`                       | UX            |
| `<title>` is still the CRA default "React App"                                   | `public/index.html`                 | Minor         |
| `UserList` component does not exist — users can be added but never displayed     | —                                   | Incomplete    |

---

## Decisions Made

| Decision         | Chosen                          | Reason                                                                                     |
| ---------------- | ------------------------------- | ------------------------------------------------------------------------------------------ |
| Database         | **MongoDB + Mongoose**          | Flexible schema fits the data; well-known in JS portfolios and job market                  |
| Frontend tooling | **Vite** (replacing CRA)        | CRA is archived; Vite is the current standard; built-in proxy solves hardcoded URL problem |
| Validation       | **Zod**                         | Composable schemas, works on both server and client, pairs well with Express 5             |
| Express version  | **v5**                          | Stable release since 2024; native async error handling without `asyncHandler` wrapper      |
| Client state     | **useState + custom hooks**     | No need for Redux/Zustand at this scale; clean separation of concerns                      |
| Routing          | **react-router-dom v6**         | Standard choice; separates features into their own pages                                   |
| Security         | **helmet + express-rate-limit** | Baseline production security with minimal effort                                           |

---

## Phase 1 — Server Refactor

### Step 1 — Delete dead files

- [ ] Delete `server/src/server.js` (orphaned legacy file, port 8000)
- [ ] Delete `server/fs.js` (standalone flat-file Express app, port 5002)
- [ ] Delete `server/users.txt` (flat-file user storage)
- [ ] Delete `server/src/controllers/testController.js` (scaffolding only)
- [ ] Delete `server/src/routes/testRoute.js` (scaffolding only)

### Step 2 — Update `package.json` and install dependencies

- [ ] Upgrade `express` to v5
- [ ] Add `mongoose`
- [ ] Add `dotenv`
- [ ] Add `helmet`
- [ ] Add `morgan`
- [ ] Add `zod`
- [ ] Add `express-rate-limit`
- [ ] Fix `main` field to point to `src/index.js`
- [ ] Add `engines` field: `"node": ">=20"`

### Step 3 — Add environment configuration

- [ ] Create `server/.env` (gitignored): `PORT`, `MONGO_URI`, `NODE_ENV`, `CLIENT_ORIGIN`
- [ ] Create `server/.env.example` as a committed template

### Step 4 — Add Mongoose models

Create `server/src/models/`:

- [ ] `Task.js` — fields: `title` (string, required), `description` (string), `category` (string), `completed` (boolean, default `false`), timestamps
- [ ] `User.js` — fields: `name` (string, required), `email` (string, unique), `status` (string), timestamps
- [ ] `Product.js` — fields: `name` (string, required), `price` (number, required, min 0), `description` (string), timestamps

### Step 5 — Rewrite controllers

- [ ] Create `server/src/controllers/taskController.js` — extract logic out of `tasksRoute.js`; implement `getAllTasks`, `getTaskById`, `createTask`, `updateTask`, `deleteTask` using `Task` model; wrap each with `asyncHandler`; add Zod validation
- [ ] Rewrite `productController.js` — replace in-memory array with `Product` model; add `updateProduct`, `deleteProduct`; wrap with `asyncHandler`; add Zod validation
- [ ] Rewrite `userController.js` — replace in-memory array with `User` model; server generates `_id` (remove client-supplied ID); add `updateUser`, `deleteUser`; wrap with `asyncHandler`; add Zod validation

### Step 6 — Update routes

- [ ] Rewrite `tasksRoute.js` — routing only, delegate to `taskController`; add `PUT /:id`, `DELETE /:id`
- [ ] Update `productRoute.js` — add `PUT /:id`, `DELETE /:id`
- [ ] Update `userRoute.js` — add `PUT /:id`, `DELETE /:id`
- [ ] Remove `testRoute.js` import from `index.js`

### Step 7 — Overhaul `index.js`

- [ ] Fix all import paths to `./routes/…`
- [ ] Remove dead `GET /users` route
- [ ] Add `helmet()`, `morgan('dev')`, `express-rate-limit`
- [ ] Restrict `cors()` to `process.env.CLIENT_ORIGIN`
- [ ] Connect Mongoose before starting the HTTP listener
- [ ] Register `errorHandler` as the last middleware
- [ ] Add graceful shutdown on `SIGTERM` / `SIGINT`

---

## Phase 2 — Client Refactor

### Step 8 — Migrate CRA → Vite

- [ ] Scaffold Vite + React into `client/`
- [ ] Move existing `src/` files across; update `index.html` (title, meta description, favicon)
- [ ] Configure `vite.config.js` with a dev proxy to `http://localhost:5001`
- [ ] Remove CRA-specific files (`reportWebVitals.js`, CRA test setup)

### Step 9 — Centralize the API layer

Replace all scattered `axios` calls with a single module structure:

- [ ] `client/src/api/client.js` — one `axios.create` instance using `import.meta.env.VITE_API_URL`
- [ ] Rewrite `api/tasksApi.js` — use shared instance; full CRUD
- [ ] Create `api/usersApi.js` — full CRUD, pointing to the unified port 5001 server
- [ ] Create `api/productsApi.js` — full CRUD

### Step 10 — Add React Router

- [ ] Install `react-router-dom` v6
- [ ] Set up routes in `App.js`: `/tasks`, `/users`, `/products` (+ redirect from `/`)
- [ ] Create `pages/TasksPage.jsx`, `pages/UsersPage.jsx`, `pages/ProductsPage.jsx`
- [ ] Add a `components/Navbar.jsx`

### Step 11 — Rebuild components with full CRUD UI

- [ ] `TaskList.jsx` — remove self-fetching; accept data as props or via custom hook; add Complete checkbox, Delete button, loading and empty states
- [ ] `AddTask.jsx` — wrap in `<form>`, add Enter-key submit, loading/disabled state, user-visible error message
- [ ] Create `useTasks.js` custom hook — owns fetch, add, toggle, delete logic; keeps components presentation-only
- [ ] Rebuild `AddUser.jsx` — points to port 5001; add a `UserList.jsx`
- [ ] Rebuild `AddProduct.jsx` — use `productsApi.js`; add `description` field, price validation; add `ProductList.jsx`
- [ ] Add loading indicators and inline error messages in all forms

### Step 12 — Client environment variables

- [ ] Create `client/.env`: `VITE_API_URL=http://localhost:5001`
- [ ] Create `client/.env.example`

---

## Verification Checklist

### Server

- [ ] `npm run dev` starts without errors; Mongoose connects to MongoDB
- [ ] Full CRUD works for `/api/tasks`, `/api/users`, `/api/products`
- [ ] Sending invalid data returns a structured `{ success: false, message: "..." }` JSON error
- [ ] Unhandled promise rejections are caught and forwarded to `errorHandler`
- [ ] Every async controller is wrapped in `asyncHandler`
- [ ] `helmet` headers are present on all responses

### Client

- [ ] `npm run dev` starts on Vite dev server (port 5173); proxy forwards API calls correctly
- [ ] Adding a task persists after page refresh (MongoDB)
- [ ] Complete-toggle and delete work in the UI for tasks
- [ ] Users are listed after adding (no `window.location.reload()` anywhere)
- [ ] Products support add, list, and delete
- [ ] No hardcoded `localhost` URLs anywhere in source
- [ ] All forms show loading state and user-visible errors on failure

---

## File Structure After Refactor

```
client/
  .env
  .env.example
  vite.config.js
  index.html
  src/
    main.jsx
    App.jsx
    api/
      client.js
      tasksApi.js
      usersApi.js
      productsApi.js
    components/
      Navbar.jsx
      AddTask.jsx
      TaskList.jsx
      AddUser.jsx
      UserList.jsx
      AddProduct.jsx
      ProductList.jsx
    hooks/
      useTasks.js
      useUsers.js
      useProducts.js
    pages/
      TasksPage.jsx
      UsersPage.jsx
      ProductsPage.jsx

server/
  .env
  .env.example
  package.json
  src/
    index.js
    models/
      Task.js
      User.js
      Product.js
    controllers/
      taskController.js
      userController.js
      productController.js
    routes/
      tasksRoute.js
      userRoute.js
      productRoute.js
    middleware/
      asyncHandler.js
      errorHandler.js
```

---

_Plan authored: March 2026. Implementation will proceed one side at a time — server first, then client._
