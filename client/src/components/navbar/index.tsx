import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar d-flex justify-content-between p-2 bg-body-tertiary">
      <Link className="navbar-brand" to="/">
        <img src="./user-management.png" alt="Logo" width={36} height={36} />{" "}
        Home
      </Link>
      <ul className="navbar-nav d-flex align-items-center flex-row gap-4">
        {user ? (
          <>
            <li className="nav-item">Hello, {user.name}!</li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
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
}
