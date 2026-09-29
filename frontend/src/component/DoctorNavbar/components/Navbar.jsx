import React from "react";
import Actions from "./Action";
import handleDownloadExcel from "./DowloadData";
import SearchBar from "./SearchBar";

function Navbar({
  search,
  handleSearch,
  setShowModal,
  fetchDoctors,
  Doctors,
  name,
  AddButton,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-black p-4 rounded-t-2xl">
      <div className="flex gap-3 items-center">
        <span className="text-[16px] font-semibold text-[#96a2b4]">
          {name || "assign department"}
        </span>
        <SearchBar
          search={search}
          handleSearch={handleSearch}
        />
      </div>
      <Actions
        setShowModal={setShowModal}
        fetchDoctors={fetchDoctors}
        handleDownload={() => handleDownloadExcel(Doctors)}
        displayAddButton={AddButton}
      />
    </div>
  );
}

export default Navbar;
