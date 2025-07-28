import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io"; // Assuming this is the left arrow icon
import { setPage } from "../../../Redux/slices/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";

const SidebarItem = ({ item, index, openCategories, toggleCategory }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dispatch = useDispatch();
  const Currentmenu = useSelector((state) => state.sidebar.menu);

  const PageDetails = (name) => {
    dispatch(setPage(name));
  };

  return (
    <div className="overflow-y-auto scrollbar-hide">
      {/* Main Category Item */}
      <div
        className={`flex items-center gap-3 p-2 py-3.5 mt-2.5 hover:bg-[#000000] rounded cursor-pointer ${
          index === 0 ? "bg-[#000000]" : ""
        }`}
        onClick={() => item.category && toggleCategory(index)}>
        <span className="text-[20px] text-[#b2b6bf]">{item.logo}</span>
        <span
          className={`text-[14px] text-[#cfd8e3] opacity-75 font-bold ${
            Currentmenu ? "hidden" : "block"
          }`}>
          {item.name}
        </span>
        {item.category && (
          <span
            className={`ml-auto text-[14px] text-[#CFD8E3] ${
              Currentmenu ? "hidden" : "block"
            }`}>
            {openCategories[index] ? <FaMinus /> : <FaPlus />}
          </span>
        )}
      </div>

      {/* Subcategory Dropdown */}
      {openCategories[index] && item.category && (
        <div className={`ml-0 mt-1 ${Currentmenu ? "hidden" : "block"}`}>
          {item.category.map((sub, subIndex) => (
            <div
              key={subIndex}
              className="flex items-center gap-3 p-2 py-3 hover:bg-[#000000] rounded cursor-pointer"
              onMouseEnter={() => setHoveredIndex(subIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => PageDetails(sub.pagename)}>
              {subIndex === hoveredIndex && (
                <IoIosArrowForward className="text-[#cfd8e3] " />
              )}
              <span
                className={`text-[14px] text-[#cfd8e3] opacity-75 font-bold ${
                  subIndex === hoveredIndex ? "ml-0" : "ml-8"
                }`}>
                {sub.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
