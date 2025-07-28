import React, { useState } from "react";
import { AddAppoinment } from "../../../../../Api/AppointmentApi";
import { AllDoctorDataPublic } from "../../../../../Api/DoctorApi";
import useAppointmentBookingFormFields from "../../../../../hooks/formhooks/InputFields/useAppointmentBookingFormFields.jsx";
import useAppointmenttFormState from "../../../../../hooks/formhooks/FormFields/Appointment/useAppointmentFormState.jsx";
import useFormSubmit from "../../../../../hooks/useFormSubmit.jsx";
import useFetchData from "../../../../../hooks/useFetchData.jsx";
import AppointmentForm from "./AppointmentForm.jsx";
import { BreadcrumbNavbar } from "../../../../../component/DoctorNavbar";
import { handleSubmission } from "../../../../../utils/Form/handleAppointmentSubmission.js";
import { validateFields } from "../../../../../utils/Form/formValidation.js";

function BookAppointment() {
  const [error, setError] = useState("");
  const floatingLabels = useAppointmentBookingFormFields();

  const {
    firstName,
    lastName,
    mobile,
    address,
    email,
    dob,
    injury,
    note,
    doa,
  } = floatingLabels;

  const {
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
  } = useAppointmenttFormState();

  const { data: Doctors } = useFetchData(AllDoctorDataPublic);

  const { handleSubmit } = useFormSubmit(
    AddAppoinment,
    setError,
    "Appointment Booked Successfully!"
  );

  const submitForm = (e) => {
    const formState = {
      firstName: firstName.value,
      lastName: lastName.value,
      gender: gender,
      mobile: mobile.value,
      address: address.value,
      email: email.value,
      birth: dob.value,
      doctorName: doctorName,
      injury: injury.value,
      note: note.value,
      patientImg: image,
      date_of_appointment: doa.value,
      time_of_appointment: selectedTime,
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
  const breadcrumbItems = [{ label: "Book Appointment", page: "Appointment" }];

  return (
    <>
      {/* Breadcrumb Navigation */}
      <BreadcrumbNavbar items={breadcrumbItems} />
      <AppointmentForm
        floatingLabels={floatingLabels}
        submitForm={submitForm}
        Doctors={Doctors}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        gender={gender}
        setGender={setGender}
        doctorName={doctorName}
        setDoctorName={setDoctorName}
        image={image}
        setImage={setImage}
        loading={loading}
        setLoading={setLoading}
        Error={error}
      />
    </>
  );
}

export default BookAppointment;
