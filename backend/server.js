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
    global.dbConnected = false;
    return;
  }

  const timeout = setTimeout(() => {
    console.log('⏰ Database connection timed out, continuing in demo mode...');
    global.dbConnected = false;
  }, 15000); // 15 second timeout for production

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
    console.log('🔄 Switching to production routes...');
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

// In-memory database for production when external database fails
const inMemoryDB = {
  users: [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  doctors: [],
  patients: [],
  appointments: [],
  departments: [],
  pharmacy: [],
  shifts: []
};

// Production routes with in-memory database
const createProductionRoutes = () => {
  console.log('✅ Adding production routes');
  
  // Admin login with real authentication
  app.post("/api/admin", async (req, res) => {
    console.log('Admin login request received:', {
      method: req.method,
      body: req.body,
      headers: req.headers
    });
    
    const { username, password } = req.body;
    
    // Check in-memory database
    const user = inMemoryDB.users.find(u => u.username === username && u.password === password);
    
    if (user) {
      const jwt = require('jsonwebtoken');
      const token = jwt.sign(
        { username: user.username, id: user.id },
        process.env.SECRET_KEY || 'hospital_management_secret_key_2024_secure_and_unique',
        { expiresIn: '24h' }
      );
      
      console.log('Admin login successful for user:', username);
      res.json({
        success: true,
        message: "Login successful",
        token: token,
        user: {
          username: user.username,
          role: user.role
        }
      });
    } else {
      res.status(401).json({
        error: "Invalid credentials",
        message: "Please use admin/admin123 to login"
      });
    }
  });

  // Admin GET endpoint for authentication verification
  app.get("/api/admin", (req, res) => {
    res.json({
      message: "Admin endpoint available",
      timestamp: new Date().toISOString(),
      note: "Use POST /api/admin with username/password to login"
    });
  });

  // Add other production endpoints here...
  app.get("/api/doctors", (req, res) => {
    res.json({
      doctors: inMemoryDB.doctors,
      message: "Doctors data from in-memory database"
    });
  });

  app.get("/api/patients", (req, res) => {
    res.json({
      patients: inMemoryDB.patients,
      message: "Patients data from in-memory database"
    });
  });

  app.get("/api/appointments", (req, res) => {
    res.json({
      appointments: inMemoryDB.appointments,
      message: "Appointments data from in-memory database"
    });
  });
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
    console.log('Admin login request received:', {
      method: req.method,
      body: req.body,
      headers: req.headers
    });
    
    const { username, password } = req.body;
    
    if (username === "admin" && password === "admin123") {
      const token = "demo-token-" + Date.now();
      console.log('Admin login successful for user:', username);
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

  // Admin GET endpoint for authentication verification
  app.get("/api/admin", (req, res) => {
    res.json({
      error: "Demo mode - Database not available",
      message: "This is a demo version. Please use admin/admin123 to login.",
      demo: true,
      timestamp: new Date().toISOString(),
      note: "Full functionality requires database connection"
    });
  });

  // Demo data endpoints
  app.get("/api/doctors", (req, res) => {
    res.json({
      doctors: [
        {
          id: 1,
          firstName: "Dr. Sarah",
          lastName: "Johnson",
          gender: "Female",
          mobile: "5551234567",
          designation: "Neurologist",
          department: "Neurology",
          address: "123 Brain Institute Dr",
          email: "sarah.johnson@hospital.com",
          birth: "1980-05-15T00:00:00.000Z",
          education: "MD, Neurology",
          doctorimg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 2,
          firstName: "Dr. Michael",
          lastName: "Chen",
          gender: "Male",
          mobile: "5552345678",
          designation: "Orthopedic Surgeon",
          department: "Orthopedics",
          address: "456 Bone Health Way",
          email: "michael.chen@hospital.com",
          birth: "1975-08-22T00:00:00.000Z",
          education: "MD, Orthopedic Surgery",
          doctorimg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 3,
          firstName: "Dr. Emily",
          lastName: "Rodriguez",
          gender: "Female",
          mobile: "5553456789",
          designation: "Gynecologist",
          department: "Gynaecology",
          address: "789 Women Health Plaza",
          email: "emily.rodriguez@hospital.com",
          birth: "1982-12-10T00:00:00.000Z",
          education: "MD, Gynecology",
          doctorimg: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 4,
          firstName: "Dr. David",
          lastName: "Thompson",
          gender: "Male",
          mobile: "5554567890",
          designation: "Microbiologist",
          department: "Microbiology",
          address: "321 Lab Research Ave",
          email: "david.thompson@hospital.com",
          birth: "1978-03-25T00:00:00.000Z",
          education: "MD, Microbiology",
          doctorimg: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 5,
          firstName: "Dr. Lisa",
          lastName: "Wang",
          gender: "Female",
          mobile: "5555678901",
          designation: "Neurologist",
          department: "Neurology",
          address: "654 Brain Center Blvd",
          email: "lisa.wang@hospital.com",
          birth: "1985-07-18T00:00:00.000Z",
          education: "MD, Neurology",
          doctorimg: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 6,
          firstName: "Dr. James",
          lastName: "Wilson",
          gender: "Male",
          mobile: "5556789012",
          designation: "Orthopedic Surgeon",
          department: "Orthopedics",
          address: "987 Joint Care St",
          email: "james.wilson@hospital.com",
          birth: "1973-11-30T00:00:00.000Z",
          education: "MD, Orthopedic Surgery",
          doctorimg: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 7,
          firstName: "Dr. Maria",
          lastName: "Garcia",
          gender: "Female",
          mobile: "5557890123",
          designation: "Gynecologist",
          department: "Gynaecology",
          address: "147 Women Care Rd",
          email: "maria.garcia@hospital.com",
          birth: "1981-04-12T00:00:00.000Z",
          education: "MD, Gynecology",
          doctorimg: "https://images.unsplash.com/photo-1551601651-bc60f254d532?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 8,
          firstName: "Dr. Robert",
          lastName: "Brown",
          gender: "Male",
          mobile: "5558901234",
          designation: "Cardiologist",
          department: "Cardiology",
          address: "258 Heart Center Dr",
          email: "robert.brown@hospital.com",
          birth: "1976-09-05T00:00:00.000Z",
          education: "MD, Cardiology",
          doctorimg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        }
      ],
      demo: true,
      message: "Demo data - No real database connection"
    });
  });

  app.get("/api/doctors/public", (req, res) => {
    res.json({
      doctors: [
        {
          id: 1,
          firstName: "Dr. Sarah",
          lastName: "Johnson",
          gender: "Female",
          mobile: "5551234567",
          designation: "Neurologist",
          department: "Neurology",
          address: "123 Brain Institute Dr",
          email: "sarah.johnson@hospital.com",
          birth: "1980-05-15T00:00:00.000Z",
          education: "MD, Neurology",
          doctorimg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 2,
          firstName: "Dr. Michael",
          lastName: "Chen",
          gender: "Male",
          mobile: "5552345678",
          designation: "Orthopedic Surgeon",
          department: "Orthopedics",
          address: "456 Bone Health Way",
          email: "michael.chen@hospital.com",
          birth: "1975-08-22T00:00:00.000Z",
          education: "MD, Orthopedic Surgery",
          doctorimg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 3,
          firstName: "Dr. Emily",
          lastName: "Rodriguez",
          gender: "Female",
          mobile: "5553456789",
          designation: "Gynecologist",
          department: "Gynaecology",
          address: "789 Women Health Plaza",
          email: "emily.rodriguez@hospital.com",
          birth: "1982-12-10T00:00:00.000Z",
          education: "MD, Gynecology",
          doctorimg: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 4,
          firstName: "Dr. David",
          lastName: "Thompson",
          gender: "Male",
          mobile: "5554567890",
          designation: "Microbiologist",
          department: "Microbiology",
          address: "321 Lab Research Ave",
          email: "david.thompson@hospital.com",
          birth: "1978-03-25T00:00:00.000Z",
          education: "MD, Microbiology",
          doctorimg: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 5,
          firstName: "Dr. Lisa",
          lastName: "Wang",
          gender: "Female",
          mobile: "5555678901",
          designation: "Neurologist",
          department: "Neurology",
          address: "654 Brain Center Blvd",
          email: "lisa.wang@hospital.com",
          birth: "1985-07-18T00:00:00.000Z",
          education: "MD, Neurology",
          doctorimg: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 6,
          firstName: "Dr. James",
          lastName: "Wilson",
          gender: "Male",
          mobile: "5556789012",
          designation: "Orthopedic Surgeon",
          department: "Orthopedics",
          address: "987 Joint Care St",
          email: "james.wilson@hospital.com",
          birth: "1973-11-30T00:00:00.000Z",
          education: "MD, Orthopedic Surgery",
          doctorimg: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 7,
          firstName: "Dr. Maria",
          lastName: "Garcia",
          gender: "Female",
          mobile: "5557890123",
          designation: "Gynecologist",
          department: "Gynaecology",
          address: "147 Women Care Rd",
          email: "maria.garcia@hospital.com",
          birth: "1981-04-12T00:00:00.000Z",
          education: "MD, Gynecology",
          doctorimg: "https://images.unsplash.com/photo-1551601651-bc60f254d532?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 8,
          firstName: "Dr. Robert",
          lastName: "Brown",
          gender: "Male",
          mobile: "5558901234",
          designation: "Cardiologist",
          department: "Cardiology",
          address: "258 Heart Center Dr",
          email: "robert.brown@hospital.com",
          birth: "1976-09-05T00:00:00.000Z",
          education: "MD, Cardiology",
          doctorimg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        }
      ],
      demo: true,
      message: "Demo data - No real database connection"
    });
  });

  app.get("/api/doctor", (req, res) => {
    res.json({
      doctors: [
        {
          id: 1,
          firstName: "Dr. Sarah",
          lastName: "Johnson",
          gender: "Female",
          mobile: "5551234567",
          designation: "Neurologist",
          department: "Neurology",
          address: "123 Brain Institute Dr",
          email: "sarah.johnson@hospital.com",
          birth: "1980-05-15T00:00:00.000Z",
          education: "MD, Neurology",
          doctorimg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 2,
          firstName: "Dr. Michael",
          lastName: "Chen",
          gender: "Male",
          mobile: "5552345678",
          designation: "Orthopedic Surgeon",
          department: "Orthopedics",
          address: "456 Bone Health Way",
          email: "michael.chen@hospital.com",
          birth: "1975-08-22T00:00:00.000Z",
          education: "MD, Orthopedic Surgery",
          doctorimg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 3,
          firstName: "Dr. Emily",
          lastName: "Rodriguez",
          gender: "Female",
          mobile: "5553456789",
          designation: "Gynecologist",
          department: "Gynaecology",
          address: "789 Women Health Plaza",
          email: "emily.rodriguez@hospital.com",
          birth: "1982-12-10T00:00:00.000Z",
          education: "MD, Gynecology",
          doctorimg: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 4,
          firstName: "Dr. David",
          lastName: "Thompson",
          gender: "Male",
          mobile: "5554567890",
          designation: "Microbiologist",
          department: "Microbiology",
          address: "321 Lab Research Ave",
          email: "david.thompson@hospital.com",
          birth: "1978-03-25T00:00:00.000Z",
          education: "MD, Microbiology",
          doctorimg: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 5,
          firstName: "Dr. Lisa",
          lastName: "Wang",
          gender: "Female",
          mobile: "5555678901",
          designation: "Neurologist",
          department: "Neurology",
          address: "654 Brain Center Blvd",
          email: "lisa.wang@hospital.com",
          birth: "1985-07-18T00:00:00.000Z",
          education: "MD, Neurology",
          doctorimg: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 6,
          firstName: "Dr. James",
          lastName: "Wilson",
          gender: "Male",
          mobile: "5556789012",
          designation: "Orthopedic Surgeon",
          department: "Orthopedics",
          address: "987 Joint Care St",
          email: "james.wilson@hospital.com",
          birth: "1973-11-30T00:00:00.000Z",
          education: "MD, Orthopedic Surgery",
          doctorimg: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 7,
          firstName: "Dr. Maria",
          lastName: "Garcia",
          gender: "Female",
          mobile: "5557890123",
          designation: "Gynecologist",
          department: "Gynaecology",
          address: "147 Women Care Rd",
          email: "maria.garcia@hospital.com",
          birth: "1981-04-12T00:00:00.000Z",
          education: "MD, Gynecology",
          doctorimg: "https://images.unsplash.com/photo-1551601651-bc60f254d532?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 8,
          firstName: "Dr. Robert",
          lastName: "Brown",
          gender: "Male",
          mobile: "5558901234",
          designation: "Cardiologist",
          department: "Cardiology",
          address: "258 Heart Center Dr",
          email: "robert.brown@hospital.com",
          birth: "1976-09-05T00:00:00.000Z",
          education: "MD, Cardiology",
          doctorimg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        }
      ],
      demo: true,
      message: "Demo data - No real database connection"
    });
  });

  app.get("/api/appointments/public", (req, res) => {
    res.json({
      appointments: [
        {
          id: 1,
          patientName: "Alice Brown",
          doctorName: "Dr. Sarah Johnson",
          date_of_appointment: "2025-01-15T10:00:00.000Z",
          time: "10:00 AM",
          status: "Scheduled",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 2,
          patientName: "Bob Wilson",
          doctorName: "Dr. Michael Chen",
          date_of_appointment: "2025-01-16T14:00:00.000Z",
          time: "2:00 PM",
          status: "Completed",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 3,
          patientName: "Carol Davis",
          doctorName: "Dr. Emily Rodriguez",
          date_of_appointment: "2025-01-17T09:00:00.000Z",
          time: "9:00 AM",
          status: "Scheduled",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        }
      ],
      demo: true,
      message: "Demo data - No real database connection"
    });
  });

  app.get("/api/patients/public", (req, res) => {
    res.json({
      patients: [
        {
          id: 1,
          firstName: "Alice",
          lastName: "Brown",
          gender: "Female",
          mobile: "5551234567",
          email: "alice.brown@demo.com",
          birth: "1990-03-15T00:00:00.000Z",
          bloodGroup: "O+",
          address: "123 Health St",
          patientImg: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          age: 34,
          maritalStatus: "Married",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 2,
          firstName: "Bob",
          lastName: "Wilson",
          gender: "Male",
          mobile: "5552345678",
          email: "bob.wilson@demo.com",
          birth: "1985-07-22T00:00:00.000Z",
          bloodGroup: "A-",
          address: "456 Medical Ave",
          patientImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          age: 39,
          maritalStatus: "Single",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 3,
          firstName: "Carol",
          lastName: "Davis",
          gender: "Female",
          mobile: "5553456789",
          email: "carol.davis@demo.com",
          birth: "1992-11-10T00:00:00.000Z",
          bloodGroup: "B+",
          address: "789 Care Blvd",
          patientImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          age: 31,
          maritalStatus: "Married",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 4,
          firstName: "David",
          lastName: "Miller",
          gender: "Male",
          mobile: "5554567890",
          email: "david.miller@demo.com",
          birth: "1988-04-25T00:00:00.000Z",
          bloodGroup: "AB+",
          address: "321 Wellness Rd",
          patientImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          age: 36,
          maritalStatus: "Divorced",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 5,
          firstName: "Emma",
          lastName: "Johnson",
          gender: "Female",
          mobile: "5555678901",
          email: "emma.johnson@demo.com",
          birth: "1995-09-18T00:00:00.000Z",
          bloodGroup: "O-",
          address: "654 Health Center Dr",
          patientImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
          age: 28,
          maritalStatus: "Single",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 6,
          firstName: "Michael",
          lastName: "Taylor",
          gender: "Male",
          mobile: "5556789012",
          email: "michael.taylor@demo.com",
          birth: "1982-12-03T00:00:00.000Z",
          bloodGroup: "A+",
          address: "987 Medical Plaza",
          patientImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
          age: 42,
          maritalStatus: "Married",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        }
      ],
      demo: true,
      message: "Demo data - No real database connection"
    });
  });

  app.get("/api/pharmacy/public", (req, res) => {
    res.json({
      pharmacy: [
        {
          id: 1,
          name: "Paracetamol",
          companyname: "ABC Pharmaceuticals",
          category: "Pain Relief",
          price: 5.99,
          stock: 150,
          description: "Effective pain reliever and fever reducer",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 2,
          name: "Amoxicillin",
          companyname: "XYZ Medical",
          category: "Antibiotic",
          price: 12.50,
          stock: 75,
          description: "Broad-spectrum antibiotic for bacterial infections",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 3,
          name: "Ibuprofen",
          companyname: "HealthCare Inc",
          category: "Anti-inflammatory",
          price: 8.25,
          stock: 200,
          description: "Non-steroidal anti-inflammatory drug",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 4,
          name: "Omeprazole",
          companyname: "MediCorp",
          category: "Gastric",
          price: 15.75,
          stock: 60,
          description: "Proton pump inhibitor for acid reflux",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
        },
        {
          id: 5,
          name: "Cetirizine",
          companyname: "AllergyCare",
          category: "Antihistamine",
          price: 6.50,
          stock: 120,
          description: "Relieves allergy symptoms and hay fever",
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z"
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

// Always add production routes - they will work when database is connected
console.log("✅ Adding production routes");

// Use in-memory database routes for production
createProductionRoutes();

// Also add the original routes as fallback
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
