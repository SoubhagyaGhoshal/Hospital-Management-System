import React from "react";
import {
  FloatingInput,
  FloatingInputLong,
} from "../../../../../utils/Form/FormUtils.jsx";
import FloatingSelect from "../../../../../utils/Form/FloatingSelect.jsx";
import {
  ImageUpload,
  AppointmentTimePicker,
  SubmitButton,
  NameSelect,
} from "../../../../../component/form/index.js";

const AppointmentForm = ({
  floatingLabels,
  submitForm,
  Doctors,
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
  Error,
}) => {
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

  return (
    <div className="bg-[#232b3e] shadow-lg p-5">
      <form
        className="bg-[#1a202e] md:p-4 max-md:p-3 rounded-2xl"
        onSubmit={submitForm}>
        <h1 className="text-[17px] text-[#96a2b4] font-semibold">
          Book Appointment
        </h1>

        <div className="p-4 max-md:p-2 gap-7 max-md:gap-4 flex flex-col mt-4">
          {/* Name Fields */}
          <div className="flex max-md:flex-col gap-6 w-full">
            <FloatingInput
              label="First Name*"
              labelBgColor="#1a202e"
              {...firstName}
            />
            <FloatingInput
              label="Last Name*"
              labelBgColor="#1a202e"
              {...lastName}
            />
          </div>

          {/* Gender & Mobile */}
          <div className="flex gap-6 w-full max-md:flex-col">
            <FloatingSelect
              label="Gender"
              options={["Male", "Female"]}
              value={gender}
              bgColor="#1a202e"
              onChange={setGender}
            />

            <FloatingInput
              label="Mobile*"
              labelBgColor="#1a202e"
              {...mobile}
            />
          </div>

          {/* Address */}
          <FloatingInputLong
            label="Address*"
            labelBgColor="#1a202e"
            {...address}
          />

          {/* DOB & Email */}
          <div className="flex gap-6 w-full max-md:flex-col">
            <FloatingInput
              label="Email*"
              labelBgColor="#1a202e"
              type="email"
              {...email}
            />
            <FloatingInput
              label="Date of Birth*"
              labelBgColor="#1a202e"
              type="date"
              {...dob}
            />
          </div>

          {/* Doctor & Appointment Date */}
          <div className="flex gap-6 w-full max-md:flex-col">
            {/* Name Fields */}
            <NameSelect
              names={Doctors}
              label={"Doctors"}
              selectedName={doctorName}
              onChange={setDoctorName}
            />

            <FloatingInput
              label="Date of Appointment*"
              labelBgColor="#1a202e"
              type="date"
              {...doa}
            />
          </div>

          {/* Appointment Time Picker */}
          <div className="w-full">
            <AppointmentTimePicker onTimeSelect={setSelectedTime} />
          </div>

          {/* Injury Details */}
          <FloatingInputLong
            label="Injury Details*"
            labelBgColor="#1a202e"
            {...injury}
          />

          {/* Note */}
          <FloatingInputLong
            label="Note*"
            labelBgColor="#1a202e"
            {...note}
          />

          {/* Image Upload */}
          <ImageUpload
            image={image}
            setImage={setImage}
          />

          <p className="text-red-600">{Error}</p>
          {/* Submit Button */}
          <SubmitButton text="Book Appointment" />
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
