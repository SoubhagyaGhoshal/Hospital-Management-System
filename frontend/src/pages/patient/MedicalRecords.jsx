import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MedicalRecords() {
  const [patientData, setPatientData] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
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

    if (patientDataStr) {
      setPatientData(JSON.parse(patientDataStr));
    }

    // Mock medical records data
    const mockRecords = [
      {
        id: 1,
        date: "2024-01-15",
        doctorName: "Dr. Sarah Wilson",
        diagnosis: "Hypertension",
        treatment: "Prescribed blood pressure medication",
        notes: "Patient shows signs of high blood pressure. Recommended lifestyle changes and medication.",
        medications: ["Lisinopril 10mg", "Amlodipine 5mg"],
        followUp: "2024-02-15"
      },
      {
        id: 2,
        date: "2023-12-10",
        doctorName: "Dr. Michael Brown",
        diagnosis: "Type 2 Diabetes",
        treatment: "Diet and exercise plan",
        notes: "Blood sugar levels elevated. Recommended dietary changes and regular monitoring.",
        medications: ["Metformin 500mg"],
        followUp: "2024-01-10"
      },
      {
        id: 3,
        date: "2023-11-20",
        doctorName: "Dr. Emily Davis",
        diagnosis: "Seasonal Allergy",
        treatment: "Antihistamine prescription",
        notes: "Patient experiencing seasonal allergies. Prescribed medication for symptom relief.",
        medications: ["Cetirizine 10mg"],
        followUp: "As needed"
      }
    ];

    setMedicalRecords(mockRecords);
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
            Medical Records
          </h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Medical Records */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Patient Summary */}
        <div className="bg-[#232b3e] rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#96a2b4] mb-4">
            Patient Summary
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-[#1a202e] rounded-lg p-4">
              <p className="text-gray-400 text-sm">Blood Group</p>
              <p className="text-white font-semibold">{patientData.bloodGroup}</p>
            </div>
            <div className="bg-[#1a202e] rounded-lg p-4">
              <p className="text-gray-400 text-sm">Blood Pressure</p>
              <p className="text-white font-semibold">{patientData.bloodPressure}</p>
            </div>
            <div className="bg-[#1a202e] rounded-lg p-4">
              <p className="text-gray-400 text-sm">Sugar Level</p>
              <p className="text-white font-semibold">{patientData.sugar}</p>
            </div>
            <div className="bg-[#1a202e] rounded-lg p-4">
              <p className="text-gray-400 text-sm">Age</p>
              <p className="text-white font-semibold">{patientData.age} years</p>
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-[#232b3e] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#96a2b4] mb-4">
            Medical History
          </h2>
          
          {medicalRecords.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No medical records found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {medicalRecords.map((record) => (
                <div
                  key={record.id}
                  className="bg-[#1a202e] rounded-lg p-6 border border-[#96a2b4]/20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {record.diagnosis}
                      </h3>
                      <p className="text-gray-400">
                        {record.date} • {record.doctorName}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-600 text-blue-100 rounded-full text-sm">
                      {record.followUp === "As needed" ? "No Follow-up" : `Follow-up: ${record.followUp}`}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-[#96a2b4] font-medium mb-2">Treatment</h4>
                      <p className="text-white">{record.treatment}</p>
                    </div>
                    <div>
                      <h4 className="text-[#96a2b4] font-medium mb-2">Medications</h4>
                      <ul className="text-white">
                        {record.medications.map((med, index) => (
                          <li key={index} className="mb-1">• {med}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-[#96a2b4] font-medium mb-2">Notes</h4>
                    <p className="text-white">{record.notes}</p>
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

export default MedicalRecords; 