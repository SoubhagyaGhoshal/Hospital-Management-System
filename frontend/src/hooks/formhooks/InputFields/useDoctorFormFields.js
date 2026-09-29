import useFloatingLabels from "../useFlotingLabel.jsx"; // Adjust the import path as needed

const useDoctorFormFields = () => {
  const fields = [
    "firstName",
    "lastName",
    "mobile",
    "password",
    "confirmPassword",
    "designation",
    "address",
    "email",
    "dob",
    "education",
  ];

  return useFloatingLabels(fields);
};

export default useDoctorFormFields;
