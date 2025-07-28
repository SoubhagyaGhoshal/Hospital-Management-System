import React, { useState, useEffect } from "react";
import { AllDoctorData, dltDoctorData } from "../../../../../Api/DoctorApi";
import DoctorTable from "./DoctorTable";
import useFetchData from "../../../../../hooks/useFetchData";
import useDeleteItem from "../../../../../hooks/useDeleteItem";
import {
  BreadcrumbNavbar,
  Navbar,
} from "../../../../../component/DoctorNavbar";

function AllDoctor() {
  const { data: Doctors, loading, error } = useFetchData(AllDoctorData);
  const [search, setSearch] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    setFilteredDoctors(Doctors);
  }, [Doctors]);

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearch(query);

    if (!query) {
      setFilteredDoctors(Doctors);
      return;
    }

    const filtered = Doctors.filter((doctor) =>
      [
        doctor.firstName,
        doctor.department,
        doctor.gender,
        doctor.mobile,
        doctor.education,
        doctor.address,
      ].some((field) => field?.toLowerCase().includes(query))
    );

    setFilteredDoctors(filtered);
  };

  const { deleteItem } = useDeleteItem(dltDoctorData, "Doctor Deleted!");

  const breadcrumbItems = [{ label: "All Doctors", page: "Doctors" }];

  return (
    <>
      <BreadcrumbNavbar items={breadcrumbItems} />

      <div className="bg-[#232b3e] text-[#96a2b4] min-h-screen p-4">
        <Navbar
          search={search}
          handleSearch={handleSearch}
          name={"Doctors"}
          Doctors={filteredDoctors}
          AddButton={false}
        />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading doctors: {error.message}</p>
        ) : (
          <DoctorTable
            doctors={filteredDoctors}
            deleteDoctor={(id) => deleteItem(id, setFilteredDoctors)} // ✅ Fix applied
          />
        )}
      </div>
    </>
  );
}

export default AllDoctor;
