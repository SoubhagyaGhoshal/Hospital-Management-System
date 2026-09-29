const doctorServices = require("../services/doctorServices");

const doctorController = {
  addDoctor: async (req, res) => {
    const {
      firstName,
      lastName,
      gender,
      mobile,
      password,
      designation,
      department,
      address,
      email,
      birth,
      education,
      doctorimg,
    } = req.body;

    try {
      const response = await doctorServices.addDoctorService(
        firstName,
        lastName,
        gender,
        mobile,
        password,
        designation,
        department,
        address,
        email,
        birth,
        education,
        doctorimg
      );

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "not work" });
    }
  },

  getAllDoctor: async (req, res) => {
    try {
      const response = await doctorServices.getAllDoctorService();

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(401).json("Error During Get all Doctor!");
    }
  },

  updateDoctor: async (req, res) => {
    const {
      firstName,
      lastName,
      gender,
      mobile,
      designation,
      department,
      address,
      email,
      birth,
      education,
      doctorimg,
    } = req.body;
    const doctorId = req.params.id;
    const doctorData = {
      firstName,
      lastName,
      gender,
      mobile,
      designation,
      department,
      address,
      email,
      birth,
      education,
      doctorimg,
    };
    console.log(doctorData);
    try {
      const response = await doctorServices.updateDoctorService(
        doctorId,
        doctorData
      );

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(401).json("Error During update Doctor!");
    }
  },

  getDoctorById: async (req, res) => {
    const id = req.params.id;

    try {
      const response = await doctorServices.getDoctorByIdService(id);

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(401).json("error during get doctor by id");
    }
  },

  dltDoctorById: async (req, res) => {
    const id = req.params.id;

    const response = await doctorServices.dltDoctorByIdService(id);

    res.status(201).json(response);
    try {
    } catch (error) {
      console.log(error);
      res.status(401).json("error during delete doctor by id");
    }
  },

  loginDoctor: async (req, res) => {
    const { email, password } = req.body;

    try {
      const response = await doctorServices.loginDoctorService(email, password);

      res.status(201).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(401).json(error.message);
    }
  },
};

module.exports = doctorController;
