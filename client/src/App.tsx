import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import OpenRoute from "./OpenRoute";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<OpenRoute component={Login} />} />
          <Route
            path="/register"
            element={<OpenRoute component={Register} />}
          />
          <Route path="/" element={<ProtectedRoute component={Home} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
