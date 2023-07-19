const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  let token = req.header("Authorization");

  token = token.replace("Bearer ", "");

  token.trim();

  // console.log("Token:", token);

  try {
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. Token not provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded;

    // console.log("Decoded:", decoded);

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ error: "Invalid token." });
  }
};

module.exports = { authenticateToken };
