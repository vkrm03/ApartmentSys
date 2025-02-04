const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema({
  query: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SupportQuery", supportSchema);
