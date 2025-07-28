import React from "react";
import { FloatingInput } from "../../../../../utils/Form/FormUtils.jsx";
import SubmitButton from "../../../../../component/form/components/SubmitButton.jsx";

const PharmacytForm = ({ floatingLabels, submitForm, Error }) => {
  const {
    name,
    category,
    companyname,
    purchasedate,
    price,
    expiredate,
    stock,
    Action,
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
              label="Name*"
              labelBgColor="#1a202e"
              {...name}
            />
          </div>

          <div className="flex max-md:flex-col gap-6 w-full">
            <FloatingInput
              label="Category*"
              labelBgColor="#1a202e"
              {...category}
            />
          </div>

          {/* Gender & Mobile */}
          <div className="flex gap-6 w-full max-md:flex-col">
            <FloatingInput
              label="Company Name*"
              labelBgColor="#1a202e"
              {...companyname}
            />
          </div>

          {/* DOB & Email */}
          <div className="flex gap-6 w-full max-md:flex-col">
            <FloatingInput
              label="Purchase Date*"
              labelBgColor="#1a202e"
              type="date"
              {...purchasedate}
            />
          </div>

          {/* Doctor & Appointment Date */}
          <div className="flex gap-6 w-full max-md:flex-col">
            <FloatingInput
              label="Price*"
              labelBgColor="#1a202e"
              type="number"
              {...price}
            />
          </div>

          <div className="flex gap-6 w-full max-md:flex-col">
            <FloatingInput
              label="Expire Date*"
              labelBgColor="#1a202e"
              type="date"
              {...expiredate}
            />
          </div>

          <div className="flex gap-6 w-full max-md:flex-col">
            <FloatingInput
              label="Stock*"
              labelBgColor="#1a202e"
              type="number"
              {...stock}
            />
          </div>

          <p className="text-red-600">{Error}</p>
          {/* Submit Button */}
          <SubmitButton text="Add Medicine" />
        </div>
      </form>
    </div>
  );
};

export default PharmacytForm;
