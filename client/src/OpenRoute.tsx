import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

interface OpenRouteProps {
  component: React.FC;
}

export default function OpenRoute({ component: Component }: OpenRouteProps) {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/" /> : <Component />;
}
