import React, { useState, useEffect } from "react";
import {
  deletePatientData,
  AllPatientDataPublic,
} from "../../../../../Api/PatientApi";
import {
  BreadcrumbNavbar,
  Navbar,
} from "../../../../../component/DoctorNavbar";
import PatientTable from "./PatientTable";
import useDeleteItem from "../../../../../hooks/useDeleteItem";

function AllPatients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await AllPatientDataPublic();
      console.log(response);
      setPatients(response);
      setFilteredPatients(response);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearch(query);

    if (!query) {
      setFilteredPatients(patients); // Reset when search is empty
      return;
    }

    const filtered = patients.filter((patient) => {
      return (
        patient.firstName?.toLowerCase().includes(query) ||
        patient.gender?.toLowerCase().includes(query)
      );
    });

    setFilteredPatients(filtered);
  };

  const { deleteItem } = useDeleteItem(deletePatientData, "Patient Deleted!");

  const breadcrumbItems = [{ label: "All Patients", page: "Patients" }];

  return (
    <>
      {/* Breadcrumb Navigation */}
      <BreadcrumbNavbar items={breadcrumbItems} />

      <div className="bg-[#232b3e] text-[#96a2b4] w-[100%] min-h-screen p-4">
        {/* Header */}
        <Navbar
          search={search}
          handleSearch={handleSearch}
          fetchDoctors={fetchPatients} // Consider renaming prop in Navbar if it's only for patients
          name={"Patients"}
          Doctors={filteredPatients} // Consider renaming prop in Navbar if it's only for patients
          AddButton={false}
        />

        {/* Patients Table */}
        <PatientTable
          patients={filteredPatients}
          deletePatient={(id) => deleteItem(id, setFilteredPatients)}
        />
      </div>
    </>
  );
}

export default AllPatients;
