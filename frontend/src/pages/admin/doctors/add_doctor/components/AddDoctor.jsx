import React from "react";
import { BreadcrumbNavbar } from "../../../../../component/DoctorNavbar";
import useDoctorFormFields from "../../../../../hooks/formhooks/InputFields/useDoctorFormFields";
import useDoctorFormSubmit from "../../../../../hooks/formhooks/FormFields/Doctors/useDoctorFormSubmit";
import useDoctorFormState from "../../../../../hooks/formhooks/FormFields/Doctors/useDoctorFormState"; // Import custom hook
import DoctorForm from "./DoctorForm";

function AddDoctor() {
  const floatingLabels = useDoctorFormFields();
  const { handleSubmit, loading } = useDoctorFormSubmit();
  const { gender, setGender, department, setDepartment, image, setImage } =
    useDoctorFormState(); // Now using the custom hook

  const submitForm = (e) => {
    e.preventDefault();

    const formData = {
      firstName: floatingLabels.firstName.value,
      lastName: floatingLabels.lastName.value,
      gender,
      mobile: floatingLabels.mobile.value,
      password: floatingLabels.password.value,
      designation: floatingLabels.designation.value,
      department,
      address: floatingLabels.address.value,
      email: floatingLabels.email.value,
      birth: floatingLabels.dob.value,
      education: floatingLabels.education.value,
      doctorimg: image,
    };

    handleSubmit(formData);
  };

  const breadcrumbItems = [{ label: "Add Doctor", page: "Doctors" }];

  return (
    <>
      <BreadcrumbNavbar items={breadcrumbItems} />
      <div className="bg-[#232b3e] shadow-lg p-5">
        <DoctorForm
          floatingLabels={floatingLabels}
          submitForm={submitForm}
          loading={loading}
          gender={gender}
          setGender={setGender}
          department={department}
          setDepartment={setDepartment}
          image={image}
          setImage={setImage}
        />
      </div>
    </>
  );
}

export default AddDoctor;
