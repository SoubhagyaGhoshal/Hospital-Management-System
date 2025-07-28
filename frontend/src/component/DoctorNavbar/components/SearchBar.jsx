import React from "react";
import { IoSearchOutline } from "react-icons/io5";

function SearchBar({ search, handleSearch }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        className="bg-[#12161f] text-[#96a2b4] px-3 py-2 rounded-md pl-8 outline-none w-full sm:w-auto text-[14px]"
      />
      <IoSearchOutline
        className="absolute left-2 top-3 text-white"
        size={16}
      />
    </div>
  );
}

export default SearchBar;
