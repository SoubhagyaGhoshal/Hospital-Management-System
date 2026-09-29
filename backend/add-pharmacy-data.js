const db = require('./models/index');

async function addPharmacyData() {
  try {
    console.log('💊 Adding pharmacy medicines with correct structure...');
    
    const medicines = [
      {
        medicine_id: 'MED002',
        name: 'Ibuprofen',
        category: 'Capsule',
        companyname: 'Pain Relief Pharma',
        purchasedate: '2024-08-01',
        price: 8.50,
        expiredate: '2026-08-01',
        stock: 300
      },
      {
        medicine_id: 'MED003',
        name: 'Amoxicillin',
        category: 'Capsule',
        companyname: 'Antibiotic Corp',
        purchasedate: '2024-08-15',
        price: 15.75,
        expiredate: '2026-08-15',
        stock: 200
      },
      {
        medicine_id: 'MED004',
        name: 'Omeprazole',
        category: 'Tablet',
        companyname: 'Digestive Health Inc',
        purchasedate: '2024-09-01',
        price: 12.99,
        expiredate: '2026-09-01',
        stock: 250
      },
      {
        medicine_id: 'MED005',
        name: 'Cetirizine',
        category: 'Tablet',
        companyname: 'Allergy Relief Ltd',
        purchasedate: '2024-09-15',
        price: 7.25,
        expiredate: '2026-09-15',
        stock: 400
      },
      {
        medicine_id: 'MED006',
        name: 'Metformin',
        category: 'Tablet',
        companyname: 'Diabetes Care Pharma',
        purchasedate: '2024-10-01',
        price: 9.99,
        expiredate: '2026-10-01',
        stock: 350
      },
      {
        medicine_id: 'MED007',
        name: 'Lisinopril',
        category: 'Tablet',
        companyname: 'Cardiovascular Health',
        purchasedate: '2024-10-15',
        price: 11.50,
        expiredate: '2026-10-15',
        stock: 300
      },
      {
        medicine_id: 'MED008',
        name: 'Atorvastatin',
        category: 'Tablet',
        companyname: 'Cholesterol Management',
        purchasedate: '2024-11-01',
        price: 14.75,
        expiredate: '2026-11-01',
        stock: 275
      },
      {
        medicine_id: 'MED009',
        name: 'Albuterol',
        category: 'Inhaler',
        companyname: 'Respiratory Care Inc',
        purchasedate: '2024-11-15',
        price: 22.99,
        expiredate: '2026-11-15',
        stock: 150
      },
      {
        medicine_id: 'MED010',
        name: 'Warfarin',
        category: 'Tablet',
        companyname: 'Blood Thinner Pharma',
        purchasedate: '2024-12-01',
        price: 18.50,
        expiredate: '2026-12-01',
        stock: 200
      }
    ];

    for (const medicine of medicines) {
      await db.Pharmacy.create(medicine);
    }
    console.log('✅ Added 9 pharmacy medicines with correct structure');

  } catch (error) {
    console.error('❌ Error adding pharmacy data:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
addPharmacyData(); 