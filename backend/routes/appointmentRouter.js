const express = require("express");
const appointmentRouter = express();
const appointmentController = require("./../controllers/appointmentControllers");
const { authenticateToken } = require("../middleware/Auth");

appointmentRouter.post("/appointment", appointmentController.postAppointment);
appointmentRouter.get("/appointment", appointmentController.getAllAppointment);
appointmentRouter.get(
    "/appointment/:id",
    appointmentController.getAppointmentById
  );
appointmentRouter.put(
  "/appointment/:id",
  appointmentController.updateAppointment
);
appointmentRouter.delete(
  "/appointment/:id",
  appointmentController.deleteAppointment
);

module.exports = appointmentRouter;
