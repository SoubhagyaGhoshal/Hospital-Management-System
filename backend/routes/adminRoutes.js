const express = require("express");
const adminRouter = express();
const adminController = require("../controllers/adminController");
const { authenticateToken, generateToken } = require("../middleware/Auth");
const db = require("../models/index");
const User = db.User;

adminRouter.post("/admin", adminController.findAdmin);
adminRouter.get("/admin", authenticateToken, adminController.getAdmin);

// Token refresh endpoint
adminRouter.post("/admin/refresh", async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: "Username is required!" });
    }
    
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }
    
    const payload = {
      username: user.username,
      id: user.id,
    };
    
    const token = await generateToken(payload);
    
    res.json({ 
      user: { username: user.username, id: user.id },
      token: token 
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ error: "Failed to refresh token" });
  }
});

// Temporary endpoint to create admin user (remove after use)
adminRouter.get("/admin/create", async (req, res) => {
  try {
    // Test database connection first
    await db.sequelize.authenticate();
    console.log('Database connection successful');
    
    const existingAdmin = await User.findOne({ where: { username: 'admin' } });
    
    if (existingAdmin) {
      return res.json({ 
        message: 'Admin user already exists!', 
        username: 'admin', 
        password: 'admin123',
        status: 'success'
      });
    }

    await User.create({
      username: 'admin',
      password: 'admin123'
    });

    res.json({ 
      message: 'Admin user created successfully!', 
      username: 'admin', 
      password: 'admin123',
      status: 'success'
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({ 
      error: 'Failed to create admin user', 
      details: error.message,
      status: 'error'
    });
  }
});

module.exports = adminRouter;
