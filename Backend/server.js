const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
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

app.post("/register", async (req, res) => {
  const { name, email, password, token } = req.body;
  console.log(name, email, password, token);

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
  console.log(email, password);

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
    console.log(query);
    
  
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
