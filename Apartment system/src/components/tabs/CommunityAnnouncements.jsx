
// CommunityAnnouncements.jsx
import React, { useState } from "react";
import "../../../public/CommunityAnnouncements.css";

const CommunityAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Festival Celebration", details: "Join us for the upcoming festival." },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState("");

  const addAnnouncement = () => {
    if (newAnnouncement) {
      setAnnouncements([...announcements, { id: announcements.length + 1, title: "New Announcement", details: newAnnouncement }]);
      setNewAnnouncement("");
    }
  };

  return (
    <div className="community-announcements">
      <h2>Community Announcements</h2>
      <input
        type="text"
        placeholder="Enter new announcement"
        value={newAnnouncement}
        onChange={(e) => setNewAnnouncement(e.target.value)}
      />
      <button onClick={addAnnouncement}>Send</button>
      {announcements.map((ann) => (
        <div key={ann.id} className="announcement">
          <h3>{ann.title}</h3>
          <p>{ann.details}</p>
        </div>
      ))}
    </div>
  );
};

export default CommunityAnnouncements;
