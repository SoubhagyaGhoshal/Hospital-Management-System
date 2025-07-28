import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:4000/api", // Replace with your actual API base URL
});

// Function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic API request function
export const apiRequest = async (method, endpoint, data = null) => {
  try {
    const response = await api({
      method,
      url: endpoint,
      data,
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Something went wrong in api!");
  }
};
