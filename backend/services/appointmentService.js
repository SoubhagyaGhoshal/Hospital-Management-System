const { where } = require("sequelize");
const db = require("../models/index");
const { validateAppointmentDate } = require("../utils/dateValidator");
const Appointment = db.Appointment;
const Doctor = db.Doctor;

const appointmentServices = {
  postAppointmentService: async (appointmentData) => {
    const exitingAppointment = await Appointment.findOne({
      where: {
        id: appointmentData.doctorName,
        date_of_appointment: appointmentData.date_of_appointment,
        time_of_appointment: appointmentData.time_of_appointment,
      },
    });

    validateAppointmentDate(appointmentData.date_of_appointment);

    if (exitingAppointment) {
      throw new Error("Appointment already Booked!");
    }

    const existingDoctor = await Doctor.findOne({
      where: { id: appointmentData.doctorName },
    });

    appointmentData.doctorName =
      existingDoctor.firstName + " " + existingDoctor.lastName;

    const response = await Appointment.create(appointmentData);

    return response;
  },

  getAllAppointmentService: async () => {
    const response = await Appointment.findAll();

    return response;
  },

  updateAppointmentService: async (id, appointmentData) => {
    const exitingAppointmentById = await Appointment.findOne({
      where: {
        id: id,
      },
    });

    const response = await exitingAppointmentById.update(appointmentData);

    return response;
  },

  deleteAppointmentService: async (id) => {
    const exitingAppointmentById = await Appointment.findOne({
      where: {
        id: id,
      },
    });

    if (!exitingAppointmentById) {
      throw new Error("Appointment Not Exit!");
    }

    await Appointment.destroy({ where: { id: id } });

    return { success: true, message: "Appointment deleted successfully" };
  },

  getAppointmentByIdService: async (id) => {
    const exitingAppointment = await Appointment.findOne({
      where: {
        id: id,
      },
    });

    if (!exitingAppointment) {
      throw new Error("Appointment Not Exit!");
    }

    return exitingAppointment;
  },
};

module.exports = appointmentServices;
