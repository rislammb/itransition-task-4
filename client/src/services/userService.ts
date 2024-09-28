import { axiosPrivate } from "../axios";
import { AuthUser, User } from "../models/user";

const getUsers = () => {
  return axiosPrivate.get<User[]>("/users");
};

const getLoggedUser = () => {
  return axiosPrivate.get<AuthUser>("/users/user-info");
};

const blockUser = (userId: number) => {
  return axiosPrivate.get(`/users/block/${userId}`);
};

const unblockUser = (userId: number) => {
  return axiosPrivate.get(`/users/unblock/${userId}`);
};

const deleteUser = (userId: number) => {
  return axiosPrivate.delete(`/users/${userId}`);
};

export { getUsers, getLoggedUser, blockUser, unblockUser, deleteUser };
