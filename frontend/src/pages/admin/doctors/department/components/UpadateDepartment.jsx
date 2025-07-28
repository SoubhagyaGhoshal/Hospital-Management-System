import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  updateDepartment,
  getDepartmentById,
} from "../../../../../Api/DepartmentApi.jsx";
import useDepartmentFormState from "../../../../../hooks/formhooks/FormFields/Department/useDepartmentFormState.jsx";
import useDepartmentFormFields from "../../../../../hooks/formhooks/InputFields/useDeprartmentFormFields.jsx";
import FloatingSelect from "../../../../../utils/Form/FloatingSelect.jsx";
import { FloatingInput } from "../../../../../utils/Form/FormUtils.jsx";

function UpdateDepartmentModal({ onClose, reload }) {
  const [departmentFormData, setDepartmentFormData] = useState([]);

  const today = new Date().toISOString().split("T")[0];
  const updateId = useSelector((state) => state.sidebar.updateId);

  const floatingLabels = useDepartmentFormFields();
  const { specialty, assignedDate, schedule } = floatingLabels;
  const {
    department,
    setDepartment,
    experience,
    setExperience,
    status,
    setStatus,
  } = useDepartmentFormState();

  useEffect(() => {
    fetchDoctorsById();
  }, []);

  const fetchDoctorsById = async () => {
    try {
      const response = await getDepartmentById(updateId);
      console.log(response);
      setDepartmentFormData(response);
    } catch (error) {
      console.error("Error fetching department:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      department: department || departmentFormData.department,
      specialty: specialty.value || departmentFormData.specialty,
      assignedDate: assignedDate.value || departmentFormData.assignedDate,
      schedule: schedule.value || departmentFormData.schedule,
      experience: experience || departmentFormData.experience,
      status: status || departmentFormData.status,
    };

    try {
      await updateDepartment(updateId, formData);
      reload();
      onClose();
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex md:items-center justify-center p-4 overflow-x-auto h-full">
      <div className="bg-[#0c0f18] p-6 rounded-lg w-full overflow-x-auto md:max-w-[60%]">
        <h2 className="text-white text-xl font-semibold mb-2">
          Upadate Department
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0c0f18] flex flex-col md:gap-5">
          <div>
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
                label="Assigned Date*"
                labelBgColor="#0c0f18"
                type="date"
                defaultValue={today}
                {...assignedDate}
              />
            </div>
            <div className="flex max-md:flex-col md:gap-6 w-full">
              <FloatingInput
                label="Schedule*"
                placeholder="Mon - Fri, 10:00 AM - 3:00 PM"
                labelBgColor="#0c0f18"
                {...schedule}
              />
              <FloatingSelect
                label="Experience Level"
                options={["Junior", "Consultant", "Senior"]}
                value={experience}
                onChange={setExperience}
              />
            </div>
            <div className="flex max-md:flex-col gap-6 w-full mt-6">
              <FloatingSelect
                label="Current Assignment Status"
                options={["Active", "Pending", "Inactive"]}
                value={status}
                onChange={setStatus}
              />
            </div>
          </div>
          <div className="max-md:mt-5">
            <button
              type="b"
              className="px-5 py-2 text-white bg-gray-500 rounded-4xl cursor-pointer">
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

export default UpdateDepartmentModal;
