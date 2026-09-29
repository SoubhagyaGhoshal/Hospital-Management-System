import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import { HiDownload } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";

function Actions({
  setShowModal,
  fetchDoctors,
  handleDownload,
  displayAddButton,
}) {
  return (
    <div className="flex items-center gap-2 mt-3 sm:mt-0">
      {/* Add Button (Only if displayAddButton is true) */}
      {displayAddButton && (
        <button
          className="p-2 rounded-md cursor-pointer"
          onClick={() => setShowModal(true)}>
          <IoMdAddCircleOutline
            size={24}
            className="text-[#96a2b4]"
          />
        </button>
      )}

      {/* Refresh Button */}
      <button
        className="p-2"
        onClick={fetchDoctors}>
        <FiRefreshCw
          size={24}
          className="text-[#96a2b4] cursor-pointer"
        />
      </button>

      {/* Download Button */}
      <button
        className="p-2"
        onClick={handleDownload}>
        <HiDownload
          size={24}
          className="text-[#96a2b4] cursor-pointer"
        />
      </button>
    </div>
  );
}

export default Actions;
