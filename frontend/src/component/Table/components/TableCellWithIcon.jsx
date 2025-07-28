import React from "react";
import TableCell from "./TableCell";

const TableCellWithIcon = ({ Icon, text, iconClass = "", textClass = "", className = "" }) => {
  return (
    <TableCell className={className}>
      <div className="flex items-center gap-1">
        <Icon className={`text-[20px] ${iconClass}`} />
        <span className={textClass}>{text}</span>
      </div>
    </TableCell>
  );
};

export default TableCellWithIcon;
