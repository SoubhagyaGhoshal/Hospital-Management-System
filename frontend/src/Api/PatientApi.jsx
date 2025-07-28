import { apiRequest } from "../utils/ApiUtils/ApiUtils.jsx";

// ✅ Patients APIs

// Fetch all patients
export const AllPatientData = () => apiRequest("get", `/patient`);

// Fetch patient details by ID
export const getPatientDataById = (id) => apiRequest("get", `/patient/${id}`);

// Add a new patient
export const addPatientData = (data) => apiRequest("post", `/patient`, data);

// Update patient details by ID
export const updatePatientData = (id, data) =>
  apiRequest("put", `/patient/${id}`, data);

// Delete a patient by ID
export const deletePatientData = (id) => apiRequest("delete", `/patient/${id}`);

// Patient login
export const loginPatient = (data) => apiRequest("post", `/patient/login`, data);
