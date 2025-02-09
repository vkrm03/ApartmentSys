import React from "react";
import "../../../public/MaintenanceRequests.css";

const MaintenanceRequests = () => {
  const requests = [
    { id: 1, issue: "Water Leakage", status: "Pending" },
    { id: 2, issue: "Power Outage", status: "In Progress" },
    { id: 3, issue: "Elevator Repair", status: "Completed" },
  ];

  return (
    <div className="maintenance-requests">
      <h2>Maintenance Requests</h2>
      <ul className="maintenance-list">
        {requests.map((req) => (
          <li key={req.id} className="maintenance-item">
            <span>{req.issue}</span>
            <span className={`request-status status-${req.status.toLowerCase().replace(" ", "-")}`}>
              {req.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceRequests;
