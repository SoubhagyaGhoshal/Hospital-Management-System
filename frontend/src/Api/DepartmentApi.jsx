import { apiRequest } from "../utils/ApiUtils/apiUtils";

// ✅ Department APIs

/** Fetch all departments */
export const AllDepartmentData = () => apiRequest("get", "/department");

/** Fetch department details by ID */
export const getDepartmentById = (id) => apiRequest("get", `/department/${id}`);

/** Add a new department */
export const AddDepartment = (formData) =>
  apiRequest("post", "/department", formData);

/** Update department details by ID */
export const updateDepartment = (id, formData) =>
  apiRequest("put", `/department/${id}`, formData);

/** Delete a department by ID */
export const dltDepartment = (id) => apiRequest("delete", `/department/${id}`);
