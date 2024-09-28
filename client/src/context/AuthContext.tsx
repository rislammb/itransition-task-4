import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getToken } from "../utils/storage";
import { getLoggedUser } from "../services/userService";
import Loader from "../components/Loader";

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const defaultValue = {
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = getToken();

      if (token) {
        try {
          const response = await getLoggedUser();
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
