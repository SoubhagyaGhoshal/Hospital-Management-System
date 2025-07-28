const adminService = require("../services/adminServices");

const adminController = {
  findAdmin: async (req, res) => {
    const { username, password } = req.body;

    try {
      const response = await adminService.findAdminService(username, password);

      res.status(201).json(response);
    } catch (error) {
      console.error("Error in get admin:", error.message);

      if (error.message === "username and password are required!") {
        return res.status(400).json({ error: error.message });
      }

      if (error.message === "admin not exit!") {
        return res.status(401).json({ error: error.message });
      }

      if (error.message === "password is does not match!") {
        return res.status(402).json({ error: error.message });
      }
    }
  },

  getAdmin: async (req, res) => {
    if (!req.user || !req.user.username) {
      return res.status(401).json({ error: "Unauthorized: No user info" });
    }
    const user = req.user.username;

    try {
      const response = await adminService.getAdminService(user);
      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(401).json("Not Gate data");
    }
  },
};

module.exports = adminController;
