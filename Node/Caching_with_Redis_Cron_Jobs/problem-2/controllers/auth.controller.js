const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.signup = async (req, res) => {
  const {email, password} = req.body;
  const existing = await User.findOne({email});
  if (existing) return res.status(400).json({msg:"User exists"});
  const hash = await bcrypt.hash(password, 10);
  await new User({email, password:hash}).save();
  res.json({msg:"User registered"});
};

exports.login = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user || !await bcrypt.compare(password, user.password))
    return res.status(401).json({msg:"Invalid creds"});
  const token = jwt.sign({uid: user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
  res.json({token});
};
