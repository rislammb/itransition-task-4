import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../services/authService";
import Input from "../../components/shared/input";
import Button from "../../components/shared/button";

export default function Login() {
  const navigate = useNavigate();
  const { login: setAuth } = useContext(AuthContext);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { email, password } = state;
      const response = await login(email, password);
      setAuth(response.data);
      navigate("/");
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
        <Input
          label="Email"
          name="email"
          type="email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
          required
        />
        {error && <p className="small text-warning">{error}</p>}
        <Button text="Login" type="submit" />
      </form>
    </div>
  );
}
