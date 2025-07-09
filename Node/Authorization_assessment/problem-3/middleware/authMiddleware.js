const jwt = require("jsonwebtoken");
const TokenBlacklist = require("../models/tokenBlacklistModel");

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token required" });

  const isBlacklisted = await TokenBlacklist.findOne({ token, type: "access" });
  if (isBlacklisted) return res.status(403).json({ msg: "Token blacklisted" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
