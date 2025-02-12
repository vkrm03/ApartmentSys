const mongoose = require("mongoose");

const CommunityAnnouncementSchema = new mongoose.Schema({
  title: String,
  details: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CommunityAnnouncement", CommunityAnnouncementSchema);
