const db = require("../models/index");
const { where } = require("sequelize");
const bcrypt = require("bcryptjs");
const cloudinary = require("../cloudinary/cloudinary");
const Doctor = db.Doctor;

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

    console.log(imageUrl);

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctorData = await Doctor.create({
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
    });

    return doctorData;
  },

  getAllDoctorService: async () => {
    const allDoctor = await Doctor.findAll();

    if (!allDoctor) {
      throw new Error("all Doctor is not get");
    }

    return allDoctor;
  },

  updateDoctorService: async (id, doctorData) => {
    const existingDoctor = await Doctor.findOne({ where: { id } });

    if (!existingDoctor) {
      throw new Error("Doctor does not exist!");
    }

    // Check if a new image is provided
    if (doctorData.doctorimg && doctorData.doctorimg.startsWith("data:image")) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        doctorData.doctorimg,
        {
          folder: "/DoctorImage",
        }
      );

      doctorData.doctorimg = cloudinaryResponse.secure_url; // Set new image URL
    } else {
      doctorData.doctorimg = existingDoctor.doctorimg; // Keep old image if no new one
    }

    await existingDoctor.update(doctorData);

    return existingDoctor;
  },

  getDoctorByIdService: async (id) => {
    const doctorData = await Doctor.findOne({ where: { id } });

    return doctorData;
  },

  dltDoctorByIdService: async (id) => {
    const doctorData = await Doctor.findOne({ where: { id } });

    if (!doctorData) {
      return { success: false, message: "Doctor not found" };
    }

    await Doctor.destroy({ where: { id } });

    return { success: true, message: "Doctor deleted successfully" };
  },

  loginDoctorService: async (email, password) => {
    const existingDoctor = await Doctor.findOne({ where: { email } });

    if (!existingDoctor) {
      throw new Error("Doctor does not exist!");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingDoctor.password
    );

    if (!passwordMatch) {
      throw new Error("Incorrect email or password!");
    }

    // Generate JWT token for doctor
    const { generateToken } = require("../middleware/Auth");
    const payload = {
      id: existingDoctor.id,
      email: existingDoctor.email,
      role: "doctor"
    };

    const token = generateToken(payload);

    return {
      doctor: existingDoctor,
      token
    };
  },
};

module.exports = doctorServices;
