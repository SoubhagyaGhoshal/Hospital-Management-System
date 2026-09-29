import React from "react";
import AdminDashboard from "../pages/admin/dashboard";
import { BookAppoinment, ViewAppointment } from "../pages/admin/appointment";
import {
  AddDoctor,
  AllDoctor,
  Department,
  EditDoctor,
  Shift,
} from "../pages/admin/doctors";
import { AddPatient, AllPatient, EditPatient } from "../pages/admin/patients";
import { AddMedicine, MedicineList } from "../pages/admin/pharmacy";

const pages = {
  AddDoctor: <AddDoctor />,
  AllDoctor: <AllDoctor />,
  DoctorDepartment: <Department />,
  ShiftManagement: <Shift />,
  EditDoctor: <EditDoctor />,
  AllPatients: <AllPatient />,
  AddPatients: <AddPatient />,
  EditPatients: <EditPatient />,
  BookAppoinment: <BookAppoinment />,
  ViewAppoinment: <ViewAppointment />,
  Dashboard: <AdminDashboard />,
  AddMedicine: <AddMedicine />,
  MedicineList: <MedicineList />,
};

export default pages;
