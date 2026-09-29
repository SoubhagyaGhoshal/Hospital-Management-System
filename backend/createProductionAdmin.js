const { Sequelize } = require('sequelize');
const User = require('./models/user');

// Production database connection
const sequelize = new Sequelize(process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/hospital', {
  dialect: 'mysql',
  logging: false
});

async function createProductionAdmin() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Connected to production database');

    // Sync models
    await sequelize.sync();
    console.log('✅ Models synchronized');

    // Check if admin exists
    const existingAdmin = await User.findOne({ where: { username: 'admin' } });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('Username: admin');
      console.log('Password: admin123');
      return;
    }

    // Create admin user
    await User.create({
      username: 'admin',
      password: 'admin123'
    });

    console.log('✅ Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n🔧 To fix this, you need to:');
    console.log('1. Set your DATABASE_URL environment variable');
    console.log('2. Or update the connection string in this script');
    console.log('3. Make sure your database is accessible');
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

createProductionAdmin(); 