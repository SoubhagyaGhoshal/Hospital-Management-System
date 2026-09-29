'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('doctor123', 10);
    
    return queryInterface.bulkInsert('Doctors', [
      {
        firstName: 'Dr. Robert',
        lastName: 'Anderson',
        gender: 'Male',
        mobile: '5551234568',
        password: hashedPassword,
        designation: 'Cardiologist',
        department: 'Cardiology',
        address: '456 Heart Center Dr',
        email: 'robert.anderson@hospital.com',
        birth: '1975-03-15',
        education: 'MD, Cardiology, Harvard Medical School',
        doctorimg: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Dr. Jennifer',
        lastName: 'Martinez',
        gender: 'Female',
        mobile: '5551234569',
        password: hashedPassword,
        designation: 'Dermatologist',
        department: 'Dermatology',
        address: '789 Skin Care Blvd',
        email: 'jennifer.martinez@hospital.com',
        birth: '1983-07-22',
        education: 'MD, Dermatology, Stanford University',
        doctorimg: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Dr. Kevin',
        lastName: 'O\'Connor',
        gender: 'Male',
        mobile: '5551234570',
        password: hashedPassword,
        designation: 'Psychiatrist',
        department: 'Psychiatry',
        address: '321 Mental Health St',
        email: 'kevin.oconnor@hospital.com',
        birth: '1978-11-08',
        education: 'MD, Psychiatry, Yale University',
        doctorimg: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Dr. Amanda',
        lastName: 'Taylor',
        gender: 'Female',
        mobile: '5551234571',
        password: hashedPassword,
        designation: 'Oncologist',
        department: 'Oncology',
        address: '654 Cancer Research Rd',
        email: 'amanda.taylor@hospital.com',
        birth: '1980-09-14',
        education: 'MD, Oncology, Johns Hopkins University',
        doctorimg: 'https://images.unsplash.com/photo-1551601651-bc60f254d532?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Doctors', {
      email: [
        'robert.anderson@hospital.com',
        'jennifer.martinez@hospital.com',
        'kevin.oconnor@hospital.com',
        'amanda.taylor@hospital.com'
      ]
    }, {});
  }
}; 