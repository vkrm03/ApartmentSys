import React, { useState } from "react";
import axios from "axios";
import "../../public/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (response.data.message === "Login successful") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", email);

        window.location.href = "/dash";
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="main">
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">Login</h1>
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>
          <p className="login-footer">
            Don’t have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
