const express = require("express");
const cors = require("cors");

// Try to load database, but don't fail if it's not available
let db;
let globalDbConnected = false;

try {
  db = require("./models/index");
  console.log("✅ Database module loaded successfully");
} catch (error) {
  console.log("⚠️  Database module not available:", error.message);
  console.log("📝 Server will run in demo mode without database functionality");
  globalDbConnected = false;
}

const adminRouter = require("./routes/adminRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const departmentRouter = require("./routes/departmentRoutes");
const shiftRouter = require("./routes/shiftRoutes");
const patientRouter = require("./routes/patientRoutes");
const appointmentRouter = require("./routes/appointmentRouter");
const pharmacyRouter = require("./routes/pharmacyRoutes");

// Database connection and sync with timeout handling
const initializeDatabase = async () => {
  if (!db) {
    console.log("📝 No database available, running in demo mode");
    return;
  }

  const timeout = setTimeout(() => {
    console.log('⏰ Database connection timed out, continuing in demo mode...');
    global.dbConnected = false;
  }, 10000); // 10 second timeout

  try {
    console.log('🔗 Attempting to connect to database...');
    console.log('📊 Database config:', {
      host: db.sequelize.config.host,
      port: db.sequelize.config.port,
      database: db.sequelize.config.database,
      dialect: db.sequelize.config.dialect
    });
    
    await db.sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    
    // Sync database (create tables if they don't exist) - use force: false to avoid data loss
    await db.sequelize.sync({ force: false, alter: false });
    console.log('🔄 Database synchronized successfully.');
    
    // Check if admin user exists, if not create one
    if (db.User) {
      const User = db.User;
      const existingAdmin = await User.findOne({ where: { username: 'admin' } });
      
      if (!existingAdmin) {
        await User.create({
          username: 'admin',
          password: 'admin123'
        });
        console.log('👤 Admin user created successfully');
      } else {
        console.log('👤 Admin user already exists');
      }
    }
    
    // Set global flag to indicate database is available
    global.dbConnected = true;
    clearTimeout(timeout);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    console.error('🔍 Database error details:', error.message);
    if (db && db.sequelize && db.sequelize.config) {
      console.error('📊 Database config:', db.sequelize.config);
    }
    
    // Set global flag to indicate database is not available
    global.dbConnected = false;
    console.log('📝 Continuing in demo mode without database connection...');
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
    databaseConnected: global.dbConnected || false,
    mode: global.dbConnected ? 'production' : 'demo'
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    databaseConnected: global.dbConnected || false,
    mode: global.dbConnected ? 'production' : 'demo'
  });
});

// Simple test endpoint
app.get("/test", (req, res) => {
  res.json({ 
    message: "Server is working!", 
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    databaseConnected: global.dbConnected || false,
    mode: global.dbConnected ? 'production' : 'demo'
  });
});

// Demo mode API routes
const createDemoRoutes = () => {
  // Admin login demo
  app.post("/api/admin", (req, res) => {
    const { username, password } = req.body;
    
    if (username === "admin" && password === "admin123") {
      const token = "demo-token-" + Date.now();
      res.json({
        success: true,
        message: "Login successful (Demo Mode)",
        token: token,
        user: {
          username: "admin",
          role: "admin"
        },
        demo: true
      });
    } else {
      res.status(401).json({
        error: "Invalid credentials",
        message: "Please use admin/admin123 for demo mode",
        demo: true
      });
    }
  });

  // Demo data endpoints
  app.get("/api/doctors", (req, res) => {
    res.json({
      doctors: [
        {
          id: 1,
          name: "Dr. John Smith",
          specialization: "Cardiology",
          email: "john.smith@demo.com",
          phone: "+1234567890"
        },
        {
          id: 2,
          name: "Dr. Sarah Johnson",
          specialization: "Neurology",
          email: "sarah.johnson@demo.com",
          phone: "+1234567891"
        }
      ],
      demo: true,
      message: "Demo data - No real database connection"
    });
  });

  app.get("/api/patients", (req, res) => {
    res.json({
      patients: [
        {
          id: 1,
          name: "Alice Brown",
          email: "alice.brown@demo.com",
          phone: "+1234567892",
          bloodGroup: "O+"
        },
        {
          id: 2,
          name: "Bob Wilson",
          email: "bob.wilson@demo.com",
          phone: "+1234567893",
          bloodGroup: "A-"
        }
      ],
      demo: true,
      message: "Demo data - No real database connection"
    });
  });

  // Generic demo response for other endpoints
  app.use("/api", (req, res) => {
    res.status(503).json({ 
      error: 'Demo mode - Database not available',
      message: 'This is a demo version. Please use admin/admin123 to login.',
      demo: true,
      timestamp: new Date().toISOString(),
      note: "Full functionality requires database connection"
    });
  });
};

// Add routes based on database availability
if (db && global.dbConnected) {
  console.log("✅ Using production routes with database");
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
} else {
  console.log("⚠️  Using demo routes without database");
  createDemoRoutes();
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message,
    demo: !global.dbConnected
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method,
    demo: !global.dbConnected
  });
});

const PORT = process.env.PORT || 4000;

// Start server immediately, then initialize database
app.listen(PORT, () => {
  console.log(`🚀 Server is Running on ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Database URL: ${process.env.DATABASE_URL ? 'Set' : 'Not set'}`);
  console.log(`📊 Mode: ${global.dbConnected ? 'Production' : 'Demo'}`);
  
  // Initialize database in background
  initializeDatabase().catch(err => {
    console.error('❌ Database initialization failed:', err);
  });
});
