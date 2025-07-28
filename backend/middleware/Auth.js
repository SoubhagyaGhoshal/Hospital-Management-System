const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "hospital_management_secret_key_2024";

const generateToken = (payload) => {
  // Add expiration time (24 hours)
  const expiresIn = '24h';
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing!" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is required!" });
  }

  try {
    const decoded = await jwt.verify(token, SECRET_KEY);
    
    // Check if token is expired (only if exp field exists)
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(401).json({ error: "Token has expired!" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ error: "Invalid token!" });
  }
};

module.exports = { authenticateToken, generateToken };
