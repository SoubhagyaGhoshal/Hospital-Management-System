import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LiaPollHSolid } from "react-icons/lia";
import { FaUserDoctor, FaPeopleRoof } from "react-icons/fa6";
import { MdOutlineLocalPharmacy } from "react-icons/md";
import { FaUserInjured } from "react-icons/fa";

export const SideBarData = [
  {
    logo: <MdOutlineSpaceDashboard />,
    name: "Dashboard",

    category: [{ name: "Dashboard", pagename: "Dashboard" }],
  },
  {
    logo: <LiaPollHSolid />,
    name: "Appointments",
    category: [
      { name: "View Appointment", pagename: "ViewAppoinment" },
      { name: "Book Appointment", pagename: "BookAppoinment" },
    ],
  },
  {
    logo: <FaUserDoctor />,
    name: "Doctors",
    category: [
      { name: "All Doctors", pagename: "AllDoctor" },
      { name: "Add Doctors", pagename: "AddDoctor" },
      { name: "Edit Doctors", pagename: "EditDoctor" },
      { name: "Assign Department", pagename: "DoctorDepartment" },
      { name: "Shift Management", pagename: "ShiftManagement" },
    ],
  },
  {
    logo: <FaPeopleRoof />,
    name: "Staff",
    category: [
      { name: "All Staff", pagename: "" },
      { name: "Add Staff", pagename: "" },
      { name: "Edit Staff", pagename: "" },
    ],
  },
  {
    logo: <FaUserInjured />,
    name: "Patients",
    category: [
      { name: "All Patients", pagename: "AllPatients" },
      { name: "Add Patients", pagename: "AddPatients" },
      { name: "Edit Patients", pagename: "EditPatients" },
    ],
  },
  {
    logo: <MdOutlineLocalPharmacy />,
    name: "Pharmacy",
    category: [
      { name: "Medicine List", pagename: "MedicineList" },
      { name: "Add Medicine", pagename: "AddMedicine" },
    ],
  },
];
