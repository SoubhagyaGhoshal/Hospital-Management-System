import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    const patientDataStr = localStorage.getItem("patientData");

    if (!token || userRole !== "patient") {
      navigate("/");
      return;
    }

    // For now, we'll show a mock appointment since we need to implement the API
    // In a real implementation, you would fetch appointments from the backend
    const mockAppointments = [
      {
        id: 1,
        doctorName: "Dr. Sarah Wilson",
        date: "2024-01-15",
        time: "10:00 AM",
        status: "Scheduled",
        injury: "Regular checkup"
      },
      {
        id: 2,
        doctorName: "Dr. Michael Brown",
        date: "2024-01-20",
        time: "2:30 PM",
        status: "Completed",
        injury: "Blood pressure monitoring"
      }
    ];

    setAppointments(mockAppointments);
    setLoading(false);
  }, [navigate]);

  const handleBack = () => {
    navigate("/patient-dashboard");
  };

  if (loading) {
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
            My Appointments
          </h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-[#232b3e] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#96a2b4] mb-4">
            Appointment History
          </h2>
          
          {appointments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No appointments found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-[#1a202e] rounded-lg p-4 border border-[#96a2b4]/20"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        {appointment.doctorName}
                      </h3>
                      <p className="text-gray-400 mt-1">
                        {appointment.date} at {appointment.time}
                      </p>
                      <p className="text-gray-400 mt-1">
                        Reason: {appointment.injury}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          appointment.status === "Scheduled"
                            ? "bg-yellow-600 text-yellow-100"
                            : appointment.status === "Completed"
                            ? "bg-green-600 text-green-100"
                            : "bg-red-600 text-red-100"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAppointments; 