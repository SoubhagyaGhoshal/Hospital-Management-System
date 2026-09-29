import { apiRequest } from "../utils/ApiUtils/ApiUtils.jsx";

// ✅ Doctor APIs

/** Add a new doctor */
export const addDoctorData = (data) => apiRequest("post", "/doctor", data);

/** Fetch all doctors */
export const AllDoctorData = () => apiRequest("get", "/doctor");

/** Fetch all doctors (public endpoint) */
export const AllDoctorDataPublic = async () => {
  const response = await apiRequest("get", "/doctors/public");
  return response.doctors || response;
};

/** Delete a doctor by ID */
export const dltDoctorData = (id) => apiRequest("delete", `/doctor/${id}`);

/** Update doctor details by ID */
export const updateDoctorData = (id, data) =>
  apiRequest("put", `/doctor/${id}`, data);

/** Fetch doctor details by ID */
export const getDoctorDataById = (id) => apiRequest("get", `/doctor/${id}`);

/** Doctor login */
export const doctorLogin = (data) => apiRequest("post", "/doctor/login", data);
