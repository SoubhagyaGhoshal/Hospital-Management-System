import React from "react";
import {
  FloatingInput,
  FloatingInputLong,
} from "../../../../../utils/Form/FormUtils.jsx";
import FloatingSelect from "../../../../../utils/Form/FloatingSelect.jsx";
import {
  ImageUpload,
  SubmitButton,
} from "../../../../../component/form/index.js";
const DoctorForm = ({
  floatingLabels,
  submitForm,
  loading,
  gender,
  setGender,
  department,
  setDepartment,
  image,
  setImage,
}) => {
  const {
    firstName,
    lastName,
    mobile,
    password,
    confirmPassword,
    designation,
    address,
    email,
    dob,
    education,
  } = floatingLabels;

  console.log(gender);

  return (
    <form
      className="bg-[#1a202e] md:p-4 max-md:p-3 rounded-2xl"
      onSubmit={submitForm}>
      <h1 className="text-[17px] text-[#96a2b4] font-semibold">Add Doctor</h1>

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

        {/* Password & Confirm Password */}
        <div className="flex gap-6 w-full max-md:flex-col">
          <FloatingInput
            label="Password*"
            labelBgColor="#1a202e"
            type="password"
            {...password}
          />
          <FloatingInput
            label="Re-enter Password*"
            labelBgColor="#1a202e"
            type="password"
            {...confirmPassword}
          />
        </div>

        {/* Designation & Department */}
        <div className="flex gap-6 w-full max-md:flex-col">
          <FloatingInput
            label="Designation*"
            labelBgColor="#1a202e"
            {...designation}
          />

          <FloatingSelect
            label="Select Department"
            options={[
              "Neurology",
              "Orthopedics",
              "Gynaecology",
              "Microbiology",
            ]}
            value={department}
            bgColor="#1a202e"
            onChange={setDepartment}
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
            type="email"
            labelBgColor="#1a202e"
            {...email}
          />
          <FloatingInput
            label="Date of Birth*"
            labelBgColor="#1a202e"
            type="date"
            {...dob}
          />
        </div>

        {/* Education */}
        <FloatingInputLong
          label="Education*"
          labelBgColor="#1a202e"
          {...education}
        />

        <ImageUpload
          image={image}
          setImage={setImage}
        />

        {/* Submit Button */}
        <SubmitButton
          loading={loading}
          text="Add Doctor"
        />
      </div>
    </form>
  );
};

export default DoctorForm;
