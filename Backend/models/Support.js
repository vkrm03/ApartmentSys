const mongoose = require("mongoose");

const SupportQuerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  homeNo: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "low" },
  status: { type: String, enum: ["Pending", "Resolved"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SupportQuery", SupportQuerySchema);
