import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { User } from "../../models/user";
import {
  blockUser,
  deleteUser,
  getUsers,
  unblockUser,
} from "../../services/userService";
import Toolbar from "../../components/toolbar";
import UserTable from "../../components/user-table";

export default function Home() {
  const { logout } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    setSelectedUsers([]);
    try {
      const response = await getUsers();
      setUsers(response?.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleBlock = async () => {
    try {
      for (let user of selectedUsers) {
        await blockUser(user.id);
        if (selectedUsers.length === users.length) {
          logout();
        } else {
          fetchUsers();
        }
      }
    } catch (error) {
      console.error("Error blocking users", error);
    }
  };

  const handleUnblock = async () => {
    try {
      for (let user of selectedUsers) {
        await unblockUser(user.id);
      }
      fetchUsers();
    } catch (error) {
      console.error("Error unblocking users", error);
    }
  };

  const handleDelete = async () => {
    try {
      for (let user of selectedUsers) {
        await deleteUser(user.id);
        if (selectedUsers.length === users.length) {
          logout();
        }
      }
      fetchUsers();
    } catch (error) {
      console.error("Error deleting users", error);
    }
  };

  const handleSelect = (user: User) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container my-4 d-flex flex-column gap-3">
      <Toolbar
        selectedUsers={selectedUsers}
        handleBlock={handleBlock}
        handleUnblock={handleUnblock}
        handleDelete={handleDelete}
      />
      <UserTable
        users={users}
        selectedUsers={selectedUsers}
        handleSelect={handleSelect}
        handleSelectAll={handleSelectAll}
      />
    </div>
  );
}
