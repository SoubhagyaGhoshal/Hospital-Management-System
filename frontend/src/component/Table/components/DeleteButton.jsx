import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const DeleteButton = ({ onClick }) => {
  return (
    <RiDeleteBinLine
      className="text-[#F05206] cursor-pointer hover:text-red-500"
      size={21}
      onClick={onClick}
    />
  );
};

export default DeleteButton;
