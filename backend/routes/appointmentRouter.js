const express = require("express");
const appointmentRouter = express();
const appointmentController = require("./../controllers/appointmentControllers");
const { authenticateToken } = require("../middleware/Auth");

appointmentRouter.post("/appointment", appointmentController.postAppointment);
appointmentRouter.get("/appointment", authenticateToken, appointmentController.getAllAppointment);
appointmentRouter.get(
    "/appointment/:id",
    authenticateToken,
    appointmentController.getAppointmentById
  );
appointmentRouter.put(
  "/appointment/:id",
  authenticateToken,
  appointmentController.updateAppointment
);
appointmentRouter.delete(
  "/appointment/:id",
  authenticateToken,
  appointmentController.deleteAppointment
);

// Test endpoint for debugging
appointmentRouter.get("/appointment-test", async (req, res) => {
  try {
    const db = require("../models/index");
    const Appointment = db.Appointment;
    
    // Test database connection
    await db.sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    // Test appointment table
    const count = await Appointment.count();
    console.log(`✅ Appointment table accessible, count: ${count}`);
    
    // Test finding appointments
    const appointments = await Appointment.findAll({ limit: 5 });
    console.log(`✅ Found ${appointments.length} appointments`);
    
    res.json({
      success: true,
      count: count,
      appointments: appointments
    });
  } catch (error) {
    console.error('❌ Database test failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
});

// Database connection test endpoint
appointmentRouter.get("/db-test", async (req, res) => {
  try {
    const db = require("../models/index");
    
    console.log('Testing production database connection...');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Database config:', {
      host: db.sequelize.config.host,
      port: db.sequelize.config.port,
      database: db.sequelize.config.database,
      dialect: db.sequelize.config.dialect
    });
    
    // Test database connection
    await db.sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    // Test appointment table
    const Appointment = db.Appointment;
    const count = await Appointment.count();
    console.log(`✅ Appointment table accessible, count: ${count}`);
    
    res.json({
      success: true,
      message: 'Database connection successful',
      count: count,
      config: {
        host: db.sequelize.config.host,
        port: db.sequelize.config.port,
        database: db.sequelize.config.database,
        dialect: db.sequelize.config.dialect
      }
    });
  } catch (error) {
    console.error('❌ Database test failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      config: {
        host: db?.sequelize?.config?.host,
        port: db?.sequelize?.config?.port,
        database: db?.sequelize?.config?.database,
        dialect: db?.sequelize?.config?.dialect
      }
    });
  }
});

module.exports = appointmentRouter;
