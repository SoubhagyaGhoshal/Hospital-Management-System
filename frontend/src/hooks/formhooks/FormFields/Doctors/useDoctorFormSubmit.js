import useFormSubmit from "../../../useFormSubmit";
import { addDoctorData } from "../../../../Api/DoctorApi";

const useDoctorFormSubmit = () => {
  const { handleSubmit, loading } = useFormSubmit(
    addDoctorData,
    "Doctor added successfully!"
  );

  return { handleSubmit, loading };
};

export default useDoctorFormSubmit;
