import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ContactSupport from "./ContactSupport";
import Rent from "./components/Rent";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/service" element={<ContactSupport />} />
      </Routes>
    </Router>
  );
};

export default App;
