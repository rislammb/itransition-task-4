import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

interface OpenRouteProps {
  component: React.FC;
}

const OpenRoute: React.FC<OpenRouteProps> = ({ component: Component }) => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/" /> : <Component />;
};

export default OpenRoute;
