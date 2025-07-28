const adminService = require("../services/adminServices");

const adminController = {
  findAdmin: async (req, res) => {
    console.log('Admin login request received:', { 
      method: req.method, 
      body: req.body, 
      headers: req.headers 
    });
    
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "username and password are required!" });
    }

    try {
      // Check if database is connected
      if (!db.sequelize.authenticate) {
        return res.status(503).json({ error: "Database connection not available" });
      }

      const response = await adminService.findAdminService(username, password);
      console.log('Admin login successful for user:', username);
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
      
      // Check if it's a database connection error
      if (error.message.includes('Connection terminated') || error.message.includes('ECONNREFUSED')) {
        return res.status(503).json({ error: "Database connection error", details: error.message });
      }
      
      // Generic error response
      return res.status(500).json({ error: "Internal server error", details: error.message });
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
