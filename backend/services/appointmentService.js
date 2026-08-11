const db = require("../models/index");
const { validateAppointmentDate } = require("../utils/dateValidator");
const { v4: uuidv4 } = require('uuid');

const appointmentServices = {
  postAppointmentService: async (appointmentData) => {
    const session = db.getSession();
    try {
      validateAppointmentDate(appointmentData.date_of_appointment);

      const doctorId = appointmentData.doctorName; // the frontend passes the ID here

      // Check for existing appointment for the same doctor at the same time
      const checkResult = await session.run(
        `MATCH (a:Appointment {doctorId: $doctorId, date_of_appointment: $date, time_of_appointment: $time}) RETURN a`,
        { 
          doctorId,
          date: appointmentData.date_of_appointment,
          time: appointmentData.time_of_appointment 
        }
      );

      if (checkResult.records.length > 0) {
        throw new Error("Appointment already Booked!");
      }

      // Get doctor details
      const docResult = await session.run('MATCH (d:Doctor {id: $id}) RETURN d', { id: doctorId });
      if (docResult.records.length === 0) {
        throw new Error("Doctor not found!");
      }
      
      const existingDoctor = docResult.records[0].get('d').properties;
      appointmentData.doctorName = existingDoctor.firstName + " " + existingDoctor.lastName;
      
      const id = uuidv4();
      appointmentData.id = id;
      appointmentData.doctorId = doctorId;

      const createResult = await session.run(
        `
        MATCH (d:Doctor {id: $doctorId})
        CREATE (a:Appointment $props)
        CREATE (d)-[:HAS_APPOINTMENT]->(a)
        RETURN a
        `,
        { doctorId, props: appointmentData }
      );

      return createResult.records[0].get('a').properties;
    } finally {
      await session.close();
    }
  },

  getAllAppointmentService: async () => {
    const session = db.getSession();
    try {
      const result = await session.run('MATCH (a:Appointment) RETURN a');
      return result.records.map(record => record.get('a').properties);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw new Error(`Failed to fetch appointments: ${error.message}`);
    } finally {
      await session.close();
    }
  },

  updateAppointmentService: async (id, appointmentData) => {
    const session = db.getSession();
    try {
      const result = await session.run(
        'MATCH (a:Appointment {id: $id}) SET a += $props RETURN a',
        { id, props: appointmentData }
      );
      if (result.records.length === 0) {
        throw new Error("Appointment Not Exit!");
      }
      return result.records[0].get('a').properties;
    } finally {
      await session.close();
    }
  },

  deleteAppointmentService: async (id) => {
    const session = db.getSession();
    try {
      const result = await session.run(
        'MATCH (a:Appointment {id: $id}) DETACH DELETE a RETURN a',
        { id }
      );
      if (result.records.length === 0) {
        throw new Error("Appointment Not Exit!");
      }
      return { success: true, message: "Appointment deleted successfully" };
    } finally {
      await session.close();
    }
  },

  getAppointmentByIdService: async (id) => {
    const session = db.getSession();
    try {
      const result = await session.run('MATCH (a:Appointment {id: $id}) RETURN a', { id });
      if (result.records.length === 0) {
        throw new Error("Appointment Not Exit!");
      }
      return result.records[0].get('a').properties;
    } finally {
      await session.close();
    }
  },
};

module.exports = appointmentServices;
