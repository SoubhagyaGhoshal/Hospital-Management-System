import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorPatients = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState(null);
  const [patients, setPatients] = useState([]);

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
      
      // Mock patients data - in real app, this would come from API
      setPatients([
        {
          id: 1,
          name: "John Doe",
          age: 45,
          gender: "Male",
          bloodGroup: "O+",
          lastVisit: "2025-01-20",
          nextAppointment: "2025-01-28",
          status: "Active"
        },
        {
          id: 2,
          name: "Sarah Wilson",
          age: 32,
          gender: "Female",
          bloodGroup: "A+",
          lastVisit: "2025-01-15",
          nextAppointment: "2025-01-28",
          status: "Active"
        },
        {
          id: 3,
          name: "Mike Johnson",
          age: 58,
          gender: "Male",
          bloodGroup: "B+",
          lastVisit: "2025-01-10",
          nextAppointment: "2025-01-28",
          status: "Active"
        },
        {
          id: 4,
          name: "Emily Brown",
          age: 29,
          gender: "Female",
          bloodGroup: "AB+",
          lastVisit: "2025-01-05",
          nextAppointment: "2025-01-29",
          status: "Active"
        },
        {
          id: 5,
          name: "David Lee",
          age: 41,
          gender: "Male",
          bloodGroup: "O-",
          lastVisit: "2024-12-28",
          nextAppointment: "2025-02-05",
          status: "Inactive"
        }
      ]);
    } catch (error) {
      console.error('Error parsing doctor data:', error);
      navigate('/');
    }
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-600';
      case 'Inactive':
        return 'bg-gray-600';
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
                <h1 className="text-2xl font-bold">Patient Records</h1>
                <p className="text-gray-400">Dr. {doctorData.firstName} {doctorData.lastName}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search patients..."
                className="px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                Add Patient
              </button>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Total Patients</p>
                <p className="text-2xl font-bold">{patients.length}</p>
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
                <p className="text-gray-400 text-sm">Active Patients</p>
                <p className="text-2xl font-bold">{patients.filter(p => p.status === 'Active').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">This Week</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Avg Age</p>
                <p className="text-2xl font-bold">41</p>
              </div>
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Patient List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4">Patient Name</th>
                  <th className="text-left p-4">Age</th>
                  <th className="text-left p-4">Gender</th>
                  <th className="text-left p-4">Blood Group</th>
                  <th className="text-left p-4">Last Visit</th>
                  <th className="text-left p-4">Next Appointment</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                    <td className="p-4 font-medium">{patient.name}</td>
                    <td className="p-4">{patient.age}</td>
                    <td className="p-4">{patient.gender}</td>
                    <td className="p-4">{patient.bloodGroup}</td>
                    <td className="p-4">{patient.lastVisit}</td>
                    <td className="p-4">{patient.nextAppointment}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition">
                          View Records
                        </button>
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs transition">
                          Schedule
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

export default DoctorPatients; 