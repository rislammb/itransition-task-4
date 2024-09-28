import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { register } from "../../services/authService";
import Input from "../../components/shared/input";
import Button from "../../components/shared/button";

export default function Register() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    position: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { name, position, email, password } = state;
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
        <Input
          label="Name"
          name="name"
          type="name"
          value={state.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Position"
          name="position"
          type="position"
          value={state.position}
          onChange={handleChange}
        />
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
        <Button text="Register" type="submit" />
      </form>
    </div>
  );
}
