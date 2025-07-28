import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const FilledLineChart = ({
  chartData = [], // Default empty array to prevent errors
  borderColor = "rgba(111, 66, 193, 1)",
  backgroundColor = "rgba(111, 66, 193, 0.3)",
  borderWidth = 3,
  tension = 0.4,
}) => {
  // Ensure chartData is an array
  const validChartData = Array.isArray(chartData) ? chartData : [];

  const data = {
    labels: validChartData.map(() => ""), // Hide labels
    datasets: [
      {
        data: validChartData,
        borderColor,
        backgroundColor,
        borderWidth,
        pointRadius: 1, // Hide points (markers)
        tension,
        fill: "start", // Fill towards the bottom
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows full width & custom height
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false }, // Hide x-axis
      y: {
        display: false, // Hide y-axis
        suggestedMin: 10, // Adds spacing at the bottom
      },
    },
  };

  return (
    <Line
      data={data}
      options={options}
    />
  );
};

export default FilledLineChart;
