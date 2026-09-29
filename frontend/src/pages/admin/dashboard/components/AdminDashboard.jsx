import React from "react";
import { MdFace } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import useDayWiseData from "../../../../component/ChartData/components/DayWiseData";
import { AllAppoinmentPublic } from "../../../../Api/AppointmentApi";
import useFetchData from "../../../../hooks/useFetchData";
import { AllDoctorDataPublic } from "../../../../Api/DoctorApi";
import { AllPatientDataPublic } from "../../../../Api/PatientApi";
import { BarChart, PieChart } from "../../../../component/Chart";
import StatsCard from "../../../../component/StatsCard/components/StatsCard";

const AdminDashboard = () => {
  const { data: Appointments, loading, error: appointmentError } = useFetchData(AllAppoinmentPublic);
  const { data: Doctors, docloading, error: doctorError } = useFetchData(AllDoctorDataPublic);
  const { data: Patients, Patientsloading, error: patientError } = useFetchData(AllPatientDataPublic);
  const backgroundColors = ["#6f42c1", "#ff5722", "#4caf50"]; // Different colors

  // Handle errors gracefully
  if (appointmentError || doctorError || patientError) {
    console.error("Dashboard errors:", { appointmentError, doctorError, patientError });
  }

  // ✅ Fetch day-wise appointment data
  const { labels: appointmentLabels, values: appointmentValues } =
    useDayWiseData({
      Appointments: Appointments || [],
      loading,
      itemDate: "date_of_appointment",
    });

  // ✅ Fetch day-wise doctor data
  const { labels: doctorLabels, values: doctorValues } = useDayWiseData({
    Appointments: Doctors || [], // Use correct key
    loading: docloading,
    itemDate: "createdAt",
  });

  const { labels: patientLabels, values: patientValues } = useDayWiseData({
    Appointments: Patients || [], // Use correct key
    loading: Patientsloading,
    itemDate: "createdAt",
  });

  // Show loading state if any data is still loading
  if (loading || docloading || Patientsloading) {
    return (
      <div className="md:h-[100vh] bg-[#232B3E] flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="md:h-[100vh] bg-[#232B3E] overflow-hidden">
      {/* Stats Cards */}
      <div className="w-full md:grid md:grid-cols-3 flex flex-col gap-4 p-4">
        <StatsCard
          title="Appointments"
          value={Appointments?.length || 0} // ✅ Use dynamic count
          icon={MdFace}
          chartData={appointmentValues}
          bgColor="bg-[#1a202e]"
          iconBg="bg-[#6f42c1]"
        />

        <StatsCard
          title="Doctors"
          value={Doctors?.length || 0} // ✅ Use dynamic count
          icon={FaUserDoctor}
          chartData={doctorValues}
          bgColor="bg-[#1a202e]"
          iconBg="bg-[#ff5722]"
          borderColor="rgba(253, 126, 20,0.6)"
          backgroundColor="rgba(253, 126, 20,0.2)"
        />

        <StatsCard
          title="Patients"
          value={Patients?.length || 0}
          icon={FaBed}
          chartData={patientValues} // ✅ Directly using sales data
          bgColor="bg-[#1a202e]"
          iconBg="bg-[#4caf50]"
          borderColor="rgba(76, 175, 80,0.6)"
          backgroundColor="rgba(76, 175, 80,0.2)"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 max-w-full">
        {/* Bar Chart */}
        <div className="w-full h-[300px] bg-[#1a202e] p-4 rounded-lg">
          <BarChart
            labels={appointmentLabels}
            values={appointmentValues}
            title="Appointments Per Day"
            bgColor="rgba(111, 66, 193, 0.4)"
          />
        </div>

        {/* Pie Chart */}
        <div className="w-full h-[300px] bg-[#1a202e] p-4 rounded-lg">
          <PieChart
            labels={doctorLabels}
            values={doctorValues}
            backgroundColors={backgroundColors}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
