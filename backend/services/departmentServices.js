const db = require("../models/index");
const Department = db.Department;
const Doctor = db.Doctor;

const departmentService = {
  postDepartmentService: async (
    doctorid, // Passed as camelCase
    department,
    specialty,
    assignedDate,
    schedule,
    experience,
    status
  ) => {
    try {
      const existingId = await Department.findOne({
        where: { doctor_id: doctorid },
      });

      if (existingId) {
        throw new Error("Department already assigned to this doctor!");
      }

      const existingDoctor = await Doctor.findOne({
        where: { id: doctorid },
      });

      if (!existingDoctor) {
        throw new Error("Doctor Not Exit!");
      }

      // Create a new department assignment
      const departmentData = await Department.create({
        doctor_id: doctorid, 
        doctorName: existingDoctor.firstName + " " + existingDoctor.lastName,
        department,
        specialty,
        assignedDate,
        schedule,
        experience,
        status,
      });

      return departmentData; // Returning the created department
    } catch (error) {
      console.error("Error in postDepartmentService:", error.message);
      throw error; // Ensure error is properly handled in the calling function
    }
  },

  dltDepartmentByIdService: async (id) => {
    const departmentData = await Department.findOne({ where: { id } });

    if (!departmentData) {
      return { success: false, message: "Department not found" };
    }

    await Department.destroy({ where: { id } });

    return { success: true, message: "Department deleted successfully" };
  },

  getDepartmentService: async (id) => {
    const data = await Department.findAll({
      where: { id: id },
    });

    if (!data) {
      throw new Error("Department Not Exits!");
    }

    return data;
  },

  getAllDepartmentService: async () => {
    const data = await Doctor.findAll({
      attributes: ["firstName", "mobile", "email", "education", "doctorimg"],
      include: [
        {
          model: Department,
          attributes: [
            "id",
            "doctor_id",
            "doctorName",
            "department",
            "specialty",
            "assignedDate",
            "schedule",
            "experience",
            "status",
          ],
          foreignKey: "doctor_id", 
        },
      ],
    });

    return data;
  },
  updateDepartmentService: async (id, departmentData) => {
    const existingDepartment = await Department.findOne({ where: { id } });

    if (!existingDepartment) {
      throw new Error("Department Not Exits!");
    }

    await existingDepartment.update(departmentData);

    return existingDepartment;
  },
};

module.exports = departmentService;
