import useFormSubmit from "../../../useFormSubmit";
import { addPharmacy } from "../../../../Api/PharmacyApi";

const usePharmacyFormSubmit = () => {
  const { handleSubmit, loading } = useFormSubmit(
    addPharmacy,
    "Pharmacy added successfully!"
  );

  return { handleSubmit, loading };
};

export default usePharmacyFormSubmit;
