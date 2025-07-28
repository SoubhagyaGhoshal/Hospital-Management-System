const db = require("../models/index");
const Pharmacy = db.Pharmacy;

const pharmacyServices = {
  postPharmacyService: async (pharmacyData) => {
    const response = await Pharmacy.create(pharmacyData);

    return response;
  },
  getPharmacyService: async () => {
    const response = await Pharmacy.findAll();

    return response;
  },

  deletePharmacyService: async (id) => {
    const pharmacyData = await Pharmacy.findOne({ where: { id } });

    if (!pharmacyData) {
      return { success: false, message: "Pharmacy not found" };
    }

    await pharmacyData.destroy({ where: { id } });

    return { success: true, message: "Pharmacy deleted successfully" };
  },

  updatePharmacyService: async (id, pharmacyData) => {
    const existingPharmcay = await Pharmacy.findOne({
      where: { id: id },
    });

    if (!existingPharmcay) {
      throw new Error("Pharmacy Not Exists!");
    }

    // ✅ Await the update operation
    const updatedPharmacyData = await existingPharmcay.update(pharmacyData);

    return updatedPharmacyData;
  },

  getPharmacyByIdService: async (id) => {
    const response = await Pharmacy.findOne({ where: { id: id } });

    return response;
  },
};

module.exports = pharmacyServices;
