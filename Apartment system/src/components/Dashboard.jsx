import React from "react";
import "../../public/Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      {/* Header */}
      <header className="header">
        <h1>Resident Dashboard</h1>
        <nav>
          <Link to="/login">Logout</Link>
          <i className="fa-solid fa-right-from-bracket"></i>
        </nav>
      </header>

      {/* Main Container */}
      <div className="container">
        <div className="dashboard-grid">
          {/* Profile Section */}
          <div className="card profile full-width">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile"
            />
            <div>
              <h2>kadavulea Ajithyea</h2>
              <p>Apartment: A-102</p>
              <p>Email: johndoe@example.com</p>
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

          {/* Community Notice */}
          <div className="card notifications">
            <h2>Community Notice</h2>
            <ul>
              <li>Swimming pool closed till Friday for maintenance</li>
              <li>Pongal Celebration</li>
              <li>The Gym subscription increased by 100rs</li>
            </ul>
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
