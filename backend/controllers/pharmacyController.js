const pharmacyServices = require("../services/pharmacyServices");

const pharmacyController = {
  postPharmacy: async (req, res) => {
    const {
      name,
      category,
      companyname,
      purchasedate,
      price,
      expiredate,
      stock,
    } = req.body;

    // Create new pharmacy record
    const pharmacyData = {
      name,
      category,
      companyname,
      purchasedate,
      price,
      expiredate,
      stock,
    };

    try {
      const response = await pharmacyServices.postPharmacyService(pharmacyData);

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(401).json(error.message);
    }
  },

  getPharmacy: async (req, res) => {
    try {
      const response = await pharmacyServices.getPharmacyService();

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(401).json(error.message);
    }
  },

  deletePharmacy: async (req, res) => {
    const id = req.params.id;
    try {
      const response = await pharmacyServices.deletePharmacyService(id);

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  },

  updatePharmacy: async (req, res) => {
    const id = req.params.id;
    const {
      name,
      category,
      companyname,
      purchasedate,
      price,
      expiredate,
      stock,
    } = req.body;

    const pharmacyData = {
      name,
      category,
      companyname,
      purchasedate,
      price,
      expiredate,
      stock,
    };

    try {
      const response = await pharmacyServices.updatePharmacyService(
        id,
        pharmacyData
      );

      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching All Pharmacy data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getPharmacyById: async (req, res) => {
    const id = req.params.id;

    try {
      const response = await pharmacyServices.getPharmacyByIdService(id);

      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching Pharmacy data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = pharmacyController;
