import React, { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import { TbLockOpen2 } from "react-icons/tb";
import {
  getUsers,
  blockUser,
  unblockUser,
  deleteUser,
} from "../services/userService";
import { AuthContext } from "../context/AuthContext";
import { MdDeleteOutline } from "react-icons/md";

interface User {
  id: number;
  name: string;
  email: string;
  last_login: string;
  registration_time: string;
  status: string;
}

const Home: React.FC = () => {
  const { user } = useContext(AuthContext);
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
      }
      fetchUsers(); // Refresh the user list
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
      <div className="d-flex gap-4 align-items-center">
        <button
          className="btn btn-danger"
          disabled={selectedUsers.length === 0}
          onClick={handleBlock}
        >
          Block
        </button>
        <TbLockOpen2
          title="Unblock"
          style={{ cursor: "pointer" }}
          onClick={handleUnblock}
          size={"28px"}
          color="dodgerblue"
          aria-disabled={selectedUsers.length === 0}
        />
        <MdDeleteOutline
          title="Delete"
          style={{ cursor: "pointer" }}
          onClick={handleDelete}
          size={"28px"}
          color="red"
          aria-disabled={selectedUsers.length === 0}
        />
      </div>
      <div className="card my-2">
        <table className="table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={handleSelectAll} />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Last Login</th>
              <th>Registration Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    disabled={u.id === user?.id}
                    onChange={() => handleSelect(u.id)}
                    checked={selectedUsers.includes(u.id)}
                  />
                </td>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="small">
                  {u.last_login && format(u.last_login, "hh:mm aaa, dd MMM")}
                </td>
                <td className="small">
                  {format(u.registration_time, "hh:mm aaa, dd MMM")}
                </td>
                <td>{u.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
