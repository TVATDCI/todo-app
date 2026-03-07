import './App.css';
// src/App.js
import React, { useState } from "react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import AddUser from './components/AddUser';
import AddProduct from './components/AddProduct';

function App() {
  const [tasks, setTasks] = useState([]);
  const [products, setProducts] = useState([]);
  
  // replaced with window.location.reload() in handleTaskAdded
  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <>
    <div className="App">
      <h1>Todo App</h1>
      <AddTask onTaskAdded={() => window.location.reload()} />
      <TaskList tasks={tasks} />
    </div>
    <div className="App">
      <h1>Add User</h1>
      <AddUser />
    </div>
    <div className="App">
      <h1>Add product</h1>
      <AddProduct onProductAdded={handleProductAdded} />
      <h2>Product List</h2>
      <ul className="productUi">
        {products.map((product) => (
          <li className="productLi" key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default App;