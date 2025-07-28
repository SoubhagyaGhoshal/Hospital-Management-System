const express = require("express");
const adminRouter = express();
const adminController = require("../controllers/adminController");
const { authenticateToken } = require("../middleware/Auth");
const db = require("../models/index");
const User = db.User;

adminRouter.post("/admin", adminController.findAdmin);
adminRouter.get("/admin", authenticateToken, adminController.getAdmin);

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
