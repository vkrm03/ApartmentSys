import React, { useState, useEffect } from "react";

const CommunityAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");

  // Fetch announcements from backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:5000/community-announcements");
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  // Function to add a new announcement
  const addAnnouncement = async () => {
    if (!newAnnouncement) return;

    try {
      const response = await fetch("http://localhost:5000/community-announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Announcement", details: newAnnouncement }),
      });

      if (response.ok) {
        const updatedAnnouncements = await response.json();
        setAnnouncements([...announcements, updatedAnnouncements]);
        setNewAnnouncement("");
      }
    } catch (error) {
      console.error("Error adding announcement:", error);
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
        <div key={ann._id} className="announcement">
          <h3>{ann.title}</h3>
          <p>{ann.details}</p>
        </div>
      ))}
    </div>
  );
};

export default CommunityAnnouncements;
