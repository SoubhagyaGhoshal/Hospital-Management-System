const validateAppointmentDate = (date) => {
  const today = new Date().setHours(0, 0, 0, 0); // Midnight today
  const appointmentDate = new Date(date).setHours(0, 0, 0, 0); // Convert to midnight

  if (appointmentDate < today) {
    throw new Error("Please Enter a Valid Date!");
  }
};

module.exports = { validateAppointmentDate };
