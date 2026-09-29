import React, { useState, useEffect } from "react";
import useFloatingLabel from "../../add_doctor/components/FloatingLabel";
import {
  FloatingInput,
  FloatingInputLong,
} from "../../../../../utils/Form/FormUtils";
import {
  getDoctorDataById,
  updateDoctorData,
  AllDoctorDataPublic,
} from "../../../../../Api/DoctorApi";
import { FiUpload } from "react-icons/fi";
import { BreadcrumbNavbar } from "../../../../../component/DoctorNavbar";
import useFetchData from "../../../../../hooks/useFetchData";

function EditDoctor() {
  const mobile = useFloatingLabel();
  const password = useFloatingLabel();
  const confirmPassword = useFloatingLabel();
  const designation = useFloatingLabel();
  const address = useFloatingLabel();
  const email = useFloatingLabel();
  const dob = useFloatingLabel();
  const education = useFloatingLabel();
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [doctorById, setDoctorById] = useState();

  const {
    data: Doctor,
    loading: doctorLoading,
    error,
    refetch, // ✅ Use refetch to update data after changes
  } = useFetchData(AllDoctorDataPublic);

  useEffect(() => {
    fetchDoctorById();
  }, []);

  const fetchDoctorById = async () => {
    try {
      const response = await getDoctorDataById(selectedDoctorId);

      setDoctorById(response);
    } catch (error) {
      console.error("Error fetching department:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result); // Stores image as Base64
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      gender: gender || doctorById.gender,
      mobile: mobile.value || doctorById.mobile,
      password: password.value || doctorById.password,
      designation: designation.value || doctorById.designation,
      department: department || doctorById.department,
      address: address.value || doctorById.address,
      email: email.value || doctorById.email,
      birth: dob.value || doctorById.birth,
      education: education.value || doctorById.education,
      doctorimg: image || doctorById.doctorimg,
    };

    try {
      const response = await updateDoctorData(selectedDoctorId, formData);

      if (response) {
        alert("Doctor Updated successfully!");
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [{ label: "Edit Dotor", page: "Doctors" }];

  return (
    <>
      {/* Breadcrumb Navigation Start*/}

      <BreadcrumbNavbar items={breadcrumbItems} />

      {/* Breadcrumb Navigation End*/}

      <div className="bg-[#232b3e] shadow-lg p-5 ">
        <form
          className="bg-[#1a202e] md:p-4 max-md:p-3 rounded-2xl"
          onSubmit={handleSubmit}>
          <h1 className="text-[17px] text-[#96a2b4] font-semibold">
            Edit Doctor
          </h1>

          <div className="p-4 max-md:p-2 gap-7 max-md:gap-4 flex flex-col mt-4">
            {/* Name Fields */}
            <div className="mt-5 relative w-full">
              <label className="absolute left-3 px-2 text-[#96a2b4] bg-[#1a202e]  transition-all top-[-10px] text-[12px]">
                Doctor Name*
              </label>
              <select
                className="w-full border border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-[#96a2b4] outline-none focus:border-white"
                value={selectedDoctorId} // Bind selected value
                onChange={(e) => {
                  setSelectedDoctorId(e.target.value);
                }}>
                <option
                  value=""
                  disabled
                  className="bg-[#1a202e]">
                  Select Doctor
                </option>
                {Doctor.map((doctor) => (
                  <option
                    key={doctor.id}
                    value={doctor.id}
                    className="bg-[#1a202e]">
                    {doctor.firstName + " " + doctor.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender & Mobile */}
            <div className="flex gap-6 w-full max-md:flex-col">
              <div className="mt-5 relative w-full">
                <label className="absolute left-3 px-2 text-[#96a2b4] bg-[#1a202e] transition-all top-[-10px] text-[12px]">
                  Gender*
                </label>
                <select
                  className="w-full border border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-[#96a2b4] outline-none focus:border-white"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}>
                  <option
                    value=""
                    disabled
                    className="bg-[#1a202e]">
                    Select Gender
                  </option>
                  <option
                    value="Male"
                    className="bg-[#1a202e]">
                    Male
                  </option>
                  <option
                    value="Female"
                    className="bg-[#1a202e]">
                    Female
                  </option>
                  <option
                    value="Other"
                    className="bg-[#1a202e]">
                    Other
                  </option>
                </select>
              </div>

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
              <div className="mt-5 relative w-full">
                <label className="absolute left-3 px-2 text-[#96a2b4] bg-[#1a202e] transition-all top-[-10px] text-[12px]">
                  Select Department*
                </label>
                <select
                  className="w-full border border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-[#96a2b4] outline-none focus:border-white"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}>
                  <option
                    value=""
                    disabled
                    className="bg-[#1a202e]">
                    Select Department
                  </option>

                  <option
                    value="Neurology"
                    className="bg-[#1a202e]">
                    Neurology
                  </option>
                  <option
                    value="Orthopedics"
                    className="bg-[#1a202e]">
                    Orthopedics
                  </option>
                  <option
                    value="Orthopedics"
                    className="bg-[#1a202e]">
                    Gynaecology
                  </option>
                  <option
                    value="Orthopedics"
                    className="bg-[#1a202e]">
                    Microbiology
                  </option>
                </select>
              </div>
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

            {/* Upload Image */}
            <div className="relative w-full">
              <label className="absolute left-3 px-2 text-[#96a2b4] bg-[#1a202e] transition-all top-[-10px] text-[12px]">
                Upload Image*
              </label>
              <div
                className={`border-2 border-dotted ${
                  dragging ? "border-white" : "border-[#96a2b4]/50"
                } rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 bg-transparent text-white outline-none focus:border-white`}>
                <label className="cursor-pointer flex flex-col items-center">
                  {image ? (
                    <img
                      src={image}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-full mb-3"
                    />
                  ) : (
                    <>
                      <FiUpload className="text-2xl text-[#96a2b4] mb-2" />
                      <p className="text-sm">Drag & Drop an image here</p>
                      <p className="text-sm text-[#96a2b4]">
                        or click to select
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#795548] text-white px-6 py-3 rounded hover:bg-blue-700 transition-all mt-4"
              disabled={loading}>
              {loading ? "Updating..." : "Update Doctor"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditDoctor;
