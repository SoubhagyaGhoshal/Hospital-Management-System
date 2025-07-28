import React from "react";

const TableCell = ({ children, className = "", ...props }) => {
  return (
    <td
      className={`p-2 ${className}`}
      {...props}>
      {children}
    </td>
  );
};

export default TableCell;
