'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Patients', [
      {
        firstName: 'Mary',
        lastName: 'Johnson',
        gender: 'Female',
        mobile: '3334445555',
        birth: new Date('1992-04-10'),
        age: 32,
        email: 'mary@example.com',
        maritalStatus: 'Married',
        address: '234 Main St',
        bloodGroup: 'A+',
        bloodPressure: '120/80',
        sugar: '95',
        injury: 'None',
        patientImg: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
        password: 'mary123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Tom',
        lastName: 'Williams',
        gender: 'Male',
        mobile: '4445556666',
        birth: new Date('1988-09-25'),
        age: 36,
        email: 'tom@example.com',
        maritalStatus: 'Single',
        address: '345 Main St',
        bloodGroup: 'O+',
        bloodPressure: '118/75',
        sugar: '88',
        injury: 'None',
        patientImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        password: 'tom123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Soubhagya',
        lastName: 'Ghoshal',
        gender: 'Male',
        mobile: '06295932396',
        birth: new Date('2010-07-16'),
        age: 15,
        email: 'soubhagyag73@gmail.com',
        maritalStatus: 'Single',
        address: 'Belghoriya',
        bloodGroup: 'B+',
        bloodPressure: '110/70',
        sugar: '92',
        injury: 'None',
        patientImg: 'https://via.placeholder.com/150',
        password: 'soubhagya123',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Patients', null, {});
  }
}; 