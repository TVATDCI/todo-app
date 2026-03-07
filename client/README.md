# Client — React Frontend

> For the full project overview, architecture decisions, and API reference, see the [root README](../README.md).

## Stack

- **React 18** with [Vite](https://vitejs.dev/) (replaced Create React App)
- **react-router-dom v6** — `/tasks`, `/users`, `/products` pages
- **axios** — centralized instance with global error interceptor
- **sonner** — toast notifications

## Setup

```bash
cp .env.example .env   # set VITE_API_URL=http://localhost:5001
npm install
npm run dev            # http://localhost:5173
```

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start Vite dev server (port 5173) |
| `npm run build`   | Production build to `dist/`       |
| `npm run preview` | Preview the production build      |

## Structure

```
src/
├── api/          # axios modules — client.js, tasksApi.js, usersApi.js, productsApi.js
├── components/   # Navbar, AddTask, TaskList, AddUser, UserList, AddProduct, ProductList
├── hooks/        # useTasks, useUsers, useProducts
├── pages/        # TasksPage, UsersPage, ProductsPage
├── App.jsx       # Router + Toaster
└── App.css       # Global styles
```

## Environment Variables

| Variable       | Description                  | Default                 |
| -------------- | ---------------------------- | ----------------------- |
| `VITE_API_URL` | Base URL for the Express API | `http://localhost:5001` |

> The Vite dev proxy forwards all `/api/*` requests to the server, so `VITE_API_URL` is only needed for production builds.
