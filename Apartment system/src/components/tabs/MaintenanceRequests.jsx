
// MaintenanceRequests.jsx
import React, { useState } from "react";
import "../../../public/MaintenanceRequests.css";

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState([
    { id: 1, houseNo: "A-101", resident: "John Doe", issue: "Water Leakage", type: "Plumbing", status: "Pending" },
    { id: 2, houseNo: "B-202", resident: "Alice Smith", issue: "Power Outage", type: "Electrical", status: "In Progress" },
    { id: 3, houseNo: "C-303", resident: "Bob Johnson", issue: "Elevator Repair", type: "Mechanical", status: "Completed" },
  ]);

  const updateStatus = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: req.status === "Pending" ? "Completed" : "Pending" } : req
      )
    );
  };

  return (
    <div className="maintenance-requests">
      <h2>Maintenance Requests</h2>
      <table>
        <thead>
          <tr>
            <th>House No</th>
            <th>Resident</th>
            <th>Issue</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.houseNo}</td>
              <td>{req.resident}</td>
              <td>{req.issue}</td>
              <td>{req.type}</td>
              <td className={req.status.toLowerCase()}>{req.status}</td>
              <td>
                <button onClick={() => updateStatus(req.id)}>
                  {req.status === "Pending" ? "Mark as Done" : "Reopen"}
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
