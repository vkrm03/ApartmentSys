import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../public/UpdateProfile.css";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    apartment: "",
    email: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    alert("Profile updated successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="card update-profile">
      <h1>Update Profile</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Apartment:
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
