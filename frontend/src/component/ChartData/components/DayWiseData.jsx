import { useState, useEffect } from "react";

const useDayWiseData = ({ Appointments, loading, itemDate }) => {
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    if (!Appointments || Appointments.length === 0 || loading) return;

    const dayCounts = Appointments.reduce((acc, item) => {
      const dateValue = item[itemDate]; // Dynamic key access

      if (!dateValue) return acc; // Skip if date is missing

      const date = new Date(dateValue).toISOString().split("T")[0]; // Extract YYYY-MM-DD
      acc[date] = (acc[date] || 0) + 1; // Count occurrences
      return acc;
    }, {});

    // Convert object to arrays for Chart.js
    const labels = Object.keys(dayCounts).sort(); // Sort dates
    const values = Object.values(dayCounts);

    setChartData({ labels, values });
  }, [Appointments, loading, itemDate]); // ✅ Depend on `Appointments`, `loading`, and `itemDate`

  return chartData;
};

export default useDayWiseData;
