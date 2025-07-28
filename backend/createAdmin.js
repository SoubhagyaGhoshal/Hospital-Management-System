const db = require("./models/index");
const User = db.User;

async function createAdminUser() {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ where: { username: 'admin' } });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      return;
    }

    // Create admin user
    await User.create({
      username: 'admin',
      password: 'admin123'
    });

    console.log('Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    process.exit(0);
  }
}

createAdminUser(); 