import React, { useState, useEffect } from "react";
import useFetchData from "../../../../../hooks/useFetchData";
import useDeleteItem from "../../../../../hooks/useDeleteItem";
import {
  AllAppoinment,
  deleteAppoinment,
} from "../../../../../Api/AppointmentApi";
import AppointmentTable from "./AppointmentTable";
import {
  BreadcrumbNavbar,
  Navbar,
} from "../../../../../component/DoctorNavbar";

function ViewAppointment() {
  const { data: Appointments, loading, error } = useFetchData(AllAppoinment);
  const [search, setSearch] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    setFilteredAppointments(Appointments);
  }, [Appointments]);

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearch(query);

    if (!query) {
      setFilteredAppointments(Appointments);
      return;
    }

    const filtered = Appointments.filter((appointment) =>
      [appointment.firstName, appointment.lastName].some((field) =>
        field?.toLowerCase().includes(query)
      )
    );

    setFilteredAppointments(filtered);
  };

  const { deleteItem } = useDeleteItem(
    deleteAppoinment,
    "Appointment Deleted!"
  );

  const breadcrumbItems = [{ label: "All Appointment", page: "Appointment" }];

  return (
    <>
      <BreadcrumbNavbar items={breadcrumbItems} />

      <div className="bg-[#232b3e] text-[#96a2b4] min-h-screen p-4">
        {/* ✅ Fixed the misleading prop name */}
        <Navbar
          search={search}
          handleSearch={handleSearch}
          name="Appointment"
          Doctors={filteredAppointments} // ✅ Renamed from "Doctors"
          AddButton={false}
        />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading appointments: {error.message}</p>
        ) : (
          <AppointmentTable
            Appointment={filteredAppointments} // ✅ Renamed from "doctors"
            deleteAppointment={(id) => deleteItem(id, setFilteredAppointments)} // ✅ Renamed function
          />
        )}
      </div>
    </>
  );
}

export default ViewAppointment;
