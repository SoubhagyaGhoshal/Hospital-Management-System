import { apiRequest } from "../utils/ApiUtils/ApiUtils.jsx";

// ✅ Pharmacy APIs

/** Fetch all Pharmacy */
export const AllPharmacy = () => apiRequest("get", "/pharmacy");

/** Fetch all Pharmacy (public endpoint) */
export const AllPharmacyPublic = async () => {
  const response = await apiRequest("get", "/pharmacy/public");
  return response.pharmacy || response;
};

// Add a new Pharmacy
export const addPharmacy = (data) => apiRequest("post", `/pharmacy`, data);

// Delate a Pharmacy
export const deletePharmacy = (id) => apiRequest("delete", `/pharmacy/${id}`);

// Update a Pharmacy
export const updatePharmacy = (id, data) =>
  apiRequest("put", `/pharmacy/${id}`, data);

// Update a Pharmacy
export const getPharmacyById = (id) => apiRequest("get", `/pharmacy/${id}`);
