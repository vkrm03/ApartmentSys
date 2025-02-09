import React from "react";
import "../../../public/CommunityAnnouncements.css";

const CommunityAnnouncements = () => {
  const announcements = [
    { id: 1, title: "Festival Celebration", details: "Join us for the upcoming festival." },
    { id: 2, title: "Fire Drill", details: "Mandatory fire drill this Sunday." },
  ];

  return (
    <div className="community-announcements">
      <h2>Community Announcements</h2>
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
