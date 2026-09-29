import React from "react";

const BadgeCell = ({ text, conditions, className = "" }) => {
  // Find the applied style from conditions
  const appliedStyle = conditions?.[text] || "";

  return (
    <td className="p-2">
      <p
        className={`w-min rounded flex items-center justify-center py-[3px] px-[8px] whitespace-nowrap ${appliedStyle} ${className}`}>
        {text}
      </p>
    </td>
  );
};

export default BadgeCell;
