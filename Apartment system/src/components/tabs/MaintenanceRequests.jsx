import React, { useState, useEffect } from "react";
import "../../../public/MaintenanceRequests.css";

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/support-requests")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/support-requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setRequests((prevRequests) =>
        prevRequests.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="maintenance-requests">
      <h2>Support Queries</h2>
      <table>
        <thead>
          <tr>
            <th>Resident</th>
            <th>House No</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Category</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.name}</td>
              <td>{req.homeNo}</td>
              <td>{req.contact}</td>
              <td>{req.email}</td>
              <td>{req.category}</td>
              <td>{req.description}</td>
              <td>{req.priority}</td>
              <td className={req.status.toLowerCase()}>{req.status}</td>
              <td>
                <button
                  onClick={() =>
                    updateStatus(req._id, req.status === "Pending" ? "Resolved" : "Pending")
                  }
                >
                  {req.status === "Pending" ? "Mark as Resolved" : "Reopen"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceRequests;
