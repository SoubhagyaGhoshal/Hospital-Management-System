import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ labels, values, title, bgColor }) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: bgColor || "rgba(75, 192, 192, 0.5)", // Default color
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: title },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
};

export default BarChart;
