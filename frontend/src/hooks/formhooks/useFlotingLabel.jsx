import useFloatingLabel from "../../pages/admin/doctors/add_doctor/components/FloatingLabel"; // Adjust path as needed

const useFloatingLabels = (fields) => {
  return fields.reduce((acc, field) => {
    acc[field] = useFloatingLabel();
    return acc;
  }, {});
};

export default useFloatingLabels;
