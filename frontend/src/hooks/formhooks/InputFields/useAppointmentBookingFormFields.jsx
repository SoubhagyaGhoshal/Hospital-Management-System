import useFloatingLabels from "../useFlotingLabel.jsx"; // Adjust the import path as needed

const useAppointmentBookingFormFields = () => {
  const fields = [
    "firstName",
    "lastName",
    "mobile",
    "address",
    "email",
    "dob",
    "injury",
    "note",
    "doa",
  ];

  return useFloatingLabels(fields);
};

export default useAppointmentBookingFormFields;
