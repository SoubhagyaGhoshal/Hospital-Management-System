import { apiRequest } from "../utils/ApiUtils/ApiUtils.jsx";

// ✅ Department APIs

/** Login admin */
export const loginAdmin = async (data) => {
  const response = await apiRequest("post", "/admin", data);
  // Store username for token refresh
  if (response.user && response.user.username) {
    localStorage.setItem("username", response.user.username);
  }
  return response;
};

/** Fetch admin details */
export const getAdmin = () => apiRequest("get", `/admin`);
