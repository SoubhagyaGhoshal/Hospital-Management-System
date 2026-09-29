const axios = require('axios');

const addDoctorsToProduction = async () => {
  try {
    console.log('Adding doctors to production server...');
    
    // First, let's try to add doctors using the existing populate endpoint
    const populateResponse = await axios.post('https://hospital-backend-eme3.onrender.com/api/doctors/populate');
    console.log('Populate response:', populateResponse.data);
    
    // Then check if doctors are available
    const doctorsResponse = await axios.get('https://hospital-backend-eme3.onrender.com/api/doctors/public');
    console.log('Doctors response:', doctorsResponse.data);
    
  } catch (error) {
    console.error('Error adding doctors to production:', error.response?.data || error.message);
    
    // If the populate endpoint fails, let's try to add doctors one by one
    console.log('Trying to add doctors individually...');
    
    const doctors = [
      {
        firstName: 'Dr. Sarah',
        lastName: 'Johnson',
        gender: 'Female',
        mobile: '5551234567',
        password: 'doctor123',
        designation: 'Neurologist',
        department: 'Neurology',
        address: '123 Brain Institute Dr',
        email: 'sarah.johnson@hospital.com',
        birth: '1980-05-15',
        education: 'MD, Neurology',
        doctorimg: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. Michael',
        lastName: 'Chen',
        gender: 'Male',
        mobile: '5552345678',
        password: 'doctor123',
        designation: 'Orthopedic Surgeon',
        department: 'Orthopedics',
        address: '456 Bone Health Way',
        email: 'michael.chen@hospital.com',
        birth: '1975-08-22',
        education: 'MD, Orthopedic Surgery',
        doctorimg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. Emily',
        lastName: 'Rodriguez',
        gender: 'Female',
        mobile: '5553456789',
        password: 'doctor123',
        designation: 'Gynecologist',
        department: 'Gynaecology',
        address: '789 Women Health Plaza',
        email: 'emily.rodriguez@hospital.com',
        birth: '1982-12-10',
        education: 'MD, Gynecology',
        doctorimg: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. David',
        lastName: 'Thompson',
        gender: 'Male',
        mobile: '5554567890',
        password: 'doctor123',
        designation: 'Microbiologist',
        department: 'Microbiology',
        address: '321 Lab Research Ave',
        email: 'david.thompson@hospital.com',
        birth: '1978-03-25',
        education: 'MD, Microbiology',
        doctorimg: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. Lisa',
        lastName: 'Wang',
        gender: 'Female',
        mobile: '5555678901',
        password: 'doctor123',
        designation: 'Neurologist',
        department: 'Neurology',
        address: '654 Brain Center Blvd',
        email: 'lisa.wang@hospital.com',
        birth: '1985-07-18',
        education: 'MD, Neurology',
        doctorimg: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. James',
        lastName: 'Wilson',
        gender: 'Male',
        mobile: '5556789012',
        password: 'doctor123',
        designation: 'Orthopedic Surgeon',
        department: 'Orthopedics',
        address: '987 Joint Care St',
        email: 'james.wilson@hospital.com',
        birth: '1973-11-30',
        education: 'MD, Orthopedic Surgery',
        doctorimg: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face'
      },
      {
        firstName: 'Dr. Maria',
        lastName: 'Garcia',
        gender: 'Female',
        mobile: '5557890123',
        password: 'doctor123',
        designation: 'Gynecologist',
        department: 'Gynaecology',
        address: '147 Women Care Rd',
        email: 'maria.garcia@hospital.com',
        birth: '1981-04-12',
        education: 'MD, Gynecology',
        doctorimg: 'https://images.unsplash.com/photo-1551601651-bc60f254d532?w=150&h=150&fit=crop&crop=face'
      }
    ];

    // Try to add each doctor individually
    for (const doctor of doctors) {
      try {
        const response = await axios.post('https://hospital-backend-eme3.onrender.com/api/doctor/register', doctor);
        console.log(`✅ Added doctor: ${doctor.firstName} ${doctor.lastName}`);
      } catch (error) {
        console.log(`❌ Failed to add doctor ${doctor.firstName} ${doctor.lastName}:`, error.response?.data || error.message);
      }
    }
  }
};

addDoctorsToProduction(); 