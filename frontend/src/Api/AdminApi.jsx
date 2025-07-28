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
    throw error;
  }
};

/** Fetch admin details */
export const getAdmin = () => apiRequest("get", `/admin`);
