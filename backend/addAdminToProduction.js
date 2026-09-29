const axios = require('axios');

async function addAdminToProduction() {
  try {
    console.log('🔄 Attempting to create admin user in production...');
    
    // Call the production endpoint
    const response = await axios.get('https://hospital-backend-eme3.onrender.com/api/admin/create');
    
    console.log('✅ Response:', response.data);
    
    if (response.data.status === 'success') {
      console.log('🎉 Admin user created/verified successfully!');
      console.log('Username: admin');
      console.log('Password: admin123');
      console.log('\n📝 You can now log in to your Hospital Management System!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    console.log('\n🔧 Alternative solution:');
    console.log('1. Go to your Render dashboard');
    console.log('2. Check your environment variables');
    console.log('3. Make sure your database is properly configured');
  }
}

addAdminToProduction(); 