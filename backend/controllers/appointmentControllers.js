const appointmentServices = require("../services/appointmentService");

const appointmentController = {
  postAppointment: async (req, res) => {
    const {
      firstName,
      lastName,
      gender,
      mobile,
      address,
      email,
      birth,
      doctorName,
      injury,
      note,
      patientImg,
      date_of_appointment,
      time_of_appointment,
    } = req.body;

    const appointmentData = {
      firstName,
      lastName,
      gender,
      mobile,
      address,
      email,
      birth,
      doctorName,
      injury,
      note,
      patientImg,
      date_of_appointment,
      time_of_appointment,
    };

    try {
      const response = await appointmentServices.postAppointmentService(
        appointmentData
      );

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  },

  getAllAppointment: async (req, res) => {
    try {
      const response = await appointmentServices.getAllAppointmentService();

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  },

  updateAppointment: async (req, res) => {
    const id = req.params.id;
    const {
      firstName,
      lastName,
      gender,
      mobile,
      address,
      email,
      birth,
      doctorName,
      injury,
      note,
      date_of_appointment,
      time_of_appointment,
    } = req.body;

    const appointmentData = {
      firstName,
      lastName,
      gender,
      mobile,
      address,
      email,
      birth,
      injury,
      note,
    };

    try {
      const response = await appointmentServices.updateAppointmentService(
        id,
        appointmentData
      );

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  },

  deleteAppointment: async (req, res) => {
    const id = req.params.id;
    try {
      const response = await appointmentServices.deleteAppointmentService(id);

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  },

  getAppointmentById: async (req, res) => {
    const id = req.params.id;
    try {
      const response = await appointmentServices.getAppointmentByIdService(id);

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  },
};

module.exports = appointmentController;
