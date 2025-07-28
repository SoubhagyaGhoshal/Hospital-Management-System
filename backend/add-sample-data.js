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

    // Add pharmacy medicines
    console.log('💊 Adding pharmacy medicines...');
    const medicines = [
      {
        medicineName: 'Paracetamol',
        medicineType: 'Tablet',
        medicinePrice: 5.99,
        medicineQuantity: 500,
        medicineDescription: 'Pain reliever and fever reducer',
        medicineImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop'
      },
      {
        medicineName: 'Ibuprofen',
        medicineType: 'Capsule',
        medicinePrice: 8.50,
        medicineQuantity: 300,
        medicineDescription: 'Anti-inflammatory pain medication',
        medicineImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop'
      },
      {
        medicineName: 'Amoxicillin',
        medicineType: 'Capsule',
        medicinePrice: 15.75,
        medicineQuantity: 200,
        medicineDescription: 'Antibiotic for bacterial infections',
        medicineImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop'
      },
      {
        medicineName: 'Omeprazole',
        medicineType: 'Tablet',
        medicinePrice: 12.99,
        medicineQuantity: 250,
        medicineDescription: 'Proton pump inhibitor for acid reflux',
        medicineImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop'
      },
      {
        medicineName: 'Cetirizine',
        medicineType: 'Tablet',
        medicinePrice: 7.25,
        medicineQuantity: 400,
        medicineDescription: 'Antihistamine for allergies',
        medicineImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop'
      },
      {
        medicineName: 'Metformin',
        medicineType: 'Tablet',
        medicinePrice: 9.99,
        medicineQuantity: 350,
        medicineDescription: 'Oral diabetes medication',
        medicineImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop'
      },
      {
        medicineName: 'Lisinopril',
        medicineType: 'Tablet',
        medicinePrice: 11.50,
        medicineQuantity: 300,
        medicineDescription: 'ACE inhibitor for high blood pressure',
        medicineImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop'
      },
      {
        medicineName: 'Atorvastatin',
        medicineType: 'Tablet',
        medicinePrice: 14.75,
        medicineQuantity: 275,
        medicineDescription: 'Statin for cholesterol management',
        medicineImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&h=150&fit=crop'
      },
      {
        medicineName: 'Albuterol',
        medicineType: 'Inhaler',
        medicinePrice: 22.99,
        medicineQuantity: 150,
        medicineDescription: 'Bronchodilator for asthma',
        medicineImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop'
      },
      {
        medicineName: 'Warfarin',
        medicineType: 'Tablet',
        medicinePrice: 18.50,
        medicineQuantity: 200,
        medicineDescription: 'Blood thinner for clot prevention',
        medicineImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&h=150&fit=crop'
      }
    ];

    for (const medicine of medicines) {
      await db.Pharmacy.create(medicine);
    }
    console.log('✅ Added 10 pharmacy medicines');

    console.log('🎉 Sample data added successfully!');
    console.log('\n📊 Summary:');
    console.log('- 4 new doctors added');
    console.log('- 4 new patients added');
    console.log('- 10 pharmacy medicines added');

  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
addSampleData(); 