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

// Import Routers
const adminRouter = require("./routes/adminRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const departmentRouter = require("./routes/departmentRoutes");
const shiftRouter = require("./routes/shiftRoutes");
const patientRouter = require("./routes/patientRoutes");
const appointmentRouter = require("./routes/appointmentRouter");
const pharmacyRouter = require("./routes/pharmacyRoutes");

// Mount Routers
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
    databaseConnected: global.dbConnected || false
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
  try {
    const isConnected = await db.checkConnection();
    if (!isConnected) {
      throw new Error('Failed to connect to CognoDB');
    }
    console.log('✅ Database module loaded successfully');
    global.dbConnected = true;
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is Running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
