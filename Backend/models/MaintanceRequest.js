// models/MaintenanceRequest.js
const mongoose = require("mongoose");

const MaintenanceRequestSchema = new mongoose.Schema({
  houseNo: { type: String, required: true },
  resident: { type: String, required: true },
  issue: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MaintenanceRequest", MaintenanceRequestSchema);
