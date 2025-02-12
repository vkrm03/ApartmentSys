import { useState } from "react";
import axios from "axios";
import "../../../public/AddResident.css"; // Import the CSS file

const AddResident = () => {
  const [email, setEmail] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/send-invite", {
        email,
        homeId: houseNumber,
        contact: contactNumber,
      });

      alert(response.data.message);
    } catch (error) {
      console.error("Error sending invitation:", error);
      alert("Failed to send invitation.");
    }
  };

  return (
    <div className="add-resident-container">
      <h2>Add Resident</h2>
      <form onSubmit={handleSubmit} className="add-resident-form">
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label>Contact Number:</label>
        <input 
          type="text" 
          value={contactNumber} 
          onChange={(e) => setContactNumber(e.target.value)} 
          required 
        />

        <label>House Number:</label>
        <input 
          type="text" 
          value={houseNumber} 
          onChange={(e) => setHouseNumber(e.target.value)} 
          required 
        />

        <button type="submit">Send Invitation</button>
      </form>
    </div>
  );
};

export default AddResident;
