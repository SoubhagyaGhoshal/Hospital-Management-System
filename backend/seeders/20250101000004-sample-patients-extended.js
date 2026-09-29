'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('patient123', 10);
    
    return queryInterface.bulkInsert('Patients', [
      {
        firstName: 'John',
        lastName: 'Smith',
        gender: 'Male',
        mobile: '5559876543',
        password: hashedPassword,
        address: '123 Oak Street, City',
        email: 'john.smith@email.com',
        birth: '1985-04-12',
        patientImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        gender: 'Female',
        mobile: '5559876544',
        password: hashedPassword,
        address: '456 Pine Avenue, Town',
        email: 'sarah.johnson@email.com',
        birth: '1990-08-25',
        patientImg: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Michael',
        lastName: 'Brown',
        gender: 'Male',
        mobile: '5559876545',
        password: hashedPassword,
        address: '789 Elm Road, Village',
        email: 'michael.brown@email.com',
        birth: '1978-12-03',
        patientImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Emily',
        lastName: 'Davis',
        gender: 'Female',
        mobile: '5559876546',
        password: hashedPassword,
        address: '321 Maple Lane, Borough',
        email: 'emily.davis@email.com',
        birth: '1992-06-18',
        patientImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Patients', {
      email: [
        'john.smith@email.com',
        'sarah.johnson@email.com',
        'michael.brown@email.com',
        'emily.davis@email.com'
      ]
    }, {});
  }
}; 