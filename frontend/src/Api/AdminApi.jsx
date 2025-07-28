import { apiRequest } from "../utils/ApiUtils/ApiUtils.jsx";

// ✅ Department APIs

/** Fetch all departments */
export const loginAdmin = (data) => apiRequest("post", "/admin", data);

/** Fetch department details by ID */
export const getAdmin = () => apiRequest("get", `/admin`);
