import { useUsers } from "../hooks/useUsers.js";
import AddUser from "../components/AddUser.jsx";
import UserList from "../components/UserList.jsx";

export default function UsersPage() {
  const { users, loading, error, addUser, remove } = useUsers();

  return (
    <div className="page">
      <h1>Users</h1>
      <AddUser onUserAdded={addUser} />
      <UserList
        users={users}
        loading={loading}
        error={error}
        onDelete={remove}
      />
    </div>
  );
}
