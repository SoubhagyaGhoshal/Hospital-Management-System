import React from "react";
import { FaHome } from "react-icons/fa";

function BreadcrumbNavbar({ items }) {
  return (
    <div className="bg-[#232b3e] text-[#96a2b4] px-4 sm:px-7 pt-4 flex flex-wrap items-center gap-2">
      <span className="text-[16px] sm:text-[20px] font-semibold">
        {items[0].label} &gt;
      </span>
      <span className="flex items-center gap-1 sm:gap-2">
        <FaHome className="text-[16px] sm:text-[18px]" />
        <span className="hidden sm:inline">&gt;</span>
      </span>
      <span className="hidden sm:inline">{items[0].page} &gt;</span>
      <span>{items[0].label}</span>
    </div>
  );
}

export default BreadcrumbNavbar;
