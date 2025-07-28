const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "hospital_management_secret_key_2024";

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

    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "invalid Error." });
  }
};

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

module.exports = { authenticateToken, generateToken };
