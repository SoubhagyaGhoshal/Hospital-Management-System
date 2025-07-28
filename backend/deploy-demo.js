const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json({ limit: "20mb" }));
app.use(cors({
  origin: ['https://cliniva.netlify.app', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Hospital Management System API is running in DEMO mode!", 
    timestamp: new Date().toISOString(),
    environment: 'demo',
    databaseConnected: false,
    mode: 'demo'
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    environment: 'demo',
    databaseConnected: false,
    mode: 'demo'
  });
});

// Demo API routes
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

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message,
    demo: true
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method,
    demo: true
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Demo Server is Running on ${PORT}`);
  console.log(`🌍 Environment: demo`);
  console.log(`📊 Mode: Demo`);
  console.log(`🔗 Test admin login with: admin/admin123`);
});

module.exports = app; 