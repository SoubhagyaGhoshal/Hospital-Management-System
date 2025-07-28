const db = require("./models/index");

const cleanDatabase = async () => {
  try {
    console.log('Starting database cleanup...');
    
    // Connect to database
    await db.sequelize.authenticate();
    console.log('Database connection established');
    
    // Clean up duplicate doctors
    const { Doctor } = db;
    
    // Find all doctors
    const allDoctors = await Doctor.findAll();
    console.log(`Found ${allDoctors.length} doctors`);
    
    // Group by email and mobile to find duplicates
    const emailGroups = {};
    const mobileGroups = {};
    
    allDoctors.forEach(doctor => {
      if (doctor.email) {
        if (!emailGroups[doctor.email]) {
          emailGroups[doctor.email] = [];
        }
        emailGroups[doctor.email].push(doctor);
      }
      
      if (doctor.mobile) {
        if (!mobileGroups[doctor.mobile]) {
          mobileGroups[doctor.mobile] = [];
        }
        mobileGroups[doctor.mobile].push(doctor);
      }
    });
    
    // Remove duplicates (keep the first one)
    let deletedCount = 0;
    
    for (const [email, doctors] of Object.entries(emailGroups)) {
      if (doctors.length > 1) {
        console.log(`Found ${doctors.length} doctors with email: ${email}`);
        // Keep the first one, delete the rest
        for (let i = 1; i < doctors.length; i++) {
          await doctors[i].destroy();
          deletedCount++;
        }
      }
    }
    
    for (const [mobile, doctors] of Object.entries(mobileGroups)) {
      if (doctors.length > 1) {
        console.log(`Found ${doctors.length} doctors with mobile: ${mobile}`);
        // Keep the first one, delete the rest
        for (let i = 1; i < doctors.length; i++) {
          await doctors[i].destroy();
          deletedCount++;
        }
      }
    }
    
    console.log(`Cleaned up ${deletedCount} duplicate records`);
    
    // Now sync the database to fix constraints
    await db.sequelize.sync({ alter: true });
    console.log('Database sync completed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error cleaning database:', error);
    process.exit(1);
  }
};

cleanDatabase(); 