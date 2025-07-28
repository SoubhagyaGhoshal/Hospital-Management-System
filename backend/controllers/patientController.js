const patientServices = require("../services/patientServices");

const patientController = {
  addPatient: async (req, res) => {
    const {
      firstName,
      lastName,
      gender,
      mobile,
      password,
      birth,
      age,
      email,
      maritalStatus,
      address,
      bloodGroup,
      bloodPressure,
      sugar,
      injury,
      patientImg,
    } = req.body;

    const patientData = {
      firstName,
      lastName,
      gender,
      mobile,
      password,
      birth,
      age,
      email,
      maritalStatus,
      address,
      bloodGroup,
      bloodPressure,
      sugar,
      injury,
      patientImg,
    };

    try {
      const response = await patientServices.addPatientService(patientData);

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(401).json(error.message);
    }
  },

  getAllPatient: async (req, res) => {
    try {
      const response = await patientServices.getAllPatientService();

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(401).json(error.message);
    }
  },

  getPatientById: async (req, res) => {
    const id = req.params.id;

    try {
      const response = await patientServices.getPatientByIdService(id);

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(401).json(error.message);
    }
  },

  deletePatientById: async (req, res) => {
    const id = req.params.id;

    try {
      const response = await patientServices.deletePatientByIdService(id);

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(401).json(error.message);
    }
  },

  updatePatient: async (req, res) => {
    const id = req.params.id;
    const {
      firstName,
      lastName,
      gender,
      mobile,
      birth,
      age,
      email,
      maritalStatus,
      address,
      bloodGroup,
      bloodPressure,
      sugar,
      injury,
      patientImg,
    } = req.body;

    const patientData = {
      firstName,
      lastName,
      gender,
      mobile,
      birth,
      age,
      email,
      maritalStatus,
      address,
      bloodGroup,
      bloodPressure,
      sugar,
      injury,
      patientImg,
    };

    try {
      const response = await patientServices.updatePatientService(
        id,
        patientData
      );

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(401).json(error.message);
    }
  },

  loginPatient: async (req, res) => {
    const { email, password } = req.body;
    try {
      const patient = await patientServices.loginPatientService(email, password);
      if (!patient) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = patientController;
