import React, { useState, useEffect } from "react";
import {
  getShiftDataById,
  updateShiftDataById,
} from "../../../../../Api/ShiftApi.jsx";
import { FloatingInput } from "../../../../../utils/Form/FormUtils.jsx";
import FloatingSelect from "../../../../../utils/Form/FloatingSelect.jsx";
import useFloatingLabel from "../../add_doctor/components/FloatingLabel.jsx";
import { useSelector } from "react-redux";

function UpdateShiftModal({ onClose, reload }) {
  const [department, setDepartment] = useState("");
  const [shifttype, SetShiftType] = useState("");
  const [status, setStatus] = useState("");
  const [shiftFormData, setShiftFormData] = useState([]);
  const specialty = useFloatingLabel();
  const shiftStartDate = useFloatingLabel();
  const shiftEndDate = useFloatingLabel();
  const workDay = useFloatingLabel();
  const shifthours = useFloatingLabel();
  const totalhours = useFloatingLabel();
  const shiftnotes = useFloatingLabel();
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const updateId = useSelector((state) => state.sidebar.updateId);

  useEffect(() => {
    fetchShiftById();
  }, []);

  const fetchShiftById = async () => {
    try {
      const response = await getShiftDataById(updateId);
      console.log(response);
      setShiftFormData(response);
    } catch (error) {
      console.error("Error fetching department:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      department: department || shiftFormData.department,
      specialty: specialty.value || shiftFormData.specialty,
      shiftstart: shiftStartDate.value || shiftFormData.shiftstart,
      shiftend: shiftEndDate.value || shiftFormData.shiftend,
      workday: workDay.value || shiftFormData.workday,
      shifthours: shifthours.value || shiftFormData.shifthours,
      shifttype: shifttype || shiftFormData.shifttype,
      status: status || shiftFormData.status,
      totalhoursweeks: totalhours.value || shiftFormData.totalhoursweeks,
      shiftnotes: shiftnotes.value || shiftFormData.shiftnotes,
    };

    try {
      await updateShiftDataById(updateId, formData);
      reload();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex md:items-center justify-center p-4 overflow-x-auto h-full">
      <div className="bg-[#0c0f18] p-6 rounded-lg w-full overflow-x-auto md:max-w-[60%]">
        <h2 className="text-white text-xl font-semibold mb-2">
          Update Shift management
        </h2>

        <form
          className="bg-[#0c0f18] flex flex-col md:gap-5  overflow-y-auto h-[65vh]"
          onSubmit={handleSubmit}>
          <div className="">
            <div className="flex max-md:flex-col md:gap-6 w-full">
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
              />
            </div>
            <div className="flex max-md:flex-col md:gap-6 w-full">
              <FloatingSelect
                label="Availability Status"
                options={["Available", "Unavailable", "On Leave"]}
                value={status}
                onChange={setStatus}
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
              onClick={() => onClose()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateShiftModal;
