const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("./models/User");
const SupportQuery = require("./models/Support");
const CommunityAnnouncement = require("./models/CommunityAnnouncement");

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

const sendInvitation = async (email, homeId, contact) => {
  try {
    const token = crypto.randomBytes(20).toString("hex");
    let user = await User.findOne({ email });
    console.log(contact);
    

    if (!user) {
      user = new User({
        email,
        name: null,
        home: homeId,
        contact: contact,
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


app.put("/updateProfile", async (req, res) => {
  const { name, apartment, email, contact } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name;
    user.home = apartment;
    user.contact = contact;
    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/send-invite", async (req, res) => {
  const { email, homeId, contact} = req.body;
  if (!email || !homeId) {
    return res.status(400).json({ message: "Email and Home ID are required" });
  }
  try {
    await sendInvitation(email, homeId, contact);
    res.json({ message: "Invitation sent successfully!" });
  } catch (error) {
    console.error("Error sending invitation:", error);
    res.status(500).json({ message: "Failed to send invitation" });
  }
});

app.get("/getUser", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email }, "-password -invitationToken -tokenExpiry"); // Exclude sensitive fields
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/getUserName", async (req, res) => {
  const { email } = req.query;
  
  try {
    const user = await User.findOne({ email }, "name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ name: user.name });
    console.log(user.name);
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/houses", async (req, res) => {
  try {
    const houses = await User.find({}, "name home contact email");
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/support", async (req, res) => {
  const { email, category, description, priority } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found. Please check your email." });
    }

    const newQuery = new SupportQuery({
      name: user.name,
      contact: user.contact,
      email,
      homeNo: user.home,
      category,
      description,
      priority,
      status: "Pending",
    });

    await newQuery.save();
    res.status(201).json({ message: "Support query submitted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/support-requests", async (req, res) => {
  try {
    const queries = await SupportQuery.find();
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/support-requests/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const query = await SupportQuery.findById(id);
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    query.status = status;
    await query.save();

    res.status(200).json({ message: "Query status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/community-announcements", async (req, res) => {
  const { title, details } = req.body;

  try {
    const announcement = new CommunityAnnouncement({ title, details });
    await announcement.save();
    res.status(201).json({ message: "Announcement added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/community-announcements", async (req, res) => {
  try {
    const announcements = await CommunityAnnouncement.find().sort({ createdAt: -1 });
    console.log(announcements);
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});