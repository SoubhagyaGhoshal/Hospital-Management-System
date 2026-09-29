import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorSchedule = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2025-01-28');

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
      
      // Mock schedule data - in real app, this would come from API
      setSchedule([
        {
          id: 1,
          day: "Monday",
          startTime: "09:00",
          endTime: "17:00",
          isAvailable: true,
          maxPatients: 8
        },
        {
          id: 2,
          day: "Tuesday",
          startTime: "09:00",
          endTime: "17:00",
          isAvailable: true,
          maxPatients: 8
        },
        {
          id: 3,
          day: "Wednesday",
          startTime: "10:00",
          endTime: "16:00",
          isAvailable: true,
          maxPatients: 6
        },
        {
          id: 4,
          day: "Thursday",
          startTime: "09:00",
          endTime: "17:00",
          isAvailable: true,
          maxPatients: 8
        },
        {
          id: 5,
          day: "Friday",
          startTime: "09:00",
          endTime: "15:00",
          isAvailable: true,
          maxPatients: 6
        },
        {
          id: 6,
          day: "Saturday",
          startTime: "10:00",
          endTime: "14:00",
          isAvailable: false,
          maxPatients: 0
        },
        {
          id: 7,
          day: "Sunday",
          startTime: "00:00",
          endTime: "00:00",
          isAvailable: false,
          maxPatients: 0
        }
      ]);
    } catch (error) {
      console.error('Error parsing doctor data:', error);
      navigate('/');
    }
  }, [navigate]);

  const toggleAvailability = (id) => {
    setSchedule(prev => prev.map(item => 
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
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
                <h1 className="text-2xl font-bold">Manage Schedule</h1>
                <p className="text-gray-400">Dr. {doctorData.firstName} {doctorData.lastName}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                Save Changes
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Working Days</p>
                <p className="text-2xl font-bold">{schedule.filter(s => s.isAvailable).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Total Hours</p>
                <p className="text-2xl font-bold">40</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Max Patients</p>
                <p className="text-2xl font-bold">36</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Available</p>
                <p className="text-2xl font-bold">Yes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Weekly Schedule</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4">Day</th>
                  <th className="text-left p-4">Start Time</th>
                  <th className="text-left p-4">End Time</th>
                  <th className="text-left p-4">Max Patients</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                    <td className="p-4 font-medium">{item.day}</td>
                    <td className="p-4">{item.startTime}</td>
                    <td className="p-4">{item.endTime}</td>
                    <td className="p-4">{item.maxPatients}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${item.isAvailable ? 'bg-green-600' : 'bg-red-600'}`}>
                        {item.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => toggleAvailability(item.id)}
                          className={`px-3 py-1 rounded text-xs transition ${
                            item.isAvailable 
                              ? 'bg-red-600 hover:bg-red-700' 
                              : 'bg-green-600 hover:bg-green-700'
                          }`}
                        >
                          {item.isAvailable ? 'Set Unavailable' : 'Set Available'}
                        </button>
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition">
                Set All Days Available
              </button>
              <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
                Set All Days Unavailable
              </button>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                Copy Previous Week
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Schedule Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Working Days:</span>
                <span className="font-medium">Monday - Friday</span>
              </div>
              <div className="flex justify-between">
                <span>Average Hours/Day:</span>
                <span className="font-medium">8 hours</span>
              </div>
              <div className="flex justify-between">
                <span>Total Patients/Week:</span>
                <span className="font-medium">36 patients</span>
              </div>
              <div className="flex justify-between">
                <span>Break Time:</span>
                <span className="font-medium">1 hour lunch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule; 