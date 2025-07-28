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
    environment: process.env.NODE_ENV || 'development',
    message: "Server is ready for deployment!"
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Hospital Management System API is running!", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    deployment: "ready"
  });
});

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ 
    message: "Test endpoint working!", 
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
});

// Start server immediately
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🏠 Root endpoint: http://localhost:${PORT}/`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`\n🚀 Ready for deployment!`);
}); 