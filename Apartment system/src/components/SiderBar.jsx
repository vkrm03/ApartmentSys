import React, { useState } from "react";
import { 
  FaHome, FaMoneyBill, FaWrench, FaBullhorn, FaBell, 
  FaCog, FaBars, FaArrowLeft, FaUserCircle 
} from "react-icons/fa";
import "../../public/SiderBar.css";

const Sidebar = ({ setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        
        {/* Admin Profile Section */}
        <div className="admin-profile">
          <FaUserCircle className="admin-avatar" />
          {isOpen && <h3 className="admin-name">Admin</h3>}
        </div>

        {/* Sidebar Header */}
        <div className="sidebar-header">
          <h1 className={isOpen ? "title" : "hidden"}>Dashboard</h1>
          {isOpen ? (
            <FaArrowLeft className="menu-icon arrow-left" onClick={toggleSidebar} />
          ) : (
            <FaBars className="menu-icon" onClick={toggleSidebar} />
          )}
        </div>

        {/* Sidebar List */}
        <ul className="sidebar-list">
          <SidebarItem icon={<FaHome />} text="House Details" isOpen={isOpen} setActiveTab={setActiveTab} className="active" />
          <SidebarItem icon={<FaMoneyBill />} text="Payment Status" isOpen={isOpen} setActiveTab={setActiveTab} className="active"/>
          <SidebarItem icon={<FaWrench />} text="Maintenance Requests" isOpen={isOpen} setActiveTab={setActiveTab} className="active"/>
          <SidebarItem icon={<FaBullhorn />} text="Community Announcements" isOpen={isOpen} setActiveTab={setActiveTab} className="active"/>
          <SidebarItem icon={<FaBell />} text="Notifications" isOpen={isOpen} setActiveTab={setActiveTab} className="active"/>
        </ul>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, isOpen, setActiveTab }) => {
  return (
    <li className="sidebar-item" onClick={() => setActiveTab(text)}>
      <span className="sidebar-icon">{icon}</span>
      <span className={`sidebar-text ${isOpen ? "visible" : "hidden"}`}>{text}</span>
    </li>
  );
};

export default Sidebar;
