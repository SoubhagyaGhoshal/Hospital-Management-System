const db = require('./models/index');

async function addSampleAppointments() {
  try {
    console.log('🚀 Starting to add sample appointments...');

    // Get existing doctors and patients
    const doctors = await db.Doctor.findAll();
    const patients = await db.Patient.findAll();

    if (doctors.length === 0 || patients.length === 0) {
      console.log('❌ No doctors or patients found. Please run add-sample-data.js first.');
      return;
    }

    console.log(`📋 Found ${doctors.length} doctors and ${patients.length} patients`);

    // Sample appointments data
    const sampleAppointments = [
      {
        doctor_id: doctors[0].id,
        patient_id: patients[0].id,
        firstName: patients[0].firstName,
        lastName: patients[0].lastName,
        gender: patients[0].gender,
        mobile: patients[0].mobile,
        address: patients[0].address,
        email: patients[0].email,
        birth: patients[0].birth,
        doctorName: `${doctors[0].firstName} ${doctors[0].lastName}`,
        injury: 'Regular checkup',
        note: 'Annual physical examination',
        patientImg: patients[0].patientImg,
        date_of_appointment: '2025-01-15',
        time_of_appointment: '10:00 - 10:30'
      },
      {
        doctor_id: doctors[1].id,
        patient_id: patients[1].id,
        firstName: patients[1].firstName,
        lastName: patients[1].lastName,
        gender: patients[1].gender,
        mobile: patients[1].mobile,
        address: patients[1].address,
        email: patients[1].email,
        birth: patients[1].birth,
        doctorName: `${doctors[1].firstName} ${doctors[1].lastName}`,
        injury: 'Skin consultation',
        note: 'Dermatological examination',
        patientImg: patients[1].patientImg,
        date_of_appointment: '2025-01-16',
        time_of_appointment: '14:00 - 14:30'
      },
      {
        doctor_id: doctors[2].id,
        patient_id: patients[2].id,
        firstName: patients[2].firstName,
        lastName: patients[2].lastName,
        gender: patients[2].gender,
        mobile: patients[2].mobile,
        address: patients[2].address,
        email: patients[2].email,
        birth: patients[2].birth,
        doctorName: `${doctors[2].firstName} ${doctors[2].lastName}`,
        injury: 'Mental health consultation',
        note: 'Initial psychiatric evaluation',
        patientImg: patients[2].patientImg,
        date_of_appointment: '2025-01-17',
        time_of_appointment: '11:00 - 11:30'
      },
      {
        doctor_id: doctors[3].id,
        patient_id: patients[3].id,
        firstName: patients[3].firstName,
        lastName: patients[3].lastName,
        gender: patients[3].gender,
        mobile: patients[3].mobile,
        address: patients[3].address,
        email: patients[3].email,
        birth: patients[3].birth,
        doctorName: `${doctors[3].firstName} ${doctors[3].lastName}`,
        injury: 'Oncology consultation',
        note: 'Follow-up appointment',
        patientImg: patients[3].patientImg,
        date_of_appointment: '2025-01-18',
        time_of_appointment: '15:00 - 15:30'
      },
      {
        doctor_id: doctors[0].id,
        patient_id: patients[1].id,
        firstName: patients[1].firstName,
        lastName: patients[1].lastName,
        gender: patients[1].gender,
        mobile: patients[1].mobile,
        address: patients[1].address,
        email: patients[1].email,
        birth: patients[1].birth,
        doctorName: `${doctors[0].firstName} ${doctors[0].lastName}`,
        injury: 'Cardiac evaluation',
        note: 'Heart health assessment',
        patientImg: patients[1].patientImg,
        date_of_appointment: '2025-01-19',
        time_of_appointment: '09:00 - 09:30'
      }
    ];

    console.log('📅 Adding sample appointments...');
    
    for (const appointment of sampleAppointments) {
      await db.Appointment.create(appointment);
    }
    
    console.log(`✅ Added ${sampleAppointments.length} sample appointments`);
    console.log('🎉 Sample appointments added successfully!');

  } catch (error) {
    console.error('❌ Error adding sample appointments:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
addSampleAppointments(); 