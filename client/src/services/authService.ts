import axios from "../axios";

interface RegisterResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

// Register a new user
const register = (name: string, email: string, password: string) => {
  return axios.publicInstance.post<RegisterResponse>("/auth/register", {
    name,
    email,
    password,
  });
};

// Login user
const login = (email: string, password: string) => {
  return axios.publicInstance.post<RegisterResponse>("/auth/login", {
    email,
    password,
  });
};

export { register, login };
