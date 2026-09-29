const express = require("express");
const departmentRouter = express(); // Use Router() instead of express()
const departmentController = require("../controllers/departmentController");
const { authenticateToken } = require("../middleware/Auth");

departmentRouter.post(
  "/department",
  authenticateToken,
  departmentController.postDepartment
);
departmentRouter.get(
  "/department",
  authenticateToken,
  departmentController.getAllDepartment
);
departmentRouter.get(
  "/department/:id",
  authenticateToken,
  departmentController.getDepartment
);

departmentRouter.delete(
  "/department/:id",
  authenticateToken,
  departmentController.dltDepartmentById
);

departmentRouter.put(
  "/department/:id",
  authenticateToken,
  departmentController.updateDepartment
);

module.exports = departmentRouter;
