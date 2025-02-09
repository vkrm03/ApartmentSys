// HouseDetails.jsx
import React, { useState } from "react";
import "../../../public/HouseDetails.css";

const HouseDetails = () => {
  const houses = [
    { id: 1, name: "John Doe", houseNo: "A-101", members: 4, contact: "9876543210" },
    { id: 2, name: "Alice Smith", houseNo: "B-202", members: 3, contact: "9123456789" },
    { id: 3, name: "Bob Johnson", houseNo: "C-303", members: 5, contact: "9988776655" },
  ];
  
  const [selectedHouse, setSelectedHouse] = useState(null);

  return (
    <div className="house-details">
      <h2>House Details</h2>
      <table>
        <thead>
          <tr>
            <th>House No</th>
            <th>Owner Name</th>
            <th>No. of Members</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((house) => (
            <tr key={house.id}>
              <td>{house.houseNo}</td>
              <td>{house.name}</td>
              <td>{house.members}</td>
              <td>{house.contact}</td>
              <td><button onClick={() => setSelectedHouse(house)}>Open</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedHouse && (
        <div className="house-modal">
          <h3>Details for {selectedHouse.name}</h3>
          <p>House No: {selectedHouse.houseNo}</p>
          <p>Members: {selectedHouse.members}</p>
          <p>Contact: {selectedHouse.contact}</p>
          <button onClick={() => setSelectedHouse(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default HouseDetails;
