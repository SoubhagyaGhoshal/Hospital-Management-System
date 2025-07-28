import React, { useState } from "react";
import { AddShiftData } from "../../../../../Api/ShiftApi.jsx";
import { FloatingInput } from "../../../../../utils/Form/FormUtils.jsx";
import FloatingSelect from "../../../../../utils/Form/FloatingSelect.jsx";
import useFloatingLabel from "../../add_doctor/components/FloatingLabel.jsx";
import useFetchData from "../../../../../hooks/useFetchData.jsx";
import { AllDoctorDataPublic } from "../../../../../Api/DoctorApi.jsx";
import useFormSubmit from "../../../../../hooks/useFormSubmit.jsx";

function AddShiftModal({ onClose, reload }) {
  const [department, setDepartment] = useState("");
  const [shifttype, SetShiftType] = useState("");
  const [status, setStatus] = useState("");
  const specialty = useFloatingLabel();
  const shiftStartDate = useFloatingLabel();
  const shiftEndDate = useFloatingLabel();
  const workDay = useFloatingLabel();
  const shifthours = useFloatingLabel();
  const totalhours = useFloatingLabel();
  const shiftnotes = useFloatingLabel();
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const {
    data: allDoctor,
    loading: DocotrLoading,
    error,
    refetch, // ✅ Use refetch to update data after changes
  } = useFetchData(AllDoctorDataPublic);

  const { handleSubmit } = useFormSubmit(
    AddShiftData,
    "Shift added successfully!"
  );

  const formSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      doctor_id: selectedDoctorId,
      department: department,
      specialty: specialty.value,
      shiftstart: shiftStartDate.value,
      shiftend: shiftEndDate.value,
      workday: workDay.value,
      shifthours: shifthours.value,
      shifttype: shifttype,
      status: status,
      totalhoursweeks: totalhours.value,
      shiftnotes: shiftnotes.value,
    };

    await handleSubmit(formData);
    reload();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex md:items-center justify-center p-4 overflow-x-auto h-full">
      <div className="bg-[#0c0f18] p-6 rounded-lg w-full overflow-x-auto md:max-w-[60%]">
        <h2 className="text-white text-xl font-semibold mb-2">
          Add New Shift management
        </h2>

        <form
          className="bg-[#0c0f18] flex flex-col md:gap-5  overflow-y-auto h-[65vh]"
          onSubmit={formSubmit}>
          <div className="">
            <div className="flex max-md:flex-col md:gap-6 w-full">
              <div className="mt-5 relative w-full">
                <label className="absolute left-3 px-2 text-[#96a2b4] bg-[#0c0f18] transition-all top-[-10px] text-[12px]">
                  Doctor Name*
                </label>
                <select
                  className="w-full border border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-[#96a2b4] outline-none focus:border-white"
                  value={selectedDoctorId} // Bind the selected value to state
                  onChange={(e) => setSelectedDoctorId(e.target.value)} // Update state correctly
                >
                  <option
                    value=""
                    disabled
                    className="bg-[#1a202e]">
                    Select Doctor
                  </option>
                  {allDoctor.map((doctor) => (
                    <option
                      key={doctor.id}
                      value={doctor.id}
                      className="bg-[#1a202e]">
                      {doctor.firstName + " " + doctor.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <FloatingSelect
                label="Department"
                options={[
                  "Urology",
                  "Dentist",
                  "Cardiology",
                  "Neurology",
                  "Pediatrics",
                  "Orthopedics",
                  "Dermatology",
                  "Psychiatry",
                  "Ophthalmology",
                ]}
                value={department}
                onChange={setDepartment}
                required
              />
            </div>
            <div className="flex max-md:flex-col md:gap-6 w-full">
              <FloatingInput
                label="Specialty*"
                labelBgColor="#0c0f18"
                {...specialty}
              />
              <FloatingInput
                label="Shift Start Date*"
                labelBgColor="#0c0f18"
                type="date"
                handleChange={(e) => console.log(e.target.value)}
                {...shiftStartDate}
              />
            </div>
            <div className="flex max-md:flex-col md:gap-6 w-full">
              <FloatingInput
                label="Shift End Date*"
                type="date"
                labelBgColor="#0c0f18"
                {...shiftEndDate}
              />
              <FloatingInput
                label="Work Day*"
                labelBgColor="#0c0f18"
                {...workDay}
              />
            </div>
            <div className="flex max-md:flex-col md:gap-6 w-full">
              <FloatingInput
                label="Shift Hours*"
                labelBgColor="#0c0f18"
                {...shifthours}
              />

              <FloatingSelect
                label="Shift Type"
                options={["Day Shift", "Night Shift"]}
                value={shifttype}
                onChange={SetShiftType}
                required
              />
            </div>
            <div className="flex max-md:flex-col md:gap-6 w-full">
              <FloatingSelect
                label="Availability Status"
                options={["Available", "Unavailable", "On Leave"]}
                value={status}
                onChange={setStatus}
                required
              />

              <FloatingInput
                label="Total Hours Per week*"
                labelBgColor="#0c0f18"
                {...totalhours}
              />
            </div>
            <div className="flex max-md:flex-col md:gap-6 w-full">
              <FloatingInput
                label="shift Notes*"
                labelBgColor="#0c0f18"
                {...shiftnotes}
              />
            </div>
          </div>
          <div className="max-md:mt-5">
            <button
              type="submit"
              className="px-5 py-2 text-white bg-gray-500  rounded-4xl cursor-pointer">
              Save
            </button>
            <button
              type="button"
              className="ml-2 px-4 py-2 text-white bg-red-500 rounded-4xl cursor-pointer"
              onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddShiftModal;
