const db = require("../models/index");
const cloudinary = require("../cloudinary/cloudinary");
const { v4: uuidv4 } = require('uuid');

const patientServices = {
  addPatientService: async (patientData) => {
    const session = db.getSession();
    try {
      const checkResult = await session.run(
        'MATCH (p:Patient {email: $email}) RETURN p',
        { email: patientData.email }
      );

      if (checkResult.records.length > 0) {
        return { success: false, message: "Email Already Exit!" };
      }

      let imageUrl = "https://via.placeholder.com/150";
      if (patientData.patientImg && patientData.patientImg !== "https://via.placeholder.com/150") {
        const cloudinary_url = await cloudinary.uploader.upload(
          patientData.patientImg,
          { folder: "/PatientImage" }
        );
        imageUrl = cloudinary_url.secure_url;
      }

      patientData.patientImg = imageUrl;
      patientData.id = uuidv4(); // Graph DBs usually need explicit IDs

      const createResult = await session.run(
        'CREATE (p:Patient $props) RETURN p',
        { props: patientData }
      );

      return createResult.records[0].get('p').properties;
    } finally {
      await session.close();
    }
  },

  getAllPatientService: async () => {
    const session = db.getSession();
    try {
      const result = await session.run('MATCH (p:Patient) RETURN p');
      return result.records.map(record => record.get('p').properties);
    } finally {
      await session.close();
    }
  },

  getPatientByIdService: async (id) => {
    const session = db.getSession();
    try {
      // In Cypher, we use the property 'id' if we added it, or elementId()
      const result = await session.run(
        'MATCH (p:Patient {id: $id}) RETURN p',
        { id }
      );
      if (result.records.length === 0) return null;
      return result.records[0].get('p').properties;
    } finally {
      await session.close();
    }
  },

  deletePatientByIdService: async (id) => {
    const session = db.getSession();
    try {
      const result = await session.run(
        'MATCH (p:Patient {id: $id}) WITH p, p AS exists DELETE p RETURN exists',
        { id }
      );
      if (result.records.length === 0) {
        return { success: false, message: "Patient not found!" };
      }
      return { success: true, message: "Patient deleted successfully!" };
    } finally {
      await session.close();
    }
  },

  updatePatientService: async (id, patientData) => {
    const session = db.getSession();
    try {
      const result = await session.run(
        'MATCH (p:Patient {id: $id}) SET p += $props RETURN p',
        { id, props: patientData }
      );
      if (result.records.length === 0) {
        return { success: false, message: "Patient not found!" };
      }
      return result.records[0].get('p').properties;
    } finally {
      await session.close();
    }
  },

  loginPatientService: async (email, password) => {
    const session = db.getSession();
    try {
      const result = await session.run(
        'MATCH (p:Patient {email: $email}) RETURN p',
        { email }
      );
      
      if (result.records.length === 0) return null;
      const patient = result.records[0].get('p').properties;
      
      if (patient.password !== password) return null;
      
      const { generateToken } = require("../middleware/Auth");
      const payload = {
        id: patient.id,
        email: patient.email,
        role: "patient"
      };
      
      const token = generateToken(payload);
      return { patient, token };
    } finally {
      await session.close();
    }
  },
};

module.exports = patientServices;
