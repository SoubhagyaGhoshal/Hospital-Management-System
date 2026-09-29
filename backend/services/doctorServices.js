const db = require("../models/index");
const bcrypt = require("bcryptjs");
const cloudinary = require("../cloudinary/cloudinary");
const { v4: uuidv4 } = require('uuid');

const doctorServices = {
  addDoctorService: async (
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
  ) => {
    if (
      !firstName ||
      !password ||
      !gender ||
      !mobile ||
      !department ||
      !email
    ) {
      throw new Error("All required fields must be provided!");
    }

    let imageUrl = "https://via.placeholder.com/150";
    if (doctorimg && doctorimg !== "https://via.placeholder.com/150") {
      const cloudinary_url = await cloudinary.uploader.upload(doctorimg, {
        folder: "/DoctorImage",
      });
      imageUrl = cloudinary_url.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    const doctorData = {
      id,
      firstName,
      lastName,
      gender,
      mobile,
      password: hashedPassword,
      designation,
      department,
      address,
      email,
      birth,
      education,
      doctorimg: imageUrl,
    };

    const session = db.getSession();
    try {
      const result = await session.run(
        'CREATE (d:Doctor $props) RETURN d',
        { props: doctorData }
      );
      return result.records[0].get('d').properties;
    } finally {
      await session.close();
    }
  },

  getAllDoctorService: async () => {
    const session = db.getSession();
    try {
      const result = await session.run('MATCH (d:Doctor) RETURN d');
      return result.records.map(record => record.get('d').properties);
    } finally {
      await session.close();
    }
  },

  updateDoctorService: async (id, doctorData) => {
    const session = db.getSession();
    try {
      // Check if existing doctor exists
      const existingResult = await session.run('MATCH (d:Doctor {id: $id}) RETURN d', { id });
      if (existingResult.records.length === 0) {
        throw new Error("Doctor does not exist!");
      }
      
      const existingDoctor = existingResult.records[0].get('d').properties;

      if (doctorData.doctorimg && doctorData.doctorimg.startsWith("data:image")) {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          doctorData.doctorimg,
          { folder: "/DoctorImage" }
        );
        doctorData.doctorimg = cloudinaryResponse.secure_url;
      } else {
        doctorData.doctorimg = existingDoctor.doctorimg;
      }

      const result = await session.run(
        'MATCH (d:Doctor {id: $id}) SET d += $props RETURN d',
        { id, props: doctorData }
      );
      return result.records[0].get('d').properties;
    } finally {
      await session.close();
    }
  },

  getDoctorByIdService: async (id) => {
    const session = db.getSession();
    try {
      const result = await session.run('MATCH (d:Doctor {id: $id}) RETURN d', { id });
      if (result.records.length === 0) return null;
      return result.records[0].get('d').properties;
    } finally {
      await session.close();
    }
  },

  dltDoctorByIdService: async (id) => {
    const session = db.getSession();
    try {
      const result = await session.run(
        'MATCH (d:Doctor {id: $id}) WITH d, d AS exists DELETE d RETURN exists',
        { id }
      );
      if (result.records.length === 0) {
        return { success: false, message: "Doctor not found" };
      }
      return { success: true, message: "Doctor deleted successfully" };
    } finally {
      await session.close();
    }
  },

  loginDoctorService: async (email, password) => {
    const session = db.getSession();
    try {
      const result = await session.run('MATCH (d:Doctor {email: $email}) RETURN d', { email });
      if (result.records.length === 0) {
        throw new Error("Doctor does not exist!");
      }

      const existingDoctor = result.records[0].get('d').properties;
      const passwordMatch = await bcrypt.compare(password, existingDoctor.password);

      if (!passwordMatch) {
        throw new Error("Incorrect email or password!");
      }

      const { generateToken } = require("../middleware/Auth");
      const payload = {
        id: existingDoctor.id,
        email: existingDoctor.email,
        role: "doctor"
      };

      const token = generateToken(payload);

      return {
        user: existingDoctor,
        token
      };
    } finally {
      await session.close();
    }
  },
};

module.exports = doctorServices;
