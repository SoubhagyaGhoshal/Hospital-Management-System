import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./layout/Dashbord";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import PatientDashboard from "./pages/patient/PatientDashboard";
import ViewAppointments from "./pages/patient/ViewAppointments";
import BookAppointment from "./pages/patient/BookAppointment";
import MedicalRecords from "./pages/patient/MedicalRecords";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorSchedule from "./pages/doctor/DoctorSchedule";
import pages from "./constants/AdminPages";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/signup"
        element={<SignUp />}
      />
      <Route
        path="/dashboard"
        element={<Dashboard pages={pages} />}
      />
      <Route
        path="/patient-dashboard"
        element={<PatientDashboard />}
      />
      <Route
        path="/patient-appointments"
        element={<ViewAppointments />}
      />
      <Route
        path="/patient-book-appointment"
        element={<BookAppointment />}
      />
                      <Route
                  path="/patient-medical-records"
                  element={<MedicalRecords />}
                />
                <Route
                  path="/doctor-dashboard"
                  element={<DoctorDashboard />}
                />
                <Route
                  path="/doctor-appointments"
                  element={<DoctorAppointments />}
                />
                <Route
                  path="/doctor-patients"
                  element={<DoctorPatients />}
                />
                <Route
                  path="/doctor-schedule"
                  element={<DoctorSchedule />}
                />
              </Routes>
            );
}

export default App;

