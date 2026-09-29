import { apiRequest } from "../utils/ApiUtils/ApiUtils.jsx";

// ✅ Appoinment APIs

/** Fetch all Appoinments */
export const AllAppoinment = () => apiRequest("get", "/appointment");

/** Fetch all Appoinments (public endpoint) */
export const AllAppoinmentPublic = async () => {
  const response = await apiRequest("get", "/appointments/public");
  return response.appointments || response;
};

/** Fetch Appoinment details by ID */
export const getAppoinmentById = (id) =>
  apiRequest("get", `/appointment/${id}`);

/** Add a new Appoinment */
export const AddAppoinment = (formData) =>
  apiRequest("post", "/appointment", formData);

/** Update Appoinment details by ID */
export const updateAppoinment = (id, formData) =>
  apiRequest("put", `/appointment/${id}`, formData);

/** Delete a Appoinment by ID */
export const deleteAppoinment = (id) =>
  apiRequest("delete", `/appointment/${id}`);
