import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../public/ContactSupport.css";

const Support = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(query);
      const response = await axios.post("http://localhost:5000/support", { query });
      
      if (response.data.message === "Support query submitted successfully") {
        alert("Your query has been submitted. We will get back to you soon!");
        setQuery("");
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Error submitting query. Please try again later.");
    }
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
