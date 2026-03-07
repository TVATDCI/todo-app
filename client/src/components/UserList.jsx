export default function UserList({ users, loading, error, onDelete }) {
  if (loading) return <p className="status-text">Loading users…</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!users.length)
    return <p className="status-text">No users yet. Add one above!</p>;

  return (
    <ul className="item-list">
      {users.map((user) => (
        <li key={user._id} className="item-row">
          <div className="item-info">
            <span className="item-name">{user.name}</span>
            <span className="item-sub">{user.email}</span>
          </div>
          <span className={`status-badge status-${user.status}`}>
            {user.status}
          </span>
          <button
            className="btn-delete"
            onClick={() => onDelete(user._id)}
            aria-label="Delete user"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
