import React, { useState, FormEvent } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await register(name, position, email, password);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
      if (isAxiosError(err)) {
        setError(err.response?.data?.error);
      } else {
        setError("Somthings went wrong!");
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group my-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            className="form-control"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
