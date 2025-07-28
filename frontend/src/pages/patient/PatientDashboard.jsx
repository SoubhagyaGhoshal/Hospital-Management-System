import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const [patientData, setPatientData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    const patientDataStr = localStorage.getItem("patientData");

    if (!token || userRole !== "patient") {
      navigate("/");
      return;
    }

    if (patientDataStr) {
      setPatientData(JSON.parse(patientDataStr));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("patientData");
    navigate("/");
  };

  if (!patientData) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1a202e] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a202e] text-white">
      {/* Header */}
      <div className="bg-[#232b3e] shadow-lg p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#96a2b4]">
            Patient Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Patient Info */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-[#232b3e] rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#96a2b4] mb-4">
            Patient Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Name</p>
              <p className="text-white font-medium">
                {patientData.firstName} {patientData.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Email</p>
              <p className="text-white font-medium">{patientData.email}</p>
            </div>
            <div>
              <p className="text-gray-400">Mobile</p>
              <p className="text-white font-medium">{patientData.mobile}</p>
            </div>
            <div>
              <p className="text-gray-400">Age</p>
              <p className="text-white font-medium">{patientData.age}</p>
            </div>
            <div>
              <p className="text-gray-400">Gender</p>
              <p className="text-white font-medium">{patientData.gender}</p>
            </div>
            <div>
              <p className="text-gray-400">Blood Group</p>
              <p className="text-white font-medium">{patientData.bloodGroup}</p>
            </div>
            <div>
              <p className="text-gray-400">Blood Pressure</p>
              <p className="text-white font-medium">{patientData.bloodPressure}</p>
            </div>
            <div>
              <p className="text-gray-400">Sugar Level</p>
              <p className="text-white font-medium">{patientData.sugar}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-400">Address</p>
              <p className="text-white font-medium">{patientData.address}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-400">Injury Details</p>
              <p className="text-white font-medium">{patientData.injury}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#232b3e] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#96a2b4] mb-4">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button 
              onClick={() => navigate("/patient-appointments")}
              className="p-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              <h3 className="font-semibold">View Appointments</h3>
              <p className="text-sm text-gray-300">Check your scheduled appointments</p>
            </button>
            <button 
              onClick={() => navigate("/patient-book-appointment")}
              className="p-4 bg-green-600 rounded-lg hover:bg-green-700 transition cursor-pointer"
            >
              <h3 className="font-semibold">Book Appointment</h3>
              <p className="text-sm text-gray-300">Schedule a new appointment</p>
            </button>
            <button 
              onClick={() => navigate("/patient-medical-records")}
              className="p-4 bg-purple-600 rounded-lg hover:bg-purple-700 transition cursor-pointer"
            >
              <h3 className="font-semibold">Medical Records</h3>
              <p className="text-sm text-gray-300">View your medical history</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard; 