import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getToken, removeToken, setToken } from "../utils/storage";
import { getLoggedUser } from "../services/userService";
import Loader from "../components/shared/loader";
import { AuthContextType } from "../models/context";
import { AuthUser } from "../models/user";

const defaultValue = {
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = (userData: AuthUser) => {
    setUser(userData);
    setToken(userData.token);
  };

  const logout = () => {
    setUser(null);
    removeToken();
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
