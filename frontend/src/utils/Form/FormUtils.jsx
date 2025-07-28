import React, { useState } from "react";

/* ✅ Floating Input Component (Reused for all Inputs) */
export const FloatingInput = ({
  label,
  value,
  labelBgColor,
  placeholder,
  isFocused,
  handleFocus,
  handleBlur,
  handleChange,
  type = "text",
  defaultValue,
}) => {
  return (
    <div className="mt-5 relative w-full">
      <label
        className={`absolute left-3 px-2 text-[#96a2b4] transition-all 
        ${
          isFocused || value ? "top-[-10px] text-[12px]" : "top-4 text-[16px]"
        }`}
        style={{ backgroundColor: labelBgColor }}>
        {label}
      </label>
      <input
        type={type}
        className="w-full border border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-white placeholder-gray-400 outline-none focus:border-white"
        value={value ?? ""}
        placeholder={isFocused ? placeholder : ""}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        defaultValue={value ? undefined : defaultValue} // Ensures defaultValue is used only if value is not set
      />
    </div>
  );
};

/* ✅ Floating Input Component (Reused for all Inputs) */
export const FloatingInputLong = ({
  label,

  value,
  isFocused,
  handleFocus,
  handleBlur,
  handleChange,
  type = "text",
}) => {
  return (
    <div className="mt-5 relative w-full">
      <label
        className={`absolute left-3 px-2 text-[#96a2b4] bg-[#1a202e] transition-all 
        ${
          isFocused || value ? "top-[-10px] text-[12px]" : "top-4 text-[16px]"
        }`}>
        {label}
      </label>
      <input
        type={type}
        className="w-full border border-[#96a2b4]/50 rounded px-4 py-7 bg-transparent text-white placeholder-gray-400 outline-none focus:border-white"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};
