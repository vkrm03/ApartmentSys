import React from "react";
import { Link } from "react-router-dom";
import "../../public/Home.css";

const Home = () => {
  return (
    <div>
      <header className="header">
        <div className="logo">Apartment Management</div>
        <Link to="/login">
          <button className="sign-in-btn">Sign In</button>
        </Link>
      </header>
      <div className="main">
        <h1>Welcome to Apartment Management System</h1>
        <p className="description">
          A comprehensive solution designed to streamline apartment maintenance
          and management for residents and administrators. Manage tasks
          efficiently and stay organized with ease!
        </p>
        <button className="get-started-btn">Get Started</button>
      </div>
    </div>
  );
};

export default Home;
