const bcrypt = require('bcryptjs');
const db = require('./models/index');

async function addSampleData() {
  try {
    console.log('🚀 Starting to add sample data...');

    // Add 4 new doctors
    console.log('👨‍⚕️ Adding 4 new doctors...');
    const hashedPassword = await bcrypt.hash('doctor123', 10);
    
    const newDoctors = [
      {
        firstName: 'Dr. Robert',
        lastName: 'Anderson',
        gender: 'Male',
        mobile: '5551234568',
        password: hashedPassword,
        designation: 'Cardiologist',
        department: 'Neurology',
        address: '456 Heart Center Dr',
        email: 'robert.anderson@hospital.com',
        birth: '1975-03-15',
        education: 'MD, Cardiology, Harvard Medical School',
        doctorimg: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. Jennifer',
        lastName: 'Martinez',
        gender: 'Female',
        mobile: '5551234569',
        password: hashedPassword,
        designation: 'Dermatologist',
        department: 'Orthopedics',
        address: '789 Skin Care Blvd',
        email: 'jennifer.martinez@hospital.com',
        birth: '1983-07-22',
        education: 'MD, Dermatology, Stanford University',
        doctorimg: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. Kevin',
        lastName: 'O\'Connor',
        gender: 'Male',
        mobile: '5551234570',
        password: hashedPassword,
        designation: 'Psychiatrist',
        department: 'Gynaecology',
        address: '321 Mental Health St',
        email: 'kevin.oconnor@hospital.com',
        birth: '1978-11-08',
        education: 'MD, Psychiatry, Yale University',
        doctorimg: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. Amanda',
        lastName: 'Taylor',
        gender: 'Female',
        mobile: '5551234571',
        password: hashedPassword,
        designation: 'Oncologist',
        department: 'Microbiology',
        address: '654 Cancer Research Rd',
        email: 'amanda.taylor@hospital.com',
        birth: '1980-09-14',
        education: 'MD, Oncology, Johns Hopkins University',
        doctorimg: 'https://images.unsplash.com/photo-1551601651-bc60f254d532?w=150&h=150&fit=crop&crop=face'
      }
    ];

    for (const doctor of newDoctors) {
      await db.Doctor.create(doctor);
    }
    console.log('✅ Added 4 new doctors');

    // Add 4 new patients
    console.log('👥 Adding 4 new patients...');
    const patientPassword = await bcrypt.hash('patient123', 10);
    
    const newPatients = [
      {
        firstName: 'John',
        lastName: 'Smith',
        gender: 'Male',
        mobile: '5559876543',
        password: patientPassword,
        address: '123 Oak Street, City',
        email: 'john.smith@email.com',
        birth: '1985-04-12',
        patientImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        gender: 'Female',
        mobile: '5559876544',
        password: patientPassword,
        address: '456 Pine Avenue, Town',
        email: 'sarah.johnson@email.com',
        birth: '1990-08-25',
        patientImg: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Michael',
        lastName: 'Brown',
        gender: 'Male',
        mobile: '5559876545',
        password: patientPassword,
        address: '789 Elm Road, Village',
        email: 'michael.brown@email.com',
        birth: '1978-12-03',
        patientImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Emily',
        lastName: 'Davis',
        gender: 'Female',
        mobile: '5559876546',
        password: patientPassword,
        address: '321 Maple Lane, Borough',
        email: 'emily.davis@email.com',
        birth: '1992-06-18',
        patientImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      }
    ];

    for (const patient of newPatients) {
      await db.Patient.create(patient);
    }
    console.log('✅ Added 4 new patients');

    // Add pharmacy medicines with correct model structure
    console.log('💊 Adding pharmacy medicines...');
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
    console.log('✅ Added 9 pharmacy medicines');

    console.log('🎉 Sample data added successfully!');
    console.log('\n📊 Summary:');
    console.log('- 4 new doctors added');
    console.log('- 4 new patients added');
    console.log('- 9 pharmacy medicines added');

  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
addSampleData(); 