const express = require("express");
const doctorRouter = express();
const doctorController = require("../controllers/doctorController");
const { authenticateToken } = require("../middleware/Auth");

doctorRouter.post("/doctor", authenticateToken, doctorController.addDoctor);
doctorRouter.post("/doctor/register", doctorController.addDoctor);
doctorRouter.post("/doctor/login", doctorController.loginDoctor);
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

// Emergency endpoint to add basic doctors to production
doctorRouter.post("/doctors/emergency-add", async (req, res) => {
  try {
    const bcrypt = require('bcryptjs');
    const { Doctor } = require('../models');
    
    const hashedPassword = await bcrypt.hash('doctor123', 10);
    
    const basicDoctor = {
      firstName: 'Dr. John',
      lastName: 'Smith',
      gender: 'Male',
      mobile: '5551234567',
      password: hashedPassword,
      designation: 'Neurologist',
      department: 'Neurology',
      address: '123 Medical Center Dr',
      email: 'john.smith@hospital.com',
      birth: new Date('1980-01-01'),
      education: 'MD, Neurology',
      doctorimg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    };

    // Add basic doctor
    await Doctor.create(basicDoctor);
    
    res.json({ 
      message: 'Emergency doctor added successfully',
      doctor: basicDoctor
    });
  } catch (error) {
    console.error('Error adding emergency doctor:', error);
    res.status(500).json({ error: 'Failed to add emergency doctor', details: error.message });
  }
});

// Clear and re-populate doctor table with 7 doctors
doctorRouter.post("/doctors/clear-and-populate", async (req, res) => {
  try {
    const bcrypt = require('bcryptjs');
    const { Doctor } = require('../models');
    
    // Clear existing doctors
    await Doctor.destroy({ where: {} });
    console.log('✅ Cleared existing doctors');
    
    const hashedPassword = await bcrypt.hash('doctor123', 10);
    
    const sevenDoctors = [
      {
        firstName: 'Dr. Sarah',
        lastName: 'Johnson',
        gender: 'Female',
        mobile: '5551234567',
        password: hashedPassword,
        designation: 'Neurologist',
        department: 'Neurology',
        address: '123 Brain Institute Dr',
        email: 'sarah.johnson@hospital.com',
        birth: new Date('1980-05-15'),
        education: 'MD, Neurology',
        doctorimg: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. Michael',
        lastName: 'Chen',
        gender: 'Male',
        mobile: '5552345678',
        password: hashedPassword,
        designation: 'Orthopedic Surgeon',
        department: 'Orthopedics',
        address: '456 Bone Health Way',
        email: 'michael.chen@hospital.com',
        birth: new Date('1975-08-22'),
        education: 'MD, Orthopedic Surgery',
        doctorimg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. Emily',
        lastName: 'Rodriguez',
        gender: 'Female',
        mobile: '5553456789',
        password: hashedPassword,
        designation: 'Gynecologist',
        department: 'Gynaecology',
        address: '789 Women Health Plaza',
        email: 'emily.rodriguez@hospital.com',
        birth: new Date('1982-12-10'),
        education: 'MD, Gynecology',
        doctorimg: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. David',
        lastName: 'Thompson',
        gender: 'Male',
        mobile: '5554567890',
        password: hashedPassword,
        designation: 'Microbiologist',
        department: 'Microbiology',
        address: '321 Lab Research Ave',
        email: 'david.thompson@hospital.com',
        birth: new Date('1978-03-25'),
        education: 'MD, Microbiology',
        doctorimg: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. Lisa',
        lastName: 'Wang',
        gender: 'Female',
        mobile: '5555678901',
        password: hashedPassword,
        designation: 'Neurologist',
        department: 'Neurology',
        address: '654 Brain Center Blvd',
        email: 'lisa.wang@hospital.com',
        birth: new Date('1985-07-18'),
        education: 'MD, Neurology',
        doctorimg: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. James',
        lastName: 'Wilson',
        gender: 'Male',
        mobile: '5556789012',
        password: hashedPassword,
        designation: 'Orthopedic Surgeon',
        department: 'Orthopedics',
        address: '987 Joint Care St',
        email: 'james.wilson@hospital.com',
        birth: new Date('1973-11-30'),
        education: 'MD, Orthopedic Surgery',
        doctorimg: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. Maria',
        lastName: 'Garcia',
        gender: 'Female',
        mobile: '5557890123',
        password: hashedPassword,
        designation: 'Gynecologist',
        department: 'Gynaecology',
        address: '147 Women Care Rd',
        email: 'maria.garcia@hospital.com',
        birth: new Date('1981-04-12'),
        education: 'MD, Gynecology',
        doctorimg: 'https://images.unsplash.com/photo-1551601651-bc60f254d532?w=150&h=150&fit=crop&crop=face'
      }
    ];

    // Add 7 new doctors
    await Doctor.bulkCreate(sevenDoctors);
    console.log('✅ Added 7 new doctors');
    
    res.json({ 
      message: 'Doctor table cleared and re-populated successfully with 7 doctors',
      doctorsAdded: sevenDoctors.length
    });
  } catch (error) {
    console.error('Error clearing and populating doctors:', error);
    res.status(500).json({ error: 'Failed to clear and populate doctors', details: error.message });
  }
});

// Initialize database with tables and sample data
doctorRouter.post("/doctors/init", async (req, res) => {
  try {
    const bcrypt = require('bcryptjs');
    const { Doctor } = require('../models');
    
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
    const { Doctor } = require('../models');
    
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
