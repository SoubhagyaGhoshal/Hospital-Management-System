import React, { useState, useEffect } from "react";
import useFloatingLabel from "../../../doctors/add_doctor/components/FloatingLabel";
import {
  FloatingInput,
  FloatingInputLong,
} from "../../../../../utils/Form/FormUtils";
import {
  AllPatientData,
  getPatientDataById,
  updatePatientData,
} from "../../../../../Api/PatientApi";
import { BreadcrumbNavbar } from "../../../../../component/DoctorNavbar";
import ImageUpload from "../../../../../component/form/components/ImageUpload";
import FloatingSelect from "../../../../../utils/Form/FloatingSelect";
import SubmitButton from "../../../../../component/form/components/SubmitButton";
import NameSelect from "../../../../../component/form/components/SelectName";

function EditPatient() {
  const mobile = useFloatingLabel();
  const address = useFloatingLabel();
  const email = useFloatingLabel();
  const dob = useFloatingLabel();
  const injury = useFloatingLabel();
  const bloodPressure = useFloatingLabel();
  const sugar = useFloatingLabel();
  const password = useFloatingLabel();
  const age = useFloatingLabel();
  const [AllPatient, setAllPatient] = useState([]);
  const [AllPatientById, setAllPatientById] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await AllPatientData();
      console.log(response);
      setAllPatient(response);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchPatientsDataById = async () => {
    try {
      const response = await getPatientDataById(patientId);
      console.log(response);
      setAllPatientById(response);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    fetchPatientsDataById();

    const formData = {
      gender: gender || AllPatientById.gender,
      mobile: mobile.value || AllPatientById.mobile,
      password: password.value || AllPatientById.password,
      birth: dob.value || AllPatientById.birth,
      age: age.value || AllPatientById.age,
      email: email.value || AllPatientById.email,
      maritalStatus: maritalStatus || AllPatientById.maritalStatus,
      address: address.value || AllPatientById.address,
      bloodGroup: bloodGroup || AllPatientById.bloodGroup,
      bloodPressure: bloodPressure.value || AllPatientById.bloodPressure,
      sugar: sugar.value || AllPatientById.sugar,
      injury: injury.value || AllPatientById.injury,
      patientImg: image || AllPatientById.patientImg,
    };

    try {
      const response = await updatePatientData(patientId, formData);
      if (response) {
        alert("Patient added successfully!");
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [{ label: "Edit Patient", page: "Patient" }];

  return (
    <>
      {/* Breadcrumb Navigation */}
      <BreadcrumbNavbar items={breadcrumbItems} />

      <div className="bg-[#232b3e] shadow-lg p-5">
        <form
          className="bg-[#1a202e] md:p-4 max-md:p-3 rounded-2xl"
          onSubmit={handleSubmit}>
          <h1 className="text-[17px] text-[#96a2b4] font-semibold">
            Edit Patient
          </h1>

          <div className="p-4 max-md:p-2 gap-7 max-md:gap-4 flex flex-col mt-4">
            {/* Name Fields */}
            <div className="flex max-md:flex-col gap-6 w-full">
              {/* Name Fields */}
              <NameSelect
                names={AllPatient}
                label={"Patient"}
                selectedName={patientId}
                onChange={setPatientId}
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

            {/* Gender & Mobile */}
            <div className="flex gap-6 w-full max-md:flex-col">
              <FloatingInput
                label="Age*"
                labelBgColor="#1a202e"
                type="number"
                {...age}
              />
              <FloatingInput
                label="Password*"
                labelBgColor="#1a202e"
                {...password}
              />
            </div>

            {/* Marital Status & Blood Group */}
            <div className="flex gap-6 w-full max-md:flex-col">
              <FloatingSelect
                label="Marital Status"
                options={["Single", "Married"]}
                value={maritalStatus}
                bgColor="#1a202e"
                onChange={setMaritalStatus}
              />

              <FloatingSelect
                label="Blood Group"
                options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
                value={bloodGroup}
                bgColor="#1a202e"
                onChange={setBloodGroup}
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

            {/* Blood Pressure & Sugar */}
            <div className="flex gap-6 w-full max-md:flex-col">
              <FloatingInput
                label="Blood Pressure*"
                labelBgColor="#1a202e"
                {...bloodPressure}
              />
              <FloatingInput
                label="Sugar Level*"
                labelBgColor="#1a202e"
                {...sugar}
              />
            </div>

            {/* Injury Details */}
            <FloatingInputLong
              label="Injury Details*"
              labelBgColor="#1a202e"
              {...injury}
            />

            <ImageUpload
              image={image}
              setImage={setImage}
            />
            {/* Submit Button */}
            <SubmitButton
              loading={loading}
              text="Add Patient"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default EditPatient;
