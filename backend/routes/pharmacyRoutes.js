const express = require("express");
const pharmacyRouter = express();
const pharmacyController = require("../controllers/pharmacyController");
const { authenticateToken } = require("../middleware/Auth");

pharmacyRouter.post("/pharmacy", pharmacyController.postPharmacy);

pharmacyRouter.get("/pharmacy", pharmacyController.getPharmacy);

pharmacyRouter.delete("/pharmacy/:id", pharmacyController.deletePharmacy);

pharmacyRouter.put("/pharmacy/:id", pharmacyController.updatePharmacy);

pharmacyRouter.get("/pharmacy/:id", pharmacyController.getPharmacyById);

module.exports = pharmacyRouter;
