import React from "react";

const NameSelect = ({ label, names, selectedName, onChange }) => {
  return (
    <div className="mt-5 relative w-full">
      <label className="absolute left-3 px-2 text-[#96a2b4] bg-[#1a202e] transition-all top-[-10px] text-[12px]">
        {label} Name*
      </label>
      <select
        className="w-full border border-[#96a2b4]/50 rounded px-4 py-4 bg-transparent text-[#96a2b4] outline-none focus:border-white"
        value={selectedName}
        onChange={(e) => onChange(e.target.value)}>
        <option
          value=""
          disabled
          className="bg-[#1a202e]">
          Select {label}
        </option>
        {names?.map((person) => (
          <option
            key={person.id}
            value={person.id}
            className="bg-[#1a202e]">
            {person.firstName + " " + person.lastName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NameSelect;
