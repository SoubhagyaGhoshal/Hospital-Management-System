const shiftService = require("../services/shiftService");

const shiftControllers = {
  addShift: async (req, res) => {
    const {
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
      shiftnotes,
    } = req.body;

    try {
      const response = await shiftService.addShiftService(
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
      );
      console.log(response);
      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(401).json(error.message);
    }
  },

  getShift: async (req, res) => {
    const doctorId = req.params.id;

    try {
      const response = await shiftService.getShiftService(doctorId);

      if (!response) {
        return res
          .status(404)
          .json({ error: "No shift data found for this doctor." });
      }

      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching shift data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllShift: async (req, res) => {
    try {
      const response = await shiftService.getAllShiftService();

      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching All shift data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateShift: async (req, res) => {
    const {
      name,
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
    } = req.body;
    const id = req.params.id;

    const shiftData = {
      name,
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
    };

    try {
      const response = await shiftService.updateShiftService(id, shiftData);

      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching All shift data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteShift: async (req, res) => {
    const id = req.params.id;

    try {
      const response = await shiftService.deleteShiftService(id);

      res.status(201).json(response);
    } catch (error) {
      console.error("Error fetching All shift data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = shiftControllers;
