export default function TaskList({
  tasks,
  loading,
  error,
  onToggle,
  onDelete,
}) {
  if (loading) return <p className="status-text">Loading tasks…</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!tasks.length)
    return <p className="status-text">No tasks yet. Add one above!</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task._id}
          className={`task-item${task.completed ? " completed" : ""}`}
        >
          <label className="task-check">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task._id)}
            />
            <span className="task-title">{task.title}</span>
          </label>
          {task.category && <span className="task-badge">{task.category}</span>}
          {task.description && (
            <span className="task-desc">{task.description}</span>
          )}
          <button
            className="btn-delete"
            onClick={() => onDelete(task._id)}
            aria-label="Delete task"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
