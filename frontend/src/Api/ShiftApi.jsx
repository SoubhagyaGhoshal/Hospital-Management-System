import { apiRequest } from "../utils/ApiUtils/ApiUtils.jsx";

// ✅ Shift APIs

/** Fetch all shifts */
export const AllShiftData = () => apiRequest("get", "/shift");

/** Fetch shift details by ID */
export const getShiftDataById = (id) => apiRequest("get", `/shift/${id}`);

/** Add a new shift */
export const AddShiftData = (formData) =>
  apiRequest("post", "/shift", formData);

/** Update shift details by ID */
export const updateShiftDataById = (id, formData) =>
  apiRequest("put", `/shift/${id}`, formData);

/** Delete a shift by ID */
export const deleteShiftData = (id) => apiRequest("delete", `/shift/${id}`);
