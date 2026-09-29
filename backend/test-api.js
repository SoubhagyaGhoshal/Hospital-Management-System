const axios = require('axios');

const BASE_URL = 'https://hospital-backend-eme3.onrender.com';

async function testAPI() {
  try {
    console.log('Testing API endpoints...');
    
    // Test root endpoint
    const rootResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Root endpoint:', rootResponse.data);
    
    // Test simple endpoint
    const testResponse = await axios.get(`${BASE_URL}/test`);
    console.log('✅ Test endpoint:', testResponse.data);
    
    // Test admin login with sample data
    console.log('Testing admin login...');
    const loginResponse = await axios.post(`${BASE_URL}/api/admin`, {
      username: 'admin',
      password: 'admin123'
    });
    console.log('✅ Admin login:', loginResponse.data);
    
  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    }
  }
}

testAPI(); 