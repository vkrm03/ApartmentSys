import React from "react";
import "../../../public/Notifications.css";

const Notifications = () => {
  const notifications = [
    { id: 1, message: "New maintenance request received", time: "2 hours ago" },
    { id: 2, message: "Payment reminder sent to all residents", time: "Yesterday" },
  ];
  

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <ul className="notification-list">
        {notifications.map((notif) => (
          <li key={notif.id} className="notification-item">
            <span>{notif.message}</span>
            <span className="notification-time">{notif.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
