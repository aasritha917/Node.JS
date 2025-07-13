const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ msg: "User exists" });
  const hash = await bcrypt.hash(password, 10);
  await new User({ email, password: hash }).save();
  res.json({ msg: "Registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u || !await bcrypt.compare(password, u.password))
    return res.status(401).json({ msg: "Invalid creds" });
  const token = jwt.sign({ userId: u._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};
