import React, { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import { TbLock, TbLockOpen2, TbTrash } from "react-icons/tb";
import {
  getUsers,
  blockUser,
  unblockUser,
  deleteUser,
} from "../services/userService";
import { AuthContext } from "../context/AuthContext";

interface User {
  id: number;
  name: string;
  position?: string;
  email: string;
  last_login: string;
  registration_time: string;
  status: string;
}

const Home: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response?.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleBlock = async () => {
    try {
      for (let userId of selectedUsers) {
        await blockUser(userId);
        if (selectedUsers.length === users.length) {
          logout();
        } else {
          fetchUsers(); // Refresh the user list
        }
      }
    } catch (error) {
      console.error("Error blocking users", error);
    }
  };

  const handleUnblock = async () => {
    try {
      for (let userId of selectedUsers) {
        await unblockUser(userId);
      }
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error unblocking users", error);
    }
  };

  const handleDelete = async () => {
    try {
      for (let userId of selectedUsers) {
        await deleteUser(userId);
        if (selectedUsers.length === users.length) {
          logout();
        }
      }
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error deleting users", error);
    }
  };

  const handleSelect = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex gap-3 align-items-center">
        <button
          className="btn btn-outline-secondary"
          disabled={selectedUsers.length === 0}
          onClick={handleBlock}
        >
          <TbLock size={"20px"} /> Block
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={handleUnblock}
          disabled={selectedUsers.length === 0}
        >
          <TbLockOpen2 title="Unblock" size={"20px"} />
        </button>
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={selectedUsers.length === 0}
        >
          <TbTrash title="Delete" size={"20px"} />
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr className="align-middle">
            <th>
              <input
                type="checkbox"
                className="form-check-input"
                style={{ cursor: "pointer" }}
                onChange={handleSelectAll}
              />
            </th>
            <th>
              <span>Name</span> <br />
              <span className="fw-normal">Position</span>
            </th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr className="align-middle" key={u.id}>
              <td>
                <input
                  type="checkbox"
                  className="form-check-input"
                  style={{ cursor: "pointer" }}
                  disabled={u.id === user?.id}
                  onChange={() => handleSelect(u.id)}
                  checked={selectedUsers.includes(u.id)}
                />
              </td>
              <td className={u.status === "Blocked" ? "text-muted" : ""}>
                <h6>{u.name}</h6>
                <span>{u.position || "-"}</span>
              </td>
              <td className={u.status === "Blocked" ? "text-muted" : ""}>
                {u.email}
              </td>
              <td
                className={`small ${
                  u.status === "Blocked" ? "text-muted" : ""
                }`}
              >
                {u.last_login
                  ? format(u.last_login, "HH:mm:ss, dd MMM, yyyy")
                  : "-"}
              </td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
