import React, { useEffect, useState } from "react";
import { BreadcrumbNavbar } from "../../../../../component/DoctorNavbar";
import { AddAppoinment } from "../../../../../Api/AppointmentApi";
import { AllDoctorData } from "../../../../../Api/DoctorApi";
import { validateFields } from "../../../../../utils/Form/formValidation";
import useFetchData from "../../../../../hooks/useFetchData";
import useFormSubmit from "../../../../../hooks/useFormSubmit";
import useAppointmentBookingFormFields from "../../../../../hooks/formhooks/InputFields/useAppointmentBookingFormFields";
import useAppointmenttFormState from "../../../../../hooks/formhooks/FormFields/Appointment/useAppointmentFormState";
import AppointmentForm from "./AppointmentForm";
import { handleSubmission } from "../../../../../utils/Form/handleAppointmentSubmission";

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

  const { data: Doctors } = useFetchData(AllDoctorData);

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
