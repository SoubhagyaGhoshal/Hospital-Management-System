const departmentService = require("../services/departmentServices");

const departmentController = {
  postDepartment: async (req, res) => {
    const {
      doctor_id,
      department,
      specialty,
      assignedDate,
      schedule,
      experience,
      status,
    } = req.body;

    try {
      const response = await departmentService.postDepartmentService(
        doctor_id,
        department,
        specialty,
        assignedDate,
        schedule,
        experience,
        status
      );

      res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  dltDepartmentById: async (req, res) => {
    const id = req.params.id;

    const response = await departmentService.dltDepartmentByIdService(id);

    res.status(201).json(response);
    try {
    } catch (error) {
      console.log(error);
      res.status(401).json("error during delete department by id");
    }
  },

  updateDepartment: async (req, res) => {
    const {
      department,
      specialty,
      assignedDate,
      schedule,
      experience,
      status,
    } = req.body;
    const departmentId = req.params.id;
    const departmentData = {
      department,
      specialty,
      assignedDate,
      schedule,
      experience,
      status,
    };
    console.log(departmentData);
    try {
      const response = await departmentService.updateDepartmentService(
        departmentId,
        departmentData
      );

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(401).json("Error During update Department!");
    }
  },

  getDepartment: async (req, res) => {
    const id = req.params.id;

    try {
      const response = await departmentService.getDepartmentService(id);

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(401).json("Error in get Department!");
    }
  },
  getAllDepartment: async (req, res) => {
    try {
      const response = await departmentService.getAllDepartmentService();

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(401).json("Error in get All Department!");
    }
  },
};

module.exports = departmentController;
