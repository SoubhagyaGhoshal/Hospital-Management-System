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
    // Handle demo mode login
    if (error.message.includes('Demo mode') || error.message.includes('Route not found')) {
      // For demo mode, allow login with admin/admin123
      if (data.username === 'admin' && data.password === 'admin123') {
        return {
          demo: true,
          user: { username: 'admin', id: 1 },
          token: 'demo-token',
          message: 'Demo mode: Login successful'
        };
      }
    }
    throw error;
  }
};

/** Fetch admin details */
export const getAdmin = () => apiRequest("get", `/admin`);
