import React, { useState } from "react";

const AppointmentTimePicker = ({ onTimeSelect }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  // Function to generate 30-minute time slots
  const generateTimeSlots = () => {
    const slots = [];
    let startHour = 10;
    let startMinute = 0;

    while (startHour < 17) {
      // Loop until 5:00 PM
      const startTime = `${String(startHour).padStart(2, "0")}:${String(
        startMinute
      ).padStart(2, "0")}`;
      startMinute += 30;
      if (startMinute === 60) {
        startHour++;
        startMinute = 0;
      }
      const endTime = `${String(startHour).padStart(2, "0")}:${String(
        startMinute
      ).padStart(2, "0")}`;
      slots.push(`${startTime} - ${endTime}`);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Handle click event
  const handleTimeSelect = (slot) => {
    setSelectedTime(slot);
    if (onTimeSelect) {
      onTimeSelect(slot); // Send selected time to parent component
    }
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-[16px] font-semibold mb-3 text-[#96a2b4]">
        Select Appointment Time
      </h2>

      {/* Full-screen horizontal scroll container */}
      <div className="w-full max-md:overflow-x-auto max-md:no-scrollbar">
        <div className="max-md:flex">
          {timeSlots.map((slot, index) => (
            <button
              type="button"
              key={index}
              className={`px-1.5 py-1 border whitespace-nowrap transition scroll-snap-align-start ${
                selectedTime === slot
                  ? "bg-[#96a2b4] text-[#1d1d1d]"
                  : "bg-[#1d1d1d] hover:bg-gray-200 text-[#96a2b4]"
              }`}
              onClick={() => handleTimeSelect(slot)}>
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentTimePicker;
