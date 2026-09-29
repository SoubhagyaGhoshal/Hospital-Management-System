import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookAppointment() {
  const [patientData, setPatientData] = useState(null);
  const [formData, setFormData] = useState({
    doctorName: "",
    date: "",
    time: "",
    reason: ""
  });
  const [loading, setLoading] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      alert("Appointment booked successfully! We'll contact you soon to confirm.");
      setLoading(false);
      navigate("/patient-dashboard");
    }, 2000);
  };

  const handleBack = () => {
    navigate("/patient-dashboard");
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
            Book Appointment
          </h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Booking Form */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-[#232b3e] rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#96a2b4] mb-6">
            Schedule Your Appointment
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Info */}
            <div className="bg-[#1a202e] rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">Patient Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Name</p>
                  <p className="text-white">{patientData.firstName} {patientData.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="text-white">{patientData.email}</p>
                </div>
                <div>
                  <p className="text-gray-400">Mobile</p>
                  <p className="text-white">{patientData.mobile}</p>
                </div>
                <div>
                  <p className="text-gray-400">Age</p>
                  <p className="text-white">{patientData.age}</p>
                </div>
              </div>
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-[#96a2b4] text-sm font-medium mb-2">
                Select Doctor *
              </label>
              <select
                name="doctorName"
                value={formData.doctorName}
                onChange={handleInputChange}
                required
                className="w-full border border-[#96a2b4]/50 rounded px-4 py-3 bg-transparent text-white focus:border-white outline-none"
              >
                <option value="">Choose a doctor</option>
                <option value="Dr. Sarah Wilson">Dr. Sarah Wilson - Cardiologist</option>
                <option value="Dr. Michael Brown">Dr. Michael Brown - General Physician</option>
                <option value="Dr. Emily Davis">Dr. Emily Davis - Dermatologist</option>
                <option value="Dr. James Johnson">Dr. James Johnson - Orthopedic</option>
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-[#96a2b4] text-sm font-medium mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-[#96a2b4]/50 rounded px-4 py-3 bg-transparent text-white focus:border-white outline-none"
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-[#96a2b4] text-sm font-medium mb-2">
                Preferred Time *
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="w-full border border-[#96a2b4]/50 rounded px-4 py-3 bg-transparent text-white focus:border-white outline-none"
              >
                <option value="">Choose a time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-[#96a2b4] text-sm font-medium mb-2">
                Reason for Visit *
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Please describe your symptoms or reason for the appointment..."
                className="w-full border border-[#96a2b4]/50 rounded px-4 py-3 bg-transparent text-white focus:border-white outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Booking Appointment..." : "Book Appointment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment; 