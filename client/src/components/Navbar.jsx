import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-brand">Todo App</span>
      <div className="navbar-links">
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Tasks
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Products
        </NavLink>
      </div>
    </nav>
  );
}
