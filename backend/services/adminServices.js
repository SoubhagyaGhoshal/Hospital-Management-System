const { where } = require("sequelize");
const db = require("../models/index");
const { generateToken } = require("../middleware/Auth");
const User = db.User;

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

    const token = await generateToken(payload);

    return { user, token };
  },

  getAdminService: async (user) => {
    const userData = await User.findOne({ where: { username: user } });
    return userData;
  },
};

module.exports = adminService;
