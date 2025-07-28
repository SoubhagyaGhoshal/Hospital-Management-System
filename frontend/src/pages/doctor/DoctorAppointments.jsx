import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedDoctorData = localStorage.getItem('doctorData');
    const userRole = localStorage.getItem('userRole');
    
    if (!storedDoctorData || userRole !== 'doctor') {
      navigate('/');
      return;
    }

    try {
      const doctor = JSON.parse(storedDoctorData);
      setDoctorData(doctor);
      
      // Mock appointments data - in real app, this would come from API
      setAppointments([
        {
          id: 1,
          patientName: "John Doe",
          date: "2025-01-28",
          time: "09:00 AM",
          reason: "Regular checkup",
          status: "Confirmed"
        },
        {
          id: 2,
          patientName: "Sarah Wilson",
          date: "2025-01-28",
          time: "10:30 AM",
          reason: "Follow-up consultation",
          status: "Confirmed"
        },
        {
          id: 3,
          patientName: "Mike Johnson",
          date: "2025-01-28",
          time: "02:00 PM",
          reason: "Cardiac evaluation",
          status: "Pending"
        },
        {
          id: 4,
          patientName: "Emily Brown",
          date: "2025-01-29",
          time: "11:00 AM",
          reason: "Annual physical",
          status: "Confirmed"
        }
      ]);
    } catch (error) {
      console.error('Error parsing doctor data:', error);
      navigate('/');
    }
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-600';
      case 'Pending':
        return 'bg-yellow-600';
      case 'Cancelled':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  if (!doctorData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/doctor-dashboard")}
                className="text-blue-400 hover:text-blue-300 transition"
              >
                ← Back to Dashboard
              </button>
              <div>
                <h1 className="text-2xl font-bold">My Appointments</h1>
                <p className="text-gray-400">Dr. {doctorData.firstName} {doctorData.lastName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Total Appointments</p>
                <p className="text-2xl font-bold">{appointments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Confirmed</p>
                <p className="text-2xl font-bold">{appointments.filter(a => a.status === 'Confirmed').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold">{appointments.filter(a => a.status === 'Pending').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Today</p>
                <p className="text-2xl font-bold">{appointments.filter(a => a.date === '2025-01-28').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Scheduled Appointments</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4">Patient Name</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Time</th>
                  <th className="text-left p-4">Reason</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                    <td className="p-4 font-medium">{appointment.patientName}</td>
                    <td className="p-4">{appointment.date}</td>
                    <td className="p-4">{appointment.time}</td>
                    <td className="p-4">{appointment.reason}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition">
                          View Details
                        </button>
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs transition">
                          Start Session
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments; 