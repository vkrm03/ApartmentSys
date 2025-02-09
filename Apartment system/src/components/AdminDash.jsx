import React, { useState } from "react";
import Sidebar from "./SiderBar";
import HouseDetails from "./tabs/HouseDetails";
import PaymentStatus from "./tabs/PaymentStatus";
import MaintenanceRequests from "./tabs/MaintenanceRequests";
import CommunityAnnouncements from "./tabs/CommunityAnnouncements";
import Notifications from "./tabs/Notifications";
import "../../public/AdminDash.css";

const AdminDash = () => {
  const [activeTab, setActiveTab] = useState("House Details");

  const renderContent = () => {
    switch (activeTab) {
      case "House Details":
        return <HouseDetails />;
      case "Payment Status":
        return <PaymentStatus />;
      case "Maintenance Requests":
        return <MaintenanceRequests />;
      case "Community Announcements":
        return <CommunityAnnouncements />;
      case "Notifications":
        return <Notifications />;
      default:
        return <h2>Welcome to the Admin Dashboard</h2>;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="dashboard-content">{renderContent()}</div>
    </div>
  );
};

export default AdminDash;
