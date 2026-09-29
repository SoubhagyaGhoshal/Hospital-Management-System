'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('doctor123', 10);
    
    await queryInterface.bulkInsert('Doctors', [
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
        doctorimg: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date()
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
        doctorimg: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date()
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
        doctorimg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {});
  }
}; 