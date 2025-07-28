const express = require("express");
const adminRouter = express();
const adminController = require("../controllers/adminController");
const { authenticateToken } = require("../middleware/Auth");

adminRouter.post("/admin", adminController.findAdmin);
adminRouter.get("/admin", authenticateToken, adminController.getAdmin);

module.exports = adminRouter;
