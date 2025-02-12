const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    home: { type: String },
    contact: { type: String },
    password: { type: String },
    invitationToken: { type: String },
    tokenExpiry: { type: Date }
});

module.exports = mongoose.model("User", userSchema);
