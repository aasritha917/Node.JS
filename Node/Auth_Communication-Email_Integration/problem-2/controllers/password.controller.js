const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const transporter = require("../config/mail.config");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ msg: "If email exists, password reset link sent" });

    const token = jwt.sign({ userId: user._id }, process.env.RESET_TOKEN_SECRET, { expiresIn: "15m" });

    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Link",
      html: `<p>Click to reset: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    res.json({ msg: "If email exists, password reset link sent" });
  } catch (err) {
    res.status(500).json({ msg: "Error sending reset link", error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    const user = await User.findOne({ _id: decoded.userId, resetToken: token });

    if (!user || user.resetTokenExpiry < new Date()) {
      return res.status(400).json({ msg: "Invalid or expired reset link" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};
