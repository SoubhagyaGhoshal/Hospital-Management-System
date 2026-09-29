require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json({ limit: "20mb" }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import database connection
const db = require('./models/index');
const { requireDatabase } = require('./middleware/dbCheck');

// Import Routers
const adminRouter = require("./routes/adminRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const departmentRouter = require("./routes/departmentRoutes");
const shiftRouter = require("./routes/shiftRoutes");
const patientRouter = require("./routes/patientRoutes");
const appointmentRouter = require("./routes/appointmentRouter");
const pharmacyRouter = require("./routes/pharmacyRoutes");

// Mount Routers — requireDatabase returns 503 when CognoDB is unreachable
app.use("/api", requireDatabase);
app.use("/api", doctorRouter);
app.use("/api", adminRouter);
app.use("/api", departmentRouter);
app.use("/api", shiftRouter);
app.use("/api", patientRouter);
app.use("/api", appointmentRouter);
app.use("/api", pharmacyRouter);


// Health check endpoint
app.get("/test", (req, res) => {
  res.json({ 
    message: "Server is working!", 
    timestamp: new Date().toISOString(),
    databaseConnected: db.getConnectionStatus()
  });
});


app.get("/", (req, res) => {
  res.send("<h1>Hospital Management System API is running!</h1>");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Initialize database and start server
const startServer = async () => {
  // 1. Start the HTTP server FIRST so Render's health check passes
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server is Running on port ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  // 2. Then attempt DB connection (non-blocking for the HTTP server)
  try {
    console.log('🔌 Connecting to CognoDB...');
    const isConnected = await db.checkConnection();

    if (isConnected) {
      console.log('✅ Database module loaded successfully');
      global.dbConnected = true;
    } else {
      console.warn('⚠️  CognoDB is currently unreachable. Server is running without database.');
      console.warn('   API routes that require the database will return errors until it reconnects.');
      global.dbConnected = false;

      // Start background reconnection loop
      db.startBackgroundReconnect();
    }
  } catch (error) {
    console.error('❌ Unexpected error during DB initialization:', error.message);
    global.dbConnected = false;

    // Start background reconnection loop
    db.startBackgroundReconnect();
  }
};

startServer();
