import { useState } from "react";

const useDepartmentFormState = () => {
  const [department, setDepartment] = useState(""); // Ensure state is initialized
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  return {
    department,
    setDepartment,
    experience,
    setExperience,
    status,
    setStatus,
    selectedDoctorId,
    setSelectedDoctorId,
  };
};

export default useDepartmentFormState;
