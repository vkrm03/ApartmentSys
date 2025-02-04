const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const crypto = require("crypto");
const User = require("./models/User");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vkrmtemp@gmail.com",
    pass: "mysp eskk wgqz dwio",
  },
});

mongoose
  .connect("mongodb://localhost:27017/ApartmentSys", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const sendInvitation = async (email) => {
  try {
    const token = crypto.randomBytes(20).toString("hex");

    let user = await User.findOne({ email });
    
    if (!user) {
      // Create user with only email, other fields null
      user = new User({ email, name: null, password: null, invitationToken: token, tokenExpiry: Date.now() + 3600000 });
    } else {
      // Update existing user's token and expiry
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
        return console.log(error);
      }
      console.log("Email sent: " + info.response);
    });

    console.log("Invitation sent!");
  } catch (err) {
    console.log("Error:", err);
  }
};

// Call function to send invitation
sendInvitation("viveksrinivasan274@gmail.com");
