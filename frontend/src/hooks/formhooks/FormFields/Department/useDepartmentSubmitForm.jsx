import useFormSubmit from "../../../useFormSubmit";
import { AddDepartment } from "../../../../Api/DepartmentApi";

const useDepartmentFormSubmit = () => {
  const { handleSubmit, loading } = useFormSubmit(
    AddDepartment,
    "Department added successfully!"
  );

  return { handleSubmit, loading };
};

export default useDepartmentFormSubmit;
