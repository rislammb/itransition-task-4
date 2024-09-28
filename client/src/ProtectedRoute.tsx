import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

interface ProtectedRouteProps {
  component: React.FC;
}

export default function ProtectedRoute({
  component: Component,
}: ProtectedRouteProps) {
  const { user } = useContext(AuthContext);

  return user ? <Component /> : <Navigate to="/login" />;
}
