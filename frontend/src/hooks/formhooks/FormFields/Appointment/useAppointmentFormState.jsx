import { useState } from "react";

const useAppointmentFormState = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [gender, setGender] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  return {
    selectedTime,
    setSelectedTime,
    gender,
    setGender,
    doctorName,
    setDoctorName,
    image,
    setImage,
    loading,
    setLoading,
  };
};

export default useAppointmentFormState;
