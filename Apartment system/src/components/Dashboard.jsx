import React, { useEffect, useState } from "react";
import "../../public/Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  // Fetch Announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:5000/community-announcements");
        const data = await response.json();
        console.log("Fetched Announcements:", data); // Debugging log
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Log announcements when they update
  useEffect(() => {
    console.log("Updated Announcements:", announcements);
  }, [announcements]);

  // Fetch User Name
  useEffect(() => {
    const fetchUserName = async () => {
      const email = localStorage.getItem("userEmail");
      console.log("User Email:", email); // Debugging log

      try {
        const response = await fetch(`http://localhost:5000/getUserName?email=${email}`);
        const data = await response.json();

        if (response.ok) {
          setUserName(data.name);
        } else {
          setError(data.message || "Failed to fetch user data.");
        }
      } catch (err) {
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  return (
    <div>
      <header className="header">
        <h1>Resident Dashboard</h1>
        <nav>
          <Link to="/login" onClick={onLogout}>Logout</Link>
          <i className="fa-solid fa-right-from-bracket"></i>
        </nav>
      </header>

      <div className="container">
        <div className="dashboard-grid">
          {/* Profile Section */}
          <div className="card profile full-width">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
              alt="Profile"
            />
            <div>
              <h2>{userName || "Guest"}</h2> 
              <p>{localStorage.getItem("userEmail")}</p>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="card notifications">
            <h2>Notifications</h2>
            <ul>
              <li>Rent due: $500 by Jan 25th</li>
              <li>Electricity bill: $120 paid on Jan 15th</li>
              <li>Service request pending: Plumbing on Jan 18th</li>
            </ul>
          </div>

          {/* Community Announcements Section */}
          <div className="card notifications">
            <h2>Community Announcements</h2>
            <div className="announcements">
              {announcements.length > 0 ? (
                announcements.map((ann) => (
                  <div key={ann._id} className="announcement">
                    <h3>{ann.title}</h3>
                    <p>{ann.details}</p>
                  </div>
                ))
              ) : (
                <p>No announcements available</p>
              )}
            </div>
          </div>

          {/* Payment History */}
          <div className="card full-width">
            <h2>Payment History</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jan 15, 2025</td>
                  <td>$120</td>
                  <td>Electricity</td>
                  <td>Paid</td>
                </tr>
                <tr>
                  <td>Jan 10, 2025</td>
                  <td>$500</td>
                  <td>Rent</td>
                  <td>Paid</td>
                </tr>
                <tr>
                  <td>Dec 20, 2024</td>
                  <td>$50</td>
                  <td>Service</td>
                  <td>Paid</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Status */}
          <div className="card status">
            <h2>Payment Status</h2>
            <ul>
              <li>Rent: Not Paid</li>
              <li>Electricity: Paid</li>
              <li>Services: Pending</li>
            </ul>
          </div>

          {/* Calendar */}
          <div className="card calendar">
            <h2>Payment Calendar</h2>
            <iframe
              src="https://calendar.google.com/calendar/embed?src=en.indian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FKolkata"
              frameBorder="0"
              scrolling="no"
              title="Calendar"
            ></iframe>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions">
            <Link to="/rent">Pay Rent</Link>
            <Link to="/service">Request Service</Link>
            <Link to="/update-profile">Update Profile</Link>
            <Link to="/support">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
