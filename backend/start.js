const express = require("express");
const cors = require("cors");

const app = express();

// Basic middleware
app.use(express.json({ limit: "20mb" }));
app.use(cors({
  origin: ['https://cliniva.netlify.app', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

// Health check endpoint - responds immediately
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Hospital Management System API is running!", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Start server immediately
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  
  // Try to initialize database in background
  try {
    const db = require("./models/index");
    console.log('Database module loaded successfully');
  } catch (error) {
    console.log('Database module not available:', error.message);
  }
}); 