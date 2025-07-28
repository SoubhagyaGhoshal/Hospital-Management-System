const db = require("../models/index");
const { updateDepartmentService } = require("./departmentServices");
const Doctor = db.Doctor;
const Shiftmanagement = db.Shiftmanagement;

const shiftService = {
  // for add shift Service start

  addShiftService: async (
    doctor_id,
    department,
    specialty,
    shiftstart,
    shiftend,
    workday,
    shifthours,
    shifttype,
    status,
    totalhoursweeks,
    shiftnotes
  ) => {
    const existingId = await Shiftmanagement.findOne({
      where: { doctor_id: doctor_id },
    });

    if (existingId) {
      throw new Error("Shift already assigned to this doctor!");
    }

    const existingDoctor = await Doctor.findOne({
      where: { id: doctor_id },
    });

    if (!existingDoctor) {
      throw new Error("Doctor Not Exit!");
    }

    const response = await Shiftmanagement.create({
      doctor_id,
      name: existingDoctor.firstName + " " + existingDoctor.lastName,
      department,
      specialty,
      shiftstart,
      shiftend,
      workday,
      shifthours,
      shifttype,
      status,
      totalhoursweeks,
      shiftnotes,
    });

    return response;
  },

  // for add shift Service end

  // for get shift Service by id start

  getShiftService: async (id) => {
    const response = await Shiftmanagement.findOne({
      where: { id: id },
    });

    return response;
  },

  // for get shift Service by id end

  // for get shift Service all start

  getAllShiftService: async () => {
    const response = await Doctor.findAll({
      attributes: ["id", "doctorimg", "firstName", "lastName", "department"],
      include: [
        {
          model: Shiftmanagement,
          attributes: [
            "id",
            "name",
            "department",
            "specialty",
            "shiftstart",
            "workday",
            "shifthours",
            "shiftend",
            "shifttype",
            "status",
          ],
          foreignKey: "doctor_id",
        },
      ],
    });

    return response;
  },

  // for get shift Service all end

  updateShiftService: async (id, shiftData) => {
    const existingShift = await Shiftmanagement.findOne({
      where: { id: id },
    });

    if (!existingShift) {
      throw new Error("Shift Not Exists!");
    }

    // ✅ Await the update operation
    const updatedShift = await existingShift.update(shiftData);

    console.log(updatedShift);

    return updatedShift;
  },

  deleteShiftService: async (id) => {
    const existingShift = await Shiftmanagement.findOne({ where: { id: id } });

    if (!existingShift) {
      return { success: false, message: "Shift not found!" };
    }

    await Shiftmanagement.destroy({ where: { id: id } });

    return { success: true, message: "Shift deleted successfully!" };
  },
};

module.exports = shiftService;
