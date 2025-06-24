module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.headers["x-role"];
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};
