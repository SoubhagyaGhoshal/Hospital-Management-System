const db = require("../models/index");
const cloudinary = require("../cloudinary/cloudinary");
const Patient = db.Patient;

const patientServices = {
  addPatientService: async (patientData) => {
    const existingPatient = await Patient.findOne({
      where: { email: patientData.email },
    });

    if (existingPatient) {
      return { success: false, message: "Email Already Exit!" };
    }

    let imageUrl = "https://via.placeholder.com/150";
    
    if (patientData.patientImg && patientData.patientImg !== "https://via.placeholder.com/150") {
      const cloudinary_url = await cloudinary.uploader.upload(
        patientData.patientImg,
        {
          folder: "/PatientImage",
        }
      );
      imageUrl = cloudinary_url.secure_url;
    }

    patientData.patientImg = imageUrl;

    const response = Patient.create(patientData);

    return response;
  },

  getAllPatientService: async () => {
    const patientData = await Patient.findAll();

    return patientData;
  },

  getPatientByIdService: async (id) => {
    const patientData = await Patient.findOne({ where: { id: id } });

    return patientData;
  },

  deletePatientByIdService: async (id) => {
    const existingPatient = await Patient.findOne({ where: { id: id } });

    if (!existingPatient) {
      return { success: false, message: "Patient not found!" };
    }

    await Patient.destroy({ where: { id: id } });

    return { success: true, message: "Patient deleted successfully!" };
  },

  updatePatientService: async (id, patientData) => {
    const existingPatient = await Patient.findOne({ where: { id: id } });

    if (!existingPatient) {
      return { success: false, message: "Patient not found!" };
    }

    const response = await existingPatient.update(patientData);

    return response;
  },

  loginPatientService: async (email, password) => {
    const patient = await Patient.findOne({ where: { email } });
    if (!patient) return null;
    if (patient.password !== password) return null;
    
    // Generate JWT token for patient
    const { generateToken } = require("../middleware/Auth");
    const payload = {
      id: patient.id,
      email: patient.email,
      role: "patient"
    };
    
    const token = generateToken(payload);
    
    return {
      patient,
      token
    };
  },
};

module.exports = patientServices;
