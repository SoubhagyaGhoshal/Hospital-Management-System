import React from "react";
import { FaRegEdit } from "react-icons/fa";

const EditButton = ({ onClick, size = 21, className = "" }) => {
  return (
    <FaRegEdit
      className={`text-[#5663BC] cursor-pointer hover:text-blue-500 ${className}`}
      size={size}
      onClick={onClick}
    />
  );
};

export default EditButton;
