const express = require("express");
const doctorRouter = express();
const doctorController = require("../controllers/doctorController");
const { authenticateToken } = require("../middleware/Auth");

doctorRouter.post("/doctor", authenticateToken, doctorController.addDoctor);
doctorRouter.post("/doctor/register", doctorController.addDoctor);
doctorRouter.get("/doctor", authenticateToken, doctorController.getAllDoctor);
// Public endpoint for getting all doctors (for admin dashboard)
doctorRouter.get("/doctors/public", doctorController.getAllDoctor);
doctorRouter.put(
  "/doctor/:id",
  authenticateToken,
  doctorController.updateDoctor
);
doctorRouter.get(
  "/doctor/:id",
  authenticateToken,
  doctorController.getDoctorById
);
doctorRouter.delete(
  "/doctor/:id",
  authenticateToken,
  doctorController.dltDoctorById
);

// Initialize database with tables and sample data
doctorRouter.post("/doctors/init", async (req, res) => {
  try {
    const bcrypt = require('bcryptjs');
    const Doctor = require('../models/doctor');
    const { Sequelize } = require('sequelize');
    
    // Force sync to create tables
    await Doctor.sync({ force: true });
    
    const hashedPassword = await bcrypt.hash('doctor123', 10);
    
    const sampleDoctors = [
      {
        firstName: 'Jane',
        lastName: 'Smith',
        gender: 'Female',
        mobile: '5551234567',
        password: hashedPassword,
        designation: 'Neurologist',
        department: 'Neurology',
        address: '123 Medical Center Dr',
        email: 'jane@example.com',
        birth: new Date('1985-03-15'),
        education: 'MD, Neurology',
        doctorimg: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Alice',
        lastName: 'Brown',
        gender: 'Female',
        mobile: '5552345678',
        password: hashedPassword,
        designation: 'Neurologist',
        department: 'Neurology',
        address: '456 Health Plaza',
        email: 'alice@example.com',
        birth: new Date('1980-07-22'),
        education: 'MD, Neurology',
        doctorimg: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Bob',
        lastName: 'Green',
        gender: 'Male',
        mobile: '5553456789',
        password: hashedPassword,
        designation: 'Orthopedic Surgeon',
        department: 'Orthopedics',
        address: '789 Hospital Way',
        email: 'bob@example.com',
        birth: new Date('1978-11-10'),
        education: 'MD, Orthopedic Surgery',
        doctorimg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }
    ];

    // Add sample doctors
    await Doctor.bulkCreate(sampleDoctors);
    
    res.json({ message: 'Database initialized successfully with sample doctors' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ error: 'Failed to initialize database', details: error.message });
  }
});

// Temporary endpoint to populate database with sample doctors (for production)
doctorRouter.post("/doctors/populate", async (req, res) => {
  try {
    const bcrypt = require('bcryptjs');
    const Doctor = require('../models/doctor');
    
    const hashedPassword = await bcrypt.hash('doctor123', 10);
    
    const sampleDoctors = [
      {
        firstName: 'Jane',
        lastName: 'Smith',
        gender: 'Female',
        mobile: '5551234567',
        password: hashedPassword,
        designation: 'Neurologist',
        department: 'Neurology',
        address: '123 Medical Center Dr',
        email: 'jane@example.com',
        birth: new Date('1985-03-15'),
        education: 'MD, Neurology',
        doctorimg: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Alice',
        lastName: 'Brown',
        gender: 'Female',
        mobile: '5552345678',
        password: hashedPassword,
        designation: 'Neurologist',
        department: 'Neurology',
        address: '456 Health Plaza',
        email: 'alice@example.com',
        birth: new Date('1980-07-22'),
        education: 'MD, Neurology',
        doctorimg: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Bob',
        lastName: 'Green',
        gender: 'Male',
        mobile: '5553456789',
        password: hashedPassword,
        designation: 'Orthopedic Surgeon',
        department: 'Orthopedics',
        address: '789 Hospital Way',
        email: 'bob@example.com',
        birth: new Date('1978-11-10'),
        education: 'MD, Orthopedic Surgery',
        doctorimg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }
    ];

    // Check if doctors already exist
    const existingDoctors = await Doctor.findAll();
    if (existingDoctors.length > 0) {
      return res.json({ message: 'Doctors already exist in database' });
    }

    // Add sample doctors
    await Doctor.bulkCreate(sampleDoctors);
    
    res.json({ message: 'Sample doctors added successfully' });
  } catch (error) {
    console.error('Error populating doctors:', error);
    res.status(500).json({ error: 'Failed to populate doctors' });
  }
});

module.exports = doctorRouter;
