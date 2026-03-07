import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import TasksPage from "./pages/TasksPage";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
