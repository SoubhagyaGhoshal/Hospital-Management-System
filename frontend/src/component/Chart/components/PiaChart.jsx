import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ labels = [], values = [], backgroundColors = [] }) => {
  // Limit data to only 3 items
  const limitedLabels = labels.slice(0, 3);
  const limitedValues = values.slice(0, 3);
  const limitedBackgroundColors = backgroundColors.slice(0, 3);

  const data = {
    labels: limitedLabels,
    datasets: [
      {
        data: limitedValues,
        backgroundColor: limitedBackgroundColors,
        borderColor: "#232B3E",
        borderWidth: 3,
        hoverBorderWidth: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 10,
        },
      },
      title: {
        display: true,
        text: "Doctor Chart",
      },
    },
  };

  return (
    <div className="w-full h-full p-4">
      <Pie
        data={data}
        options={options}
      />
    </div>
  );
};

export default PieChart;
