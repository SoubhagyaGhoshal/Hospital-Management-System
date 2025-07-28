import React from "react";

const TableHeader = ({ columns }) => {
  return (
    <thead className="border-b-[0.5px] border-[#96a2b4] min-w-full bg-[#1a202e] text-[#96a2b4] text-sm">
      <tr>
        {columns.map((col, index) => (
          <th
            key={index}
            className="p-4 text-left">
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
