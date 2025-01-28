import React from "react";
import "../public/Service.css";

const ContactSupport = () => {
  return (
    <div className="service-container">
      <h2>Raise a Query</h2>
      <form>
        <label htmlFor="category">Category</label>
        <select id="category" name="category" required>
          <option value="">Select a category</option>
          <option value="billing">Billing</option>
          <option value="maintenance">Maintenance</option>
          <option value="technical">Technical Issues</option>
          <option value="general">General Queries</option>
        </select>

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          placeholder="Describe your issue or query..."
          required
        ></textarea>

        <label htmlFor="priority">Priority Level</label>
        <select id="priority" name="priority" required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>

        <button type="submit">Submit Query</button>
      </form>
    </div>
  );
};

export default ContactSupport;
