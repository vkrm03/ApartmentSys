import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../public/Register.css";
import { useSearchParams } from "react-router-dom";

const Register = () => {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlEmail = searchParams.get("email") || "";
    const urlToken = searchParams.get("token") || "";
    setEmail(urlEmail);
    setToken(urlToken);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
        token, // Include token in request
      });

      if (response.data.message === "User registered successfully") {
        setSuccess("Registration successful! Please login.");
        setError("");
        setName("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error registering. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="main outer-box">
      <div className="register-container">
        <div className="register-box">
          <h1 className="register-title">Register</h1>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <form className="register-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="register-input"
              placeholder="Email"
              value={email}
              readOnly
            />
            <input
              type="text"
              className="register-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="password"
              className="register-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="register-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="register-btn">
              Register
            </button>
          </form>

          <p className="register-footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
