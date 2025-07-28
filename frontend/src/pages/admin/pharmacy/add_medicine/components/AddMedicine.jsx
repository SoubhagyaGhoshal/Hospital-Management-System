import React, { useState } from "react";
import { BreadcrumbNavbar } from "../../../../../component/DoctorNavbar";
import { addPharmacy } from "../../../../../Api/PharmacyApi";
import { validateFields } from "../../../../../utils/Form/formValidation";
import { handleSubmission } from "../../../../../utils/Form/handleAppointmentSubmission";
import usePharmacyFields from "../../../../../hooks/formhooks/InputFields/usePharmacyFormFields";
import PharmacytForm from "./PharmacyForm";
import useFormSubmit from "../../../../../hooks/useFormSubmit";

function AddMedicine() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const floatingLabels = usePharmacyFields();

  const {
    name,
    category,
    companyname,
    purchasedate,
    price,
    expiredate,
    stock,
  } = floatingLabels;

  const { handleSubmit } = useFormSubmit(
    addPharmacy,
    setError,
    "pharmacy Booked Successfully!"
  );

  const submitForm = (e) => {
    const formState = {
      name: name.value,
      category: category.value,
      companyname: companyname.value,
      purchasedate: purchasedate.value,
      price: price.value,
      expiredate: expiredate.value,
      stock: stock.value,
    };

    handleSubmission({
      e,
      formState,
      setLoading,
      validateFields,
      handleSubmit,
      setError,
    });
  };
  const breadcrumbItems = [{ label: "Add Pharmacy", page: "Pharmacy" }];

  return (
    <>
      {/* Breadcrumb Navigation */}
      <BreadcrumbNavbar items={breadcrumbItems} />
      <PharmacytForm
        floatingLabels={floatingLabels}
        submitForm={submitForm}
        Error={error}
      />
    </>
  );
}

export default AddMedicine;
