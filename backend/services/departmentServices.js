const db = require("../models/index");
const { v4: uuidv4 } = require('uuid');

const departmentService = {
  postDepartmentService: async (
    doctorid,
    department,
    specialty,
    assignedDate,
    schedule,
    experience,
    status
  ) => {
    const session = db.getSession();
    try {
      // Check if doctor exists
      const docResult = await session.run('MATCH (d:Doctor {id: $id}) RETURN d', { id: doctorid });
      if (docResult.records.length === 0) {
        throw new Error("Doctor Not Exit!");
      }
      const existingDoctor = docResult.records[0].get('d').properties;

      // Check if already assigned
      const deptResult = await session.run(
        'MATCH (dept:Department {doctor_id: $doctorid}) RETURN dept',
        { doctorid }
      );
      if (deptResult.records.length > 0) {
        throw new Error("Department already assigned to this doctor!");
      }

      const id = uuidv4();
      const departmentData = {
        id,
        doctor_id: doctorid,
        doctorName: existingDoctor.firstName + " " + existingDoctor.lastName,
        department,
        specialty,
        assignedDate,
        schedule,
        experience,
        status,
      };

      const result = await session.run(
        `
        MATCH (doc:Doctor {id: $doctorid})
        CREATE (dept:Department $props)
        CREATE (doc)-[:WORKS_IN]->(dept)
        RETURN dept
        `,
        { doctorid, props: departmentData }
      );

      return result.records[0].get('dept').properties;
    } finally {
      await session.close();
    }
  },

  dltDepartmentByIdService: async (id) => {
    const session = db.getSession();
    try {
      const result = await session.run(
        'MATCH (dept:Department {id: $id}) DETACH DELETE dept RETURN dept',
        { id }
      );
      if (result.records.length === 0) {
        return { success: false, message: "Department not found" };
      }
      return { success: true, message: "Department deleted successfully" };
    } finally {
      await session.close();
    }
  },

  getDepartmentService: async (id) => {
    const session = db.getSession();
    try {
      const result = await session.run('MATCH (dept:Department {id: $id}) RETURN dept', { id });
      if (result.records.length === 0) {
        throw new Error("Department Not Exits!");
      }
      return result.records.map(record => record.get('dept').properties);
    } finally {
      await session.close();
    }
  },

  getAllDepartmentService: async () => {
    const session = db.getSession();
    try {
      const result = await session.run(`
        MATCH (d:Doctor)
        OPTIONAL MATCH (d)-[:WORKS_IN]->(dept:Department)
        RETURN d, collect(dept) as Departments
      `);
      
      return result.records.map(record => {
        const doc = record.get('d').properties;
        const depts = record.get('Departments')
          .filter(dept => dept !== null)
          .map(dept => dept.properties);
        
        return {
          firstName: doc.firstName,
          mobile: doc.mobile,
          email: doc.email,
          education: doc.education,
          doctorimg: doc.doctorimg,
          Departments: depts
        };
      });
    } finally {
      await session.close();
    }
  },

  updateDepartmentService: async (id, departmentData) => {
    const session = db.getSession();
    try {
      const result = await session.run(
        'MATCH (dept:Department {id: $id}) SET dept += $props RETURN dept',
        { id, props: departmentData }
      );
      if (result.records.length === 0) {
        throw new Error("Department Not Exits!");
      }
      return result.records[0].get('dept').properties;
    } finally {
      await session.close();
    }
  },
};

module.exports = departmentService;
