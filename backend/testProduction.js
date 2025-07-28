const db = require("./models/index");

const testProduction = async () => {
  try {
    console.log('Testing production database connection...');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Database config:', {
      host: db.sequelize.config.host,
      port: db.sequelize.config.port,
      database: db.sequelize.config.database,
      dialect: db.sequelize.config.dialect
    });
    
    // Test database connection
    await db.sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    // Test appointment table
    const Appointment = db.Appointment;
    const count = await Appointment.count();
    console.log(`✅ Appointment table accessible, count: ${count}`);
    
    // Test finding appointments
    const appointments = await Appointment.findAll({
      limit: 5
    });
    console.log(`✅ Found ${appointments.length} appointments`);
    
    console.log('✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Error details:', error);
  } finally {
    process.exit(0);
  }
};

testProduction(); 