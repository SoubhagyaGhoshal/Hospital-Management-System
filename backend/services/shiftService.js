const db = require("../models/index");
const { v4: uuidv4 } = require('uuid');

const shiftService = {
  addShiftService: async (
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
  ) => {
    const session = db.getSession();
    try {
      // Check if doctor exists
      const docResult = await session.run('MATCH (d:Doctor {id: $id}) RETURN d', { id: doctor_id });
      if (docResult.records.length === 0) {
        throw new Error("Doctor Not Exit!");
      }
      const existingDoctor = docResult.records[0].get('d').properties;

      // Check if already assigned
      const shiftResult = await session.run(
        'MATCH (s:Shiftmanagement {doctor_id: $doctor_id}) RETURN s',
        { doctor_id }
      );
      if (shiftResult.records.length > 0) {
        throw new Error("Shift already assigned to this doctor!");
      }

      const id = uuidv4();
      const shiftData = {
        id,
        doctor_id,
        name: existingDoctor.firstName + " " + existingDoctor.lastName,
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

      const result = await session.run(
        `
        MATCH (doc:Doctor {id: $doctor_id})
        CREATE (s:Shiftmanagement $props)
        CREATE (doc)-[:HAS_SHIFT]->(s)
        RETURN s
        `,
        { doctor_id, props: shiftData }
      );

      return result.records[0].get('s').properties;
    } finally {
      await session.close();
    }
  },

  getShiftService: async (id) => {
    const session = db.getSession();
    try {
      const result = await session.run('MATCH (s:Shiftmanagement {id: $id}) RETURN s', { id });
      if (result.records.length === 0) return null;
      return result.records[0].get('s').properties;
    } finally {
      await session.close();
    }
  },

  getAllShiftService: async () => {
    const session = db.getSession();
    try {
      const result = await session.run(`
        MATCH (d:Doctor)
        OPTIONAL MATCH (d)-[:HAS_SHIFT]->(s:Shiftmanagement)
        RETURN d, collect(s) as Shiftmanagements
      `);
      
      return result.records.map(record => {
        const doc = record.get('d').properties;
        const shifts = record.get('Shiftmanagements')
          .filter(s => s !== null)
          .map(s => s.properties);
        
        return {
          id: doc.id,
          doctorimg: doc.doctorimg,
          firstName: doc.firstName,
          lastName: doc.lastName,
          department: doc.department,
          Shiftmanagements: shifts
        };
      });
    } finally {
      await session.close();
    }
  },

  updateShiftService: async (id, shiftData) => {
    const session = db.getSession();
    try {
      const result = await session.run(
        'MATCH (s:Shiftmanagement {id: $id}) SET s += $props RETURN s',
        { id, props: shiftData }
      );
      if (result.records.length === 0) {
        throw new Error("Shift Not Exists!");
      }
      return result.records[0].get('s').properties;
    } finally {
      await session.close();
    }
  },

  deleteShiftService: async (id) => {
    const session = db.getSession();
    try {
      const result = await session.run(
        'MATCH (s:Shiftmanagement {id: $id}) DETACH DELETE s RETURN s',
        { id }
      );
      if (result.records.length === 0) {
        return { success: false, message: "Shift not found!" };
      }
      return { success: true, message: "Shift deleted successfully!" };
    } finally {
      await session.close();
    }
  },
};

module.exports = shiftService;
