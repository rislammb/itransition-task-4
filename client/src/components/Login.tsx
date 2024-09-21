import React, { useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/authService";
import { isAxiosError } from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      setAuth(response.data); // Save user data in context
      navigate("/"); // Redirect to user management panel
    } catch (err) {
      console.error("Login failed", err);
      if (isAxiosError(err)) {
        setError(err.response?.data?.error ?? err.message);
      } else {
        setError("Somthings went wrong!");
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group my-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="small text-warning">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
