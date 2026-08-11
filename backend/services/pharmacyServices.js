const db = require("../models/index");
const { v4: uuidv4 } = require('uuid');

const pharmacyServices = {
  postPharmacyService: async (pharmacyData) => {
    const session = db.getSession();
    try {
      pharmacyData.id = uuidv4();
      const result = await session.run(
        'CREATE (p:Pharmacy $props) RETURN p',
        { props: pharmacyData }
      );
      return result.records[0].get('p').properties;
    } finally {
      await session.close();
    }
  },

  getPharmacyService: async () => {
    const session = db.getSession();
    try {
      const result = await session.run('MATCH (p:Pharmacy) RETURN p');
      return result.records.map(record => record.get('p').properties);
    } finally {
      await session.close();
    }
  },

  deletePharmacyService: async (id) => {
    const session = db.getSession();
    try {
      const result = await session.run(
        'MATCH (p:Pharmacy {id: $id}) DETACH DELETE p RETURN p',
        { id }
      );
      if (result.records.length === 0) {
        return { success: false, message: "Pharmacy not found" };
      }
      return { success: true, message: "Pharmacy deleted successfully" };
    } finally {
      await session.close();
    }
  },

  updatePharmacyService: async (id, pharmacyData) => {
    const session = db.getSession();
    try {
      const result = await session.run(
        'MATCH (p:Pharmacy {id: $id}) SET p += $props RETURN p',
        { id, props: pharmacyData }
      );
      if (result.records.length === 0) {
        throw new Error("Pharmacy Not Exists!");
      }
      return result.records[0].get('p').properties;
    } finally {
      await session.close();
    }
  },

  getPharmacyByIdService: async (id) => {
    const session = db.getSession();
    try {
      const result = await session.run('MATCH (p:Pharmacy {id: $id}) RETURN p', { id });
      if (result.records.length === 0) return null;
      return result.records[0].get('p').properties;
    } finally {
      await session.close();
    }
  },
};

module.exports = pharmacyServices;
