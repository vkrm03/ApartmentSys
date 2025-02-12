import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../public/HouseDetails.css";

const HouseDetails = () => {
  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/houses");
        setHouses(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching house details:", error);
      }
    };

    fetchHouses();
  }, []);

  return (
    <div className="house-details">
      <h2>House Details</h2>
      <table>
        <thead>
          <tr>
            <th>House No</th>
            <th>Owner Name</th>
            <th>email</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((house, index) => (
            <tr key={index}>
              <td>{house.home}</td>
              <td>{house.name == null ? "Not Seted Yet" : house.name}</td>
              <td>{house.email}</td>
              <td>{house.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HouseDetails;
