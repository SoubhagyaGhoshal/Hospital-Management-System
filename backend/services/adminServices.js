const { where } = require("sequelize");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const User = db.User;

const SECRET_KEY = process.env.SECRET_KEY || "hospital_management_secret_key_2024";

const generateToken = (payload) => {
  // Add expiration time (24 hours)
  const expiresIn = '24h';
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

const adminService = {
  findAdminService: async (username, password) => {
    if (!username || !password) {
      throw new Error("username and password are required!");
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error("admin not exit!");
    }

    if (user.password != password) {
      throw new Error("password is does not match!");
    }

    const payload = {
      username: user.username,
      id: user.id,
    };

    const token = generateToken(payload);

    return { user, token };
  },

  getAdminService: async (user) => {
    const userData = await User.findOne({ where: { username: user } });
    return userData;
  },
};

module.exports = adminService;
