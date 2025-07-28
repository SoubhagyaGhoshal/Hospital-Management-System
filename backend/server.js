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

const app = express();
app.use(express.json({ limit: "20mb" }));
app.use(cors());

// Root route for testing
app.get("/", (req, res) => {
  res.json({ message: "Hospital Management System API is running!" });
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

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
