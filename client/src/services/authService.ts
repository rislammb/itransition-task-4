import { axiosPublic } from "../axios";
import { AuthUser } from "../models/user";

const register = (
  name: string,
  position: string,
  email: string,
  password: string
) => {
  return axiosPublic.post("/auth/register", {
    name,
    position,
    email,
    password,
  });
};

const login = (email: string, password: string) => {
  return axiosPublic.post<AuthUser>("/auth/login", {
    email,
    password,
  });
};

export { register, login };
