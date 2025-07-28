'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Pharmacies', [
      {
        medicineName: 'Paracetamol',
        medicineType: 'Tablet',
        medicinePrice: 5.99,
        medicineQuantity: 500,
        medicineDescription: 'Pain reliever and fever reducer',
        medicineImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        medicineName: 'Ibuprofen',
        medicineType: 'Capsule',
        medicinePrice: 8.50,
        medicineQuantity: 300,
        medicineDescription: 'Anti-inflammatory pain medication',
        medicineImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        medicineName: 'Amoxicillin',
        medicineType: 'Capsule',
        medicinePrice: 15.75,
        medicineQuantity: 200,
        medicineDescription: 'Antibiotic for bacterial infections',
        medicineImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        medicineName: 'Omeprazole',
        medicineType: 'Tablet',
        medicinePrice: 12.99,
        medicineQuantity: 250,
        medicineDescription: 'Proton pump inhibitor for acid reflux',
        medicineImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        medicineName: 'Cetirizine',
        medicineType: 'Tablet',
        medicinePrice: 7.25,
        medicineQuantity: 400,
        medicineDescription: 'Antihistamine for allergies',
        medicineImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        medicineName: 'Metformin',
        medicineType: 'Tablet',
        medicinePrice: 9.99,
        medicineQuantity: 350,
        medicineDescription: 'Oral diabetes medication',
        medicineImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        medicineName: 'Lisinopril',
        medicineType: 'Tablet',
        medicinePrice: 11.50,
        medicineQuantity: 300,
        medicineDescription: 'ACE inhibitor for high blood pressure',
        medicineImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        medicineName: 'Atorvastatin',
        medicineType: 'Tablet',
        medicinePrice: 14.75,
        medicineQuantity: 275,
        medicineDescription: 'Statin for cholesterol management',
        medicineImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        medicineName: 'Albuterol',
        medicineType: 'Inhaler',
        medicinePrice: 22.99,
        medicineQuantity: 150,
        medicineDescription: 'Bronchodilator for asthma',
        medicineImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        medicineName: 'Warfarin',
        medicineType: 'Tablet',
        medicinePrice: 18.50,
        medicineQuantity: 200,
        medicineDescription: 'Blood thinner for clot prevention',
        medicineImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Pharmacies', {
      medicineName: [
        'Paracetamol',
        'Ibuprofen',
        'Amoxicillin',
        'Omeprazole',
        'Cetirizine',
        'Metformin',
        'Lisinopril',
        'Atorvastatin',
        'Albuterol',
        'Warfarin'
      ]
    }, {});
  }
}; 