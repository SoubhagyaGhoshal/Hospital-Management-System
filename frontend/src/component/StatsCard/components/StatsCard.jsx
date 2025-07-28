import React from "react";
import { FilledLineChart } from "../../Chart";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  chartData,
  bgColor,
  iconBg,
  borderColor,
  backgroundColor,
}) => {
  return (
    <div className={`w-[100%] p-4 rounded-xl ${bgColor} text-[#96a2b4]`}>
      {/* Top Section: Icon & Stats */}
      <div className="flex justify-between p-4">
        <div
          className={`px-4 py-0 flex justify-center items-center rounded-2xl text-white ${iconBg}`}>
          <Icon size={24} />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-[14px] font-bold">{title}</h1>
          <span className="text-[16px] text-right font-bold">{value}</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[70px]">
        <FilledLineChart
          chartData={chartData}
          borderColor={borderColor}
          backgroundColor={backgroundColor}
        />
      </div>
    </div>
  );
};

export default StatsCard;
