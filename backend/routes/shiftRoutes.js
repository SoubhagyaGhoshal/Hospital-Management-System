const express = require("express");
const shiftRouter = express();
const shiftController = require("../controllers/shiftControllers");
const { authenticateToken } = require("../middleware/Auth");

shiftRouter.post("/shift", authenticateToken, shiftController.addShift);
shiftRouter.get("/shift", authenticateToken, shiftController.getAllShift);
shiftRouter.get("/shift/:id", authenticateToken, shiftController.getShift);
shiftRouter.put("/shift/:id", authenticateToken, shiftController.updateShift);
shiftRouter.delete(
  "/shift/:id",
  authenticateToken,
  shiftController.deleteShift
);

module.exports = shiftRouter;
