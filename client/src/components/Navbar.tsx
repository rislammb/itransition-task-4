// File: ./src/components/Navbar.tsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar d-flex justify-content-between p-2 bg-body-tertiary">
      <Link className="navbar-brand" to="/">
        Home
      </Link>
      <ul className="navbar-nav d-flex flex-row gap-4">
        {user ? (
          <li className="nav-item">
            <button className="nav-link" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
