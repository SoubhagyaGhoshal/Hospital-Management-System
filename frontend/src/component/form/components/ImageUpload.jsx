import React from "react";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";

const ImageUpload = ({ image, setImage }) => {
  const [dragging, setDragging] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full">
      <label className="absolute left-3 px-2 text-[#96a2b4] bg-[#1a202e] transition-all top-[-10px] text-[12px]">
        Upload Image*
      </label>
      <div
        className={`border-2 border-dotted ${
          dragging ? "border-white" : "border-[#96a2b4]/50"
        } rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 bg-transparent text-white outline-none focus:border-white`}>
        <label className="cursor-pointer flex flex-col items-center">
          {image ? (
            <img
              src={image}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-full mb-3"
            />
          ) : (
            <>
              <FiUpload className="text-2xl text-[#96a2b4] mb-2" />
              <p className="text-sm">Drag & Drop an image here</p>
              <p className="text-sm text-[#96a2b4]">or click to select</p>
            </>
          )}
          <input
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
