import { useState } from "react";

const useDoctorFormState = () => {
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [doctorById, setDoctorById] = useState();

  return {
    gender,
    setGender,
    department,
    setDepartment,
    image,
    setImage,
    selectedDoctorId,
    setSelectedDoctorId,
    doctorById,
    setDoctorById,
  };
};

export default useDoctorFormState;
