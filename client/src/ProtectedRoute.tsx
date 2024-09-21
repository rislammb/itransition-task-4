import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

interface ProtectedRouteProps {
  component: React.FC;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const { user } = useContext(AuthContext);

  return user ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
