const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();

router.get("/sendemail", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [`${process.env.EMAIL_USER}`, "venugopal.burli@masaischool.com"],
      subject: "Test Mail from NEM Student",
      text: "This is a testing Mail sent by NEM student, no need to reply."
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: "Email sent successfully!" });
  } catch (err) {
    console.error("Email sending failed:", err.message);
    res.status(500).json({ msg: "Failed to send email." });
  }
});

module.exports = router;
