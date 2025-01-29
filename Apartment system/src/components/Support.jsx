import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../public/ContactSupport.css";

const Support = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support Query Submitted:", query);
    alert("Your query has been submitted. We will get back to you soon!");
    navigate("/dashboard"); // Redirect back to dashboard
  };

  return (
    <div className="container support">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>
            Describe your issue:
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows="5"
              required
              placeholder="Type your issue here..."
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Support;
