const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("./models/User");
const SupportQuery = require("./models/Support");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/ApartmentSys", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vkrmtemp@gmail.com",
    pass: "mysp eskk wgqz dwio",
  },
});

const sendInvitation = async (email, homeId) => {
  try {
    const token = crypto.randomBytes(20).toString("hex");
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name: null,
        home: homeId,
        password: null,
        invitationToken: token,
        tokenExpiry: Date.now() + 3600000,
      });
    } else {
      user.invitationToken = token;
      user.tokenExpiry = Date.now() + 3600000;
    }

    await user.save();

    const invitationLink = `http://localhost:5173/register?email=${encodeURIComponent(email)}&token=${token}`;

    const mailOptions = {
      from: "vkrmtemp@gmail.com",
      to: email,
      subject: "Account Creation Invitation",
      html: `<p>Click the link below to complete your account setup:</p>
             <a href="${invitationLink}">${invitationLink}</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    console.log("Invitation sent!");
  } catch (err) {
    console.log("Error:", err);
  }
};

app.post("/register", async (req, res) => {
  const { name, email, password, token } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not invited. Contact admin." });
    }
    if (user.invitationToken !== token || user.tokenExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }
    user.name = name;
    user.password = password;
    user.invitationToken = null;
    user.tokenExpiry = null;
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful", name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/support", async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }
  try {
    const newQuery = new SupportQuery({ query });
    await newQuery.save();
    res.status(201).json({ message: "Support query submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/updateProfile", async (req, res) => {
  const { name, apartment, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name;
    user.home = apartment;
    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/send-invite", async (req, res) => {
  const { email, homeId } = req.body;
  if (!email || !homeId) {
    return res.status(400).json({ message: "Email and Home ID are required" });
  }
  try {
    await sendInvitation(email, homeId);
    res.json({ message: "Invitation sent successfully!" });
  } catch (error) {
    console.error("Error sending invitation:", error);
    res.status(500).json({ message: "Failed to send invitation" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});