import { apiRequest } from "../utils/ApiUtils/ApiUtils.jsx";

// ✅ Department APIs

/** Login admin */
export const loginAdmin = async (data) => {
  try {
    const response = await apiRequest("post", "/admin", data);
    // Store username for token refresh
    if (response.user && response.user.username) {
      localStorage.setItem("username", response.user.username);
    }
    return response;
  } catch (error) {
    console.log('Login error:', error.message);
    
    // Handle demo mode login - always allow admin/admin123 in demo mode
    if (data.username === 'admin' && data.password === 'admin123') {
      console.log('Demo mode login successful');
      return {
        demo: true,
        user: { username: 'admin', id: 1 },
        token: 'demo-token',
        message: 'Demo mode: Login successful'
      };
    }
    
    // For other errors, provide helpful message
    if (error.message.includes('Demo mode') || error.message.includes('Route not found')) {
      throw new Error('Demo mode: Please use admin/admin123 to login.');
    }
    
    throw error;
  }
};

/** Fetch admin details */
export const getAdmin = () => apiRequest("get", `/admin`);
