const express = require("express");
const db = require("./models/index");
const adminRouter = require("./routes/adminRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const departmentRouter = require("./routes/departmentRoutes");
const shiftRouter = require("./routes/shiftRoutes");
const patientRouter = require("./routes/patientRoutes");
const appointmentRouter = require("./routes/appointmentRouter");
const pharmacyRouter = require("./routes/pharmacyRoutes");
const cors = require("cors");

// Database connection and sync with timeout handling
const initializeDatabase = async () => {
  const timeout = setTimeout(() => {
    console.log('Database connection timed out, continuing without database...');
    global.dbConnected = false;
  }, 10000); // 10 second timeout

  try {
    console.log('Attempting to connect to database...');
    console.log('Database config:', {
      host: db.sequelize.config.host,
      port: db.sequelize.config.port,
      database: db.sequelize.config.database,
      dialect: db.sequelize.config.dialect
    });
    
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync database (create tables if they don't exist) - use force: false to avoid data loss
    await db.sequelize.sync({ force: false, alter: false });
    console.log('Database synchronized successfully.');
    
    // Check if admin user exists, if not create one
    const User = db.User;
    const existingAdmin = await User.findOne({ where: { username: 'admin' } });
    
    if (!existingAdmin) {
      await User.create({
        username: 'admin',
        password: 'admin123'
      });
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
    
    // Set global flag to indicate database is available
    global.dbConnected = true;
    clearTimeout(timeout);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    console.error('Database error details:', error.message);
    console.error('Database config:', db.sequelize.config);
    
    // Set global flag to indicate database is not available
    global.dbConnected = false;
    console.log('Continuing without database connection...');
    clearTimeout(timeout);
  }
};

const app = express();
app.use(express.json({ limit: "20mb" }));
app.use(cors({
  origin: ['https://cliniva.netlify.app', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

// Root route for testing
app.get("/", (req, res) => {
  res.json({ 
    message: "Hospital Management System API is running!", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    databaseConnected: global.dbConnected || false
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    databaseConnected: global.dbConnected || false
  });
});

// Simple test endpoint
app.get("/test", (req, res) => {
  res.json({ 
    message: "Server is working!", 
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    databaseConnected: global.dbConnected || false
  });
});

app.use(
  "/api",
  doctorRouter,
  adminRouter,
  departmentRouter,
  shiftRouter,
  patientRouter,
  appointmentRouter,
  pharmacyRouter
);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

const PORT = process.env.PORT || 4000;

// Start server immediately, then initialize database
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Database URL: ${process.env.DATABASE_URL ? 'Set' : 'Not set'}`);
  
  // Initialize database in background
  initializeDatabase().catch(err => {
    console.error('Database initialization failed:', err);
  });
});
