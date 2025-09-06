const adminAuth = (req, res, next) => {
  try {
    const roles = req.auth["https://bella-vista-api/roles"] || [];

    if (!roles.includes("admin")) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: "Access denied" });
  }
};

module.exports = adminAuth;