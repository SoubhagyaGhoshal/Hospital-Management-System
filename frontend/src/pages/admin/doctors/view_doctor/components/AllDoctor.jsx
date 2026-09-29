import React, { useState, useEffect } from "react";
import { AllDoctorDataPublic, dltDoctorData } from "../../../../../Api/DoctorApi";
import DoctorTable from "./DoctorTable";
import useFetchData from "../../../../../hooks/useFetchData";
import useDeleteItem from "../../../../../hooks/useDeleteItem";
import {
  BreadcrumbNavbar,
  Navbar,
} from "../../../../../component/DoctorNavbar";

function AllDoctor() {
  const { data: Doctors, loading, error } = useFetchData(AllDoctorDataPublic);
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

  // Show a user-friendly error message
  const renderError = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">
            Unable to Load Doctors
          </div>
          <div className="text-red-500 text-sm mb-4">
            The doctors data is currently unavailable. This might be due to:
          </div>
          <ul className="text-red-400 text-sm text-left mb-4">
            <li>• Database connection issues</li>
            <li>• Missing sample data</li>
            <li>• Backend service maintenance</li>
          </ul>
          <div className="text-gray-600 text-sm">
            Please try refreshing the page or contact support if the issue persists.
          </div>
        </div>
      </div>
    );
  };

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
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg">Loading doctors...</p>
            </div>
          </div>
        ) : error ? (
          renderError()
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
