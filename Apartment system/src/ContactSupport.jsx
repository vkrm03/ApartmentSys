import React, { useState, useEffect } from "react";
import "../public/Service.css";

const ContactSupport = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    contact: "",
    homeNo: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    priority: "low",
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");

    if (storedEmail) {
      setUserInfo((prev) => ({ ...prev, email: storedEmail }));

      fetch(`http://localhost:5000/getUser?email=${storedEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.name) {
            setUserInfo((prev) => ({
              ...prev,
              name: data.name,
              contact: data.contact,
              homeNo: data.home,
            }));
          }
        })
        .catch((err) => console.error("Error fetching user info:", err));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supportData = { ...userInfo, ...formData };

    try {
      const response = await fetch("http://localhost:5000/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supportData),
      });

      const data = await response.json();
      alert(data.message);

      setFormData({
        category: "",
        description: "",
        priority: "low",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="service-container">
      <h2>Raise a Query</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={formData.category} required onChange={handleChange}>
          <option value="">Select a category</option>
          <option value="billing">Billing</option>
          <option value="maintenance">Maintenance</option>
          <option value="technical">Technical Issues</option>
          <option value="general">General Queries</option>
        </select>

        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" placeholder="Describe your issue..." value={formData.description} required onChange={handleChange}></textarea>

        <label htmlFor="priority">Priority Level</label>
        <select id="priority" name="priority" value={formData.priority} required onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>

        <button type="submit">Submit Query</button>
      </form>
    </div>
  );
};

export default ContactSupport;
