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

// Database connection and sync
const initializeDatabase = async () => {
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
    
    // Sync database (create tables if they don't exist)
    await db.sequelize.sync({ force: false, alter: true });
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
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    console.error('Database error details:', error.message);
    console.error('Database config:', db.sequelize.config);
    
    // Don't exit the process, just log the error
    console.log('Continuing without database connection...');
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
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Simple test endpoint
app.get("/test", (req, res) => {
  res.json({ 
    message: "Server is working!", 
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
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



const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`Server is Running on ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Database URL: ${process.env.DATABASE_URL ? 'Set' : 'Not set'}`);
  await initializeDatabase();
});
