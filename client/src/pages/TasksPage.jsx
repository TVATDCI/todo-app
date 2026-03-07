import { useTasks } from "../hooks/useTasks.js";
import AddTask from "../components/AddTask.jsx";
import TaskList from "../components/TaskList.jsx";

export default function TasksPage() {
  const { tasks, loading, error, addTask, toggle, remove } = useTasks();

  return (
    <div className="page">
      <h1>Tasks</h1>
      <AddTask onTaskAdded={addTask} />
      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onToggle={toggle}
        onDelete={remove}
      />
    </div>
  );
}
