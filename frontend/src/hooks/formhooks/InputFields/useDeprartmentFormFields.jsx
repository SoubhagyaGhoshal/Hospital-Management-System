import useFloatingLabels from "../useFlotingLabel.jsx"; // Adjust the import path as needed

const useDepartmentFormFields = () => {
  const fields = ["specialty", "assignedDate", "schedule", "today"];

  return useFloatingLabels(fields);
};

export default useDepartmentFormFields;
