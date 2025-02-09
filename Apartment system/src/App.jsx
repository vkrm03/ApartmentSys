import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ContactSupport from "./ContactSupport";
import Rent from "./components/Rent";
import UpdateProfile from "./components/UpdateProfile";
import Support from "./components/Support";
import Register from "./components/Register";
import Sidebar from "./components/AdminDash";
import AdminDash from "./components/AdminDash";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/service" element={<ContactSupport />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  );
};

export default App;
