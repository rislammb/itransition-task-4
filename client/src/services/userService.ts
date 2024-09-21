import axios from "../axios";

interface User {
  id: number;
  name: string;
  email: string;
  last_login: string;
  registration_time: string;
  status: string;
}

// const authHeader = () => {
//   const token = localStorage.getItem("token");
//   return { headers: { Authorization: `Bearer ${token}` } };
// };

// Get list of users
const getUsers = () => {
  return axios.privateInstance.get<User[]>("/users");
};

// Block a user
const blockUser = (userId: number) => {
  return axios.privateInstance.get(`/users/block/${userId}`);
};

// Unblock a user
const unblockUser = (userId: number) => {
  return axios.privateInstance.get(`/users/unblock/${userId}`);
};

// Delete a user
const deleteUser = (userId: number) => {
  return axios.privateInstance.delete(`/users/${userId}`);
};

export { getUsers, blockUser, unblockUser, deleteUser };
