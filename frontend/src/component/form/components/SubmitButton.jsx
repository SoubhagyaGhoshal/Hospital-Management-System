import React from "react";

const SubmitButton = ({
  loading,
  text = "Add Patient",
  bgColor = "#795548",
}) => {
  return (
    <button
      type="submit"
      className={`text-white px-6 py-3 rounded mt-4 transition duration-300 cursor-pointer ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
      }`}
      style={{ backgroundColor: bgColor }}
      disabled={loading}>
      {loading ? "Submitting..." : text}
    </button>
  );
};

export default SubmitButton;
