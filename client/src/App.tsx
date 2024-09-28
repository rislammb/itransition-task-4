import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import OpenRoute from "./OpenRoue";

const App: React.FC = () => {
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
};

export default App;
