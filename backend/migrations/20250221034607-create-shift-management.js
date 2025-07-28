"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("shift_managements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doctor_id: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      department: {
        type: Sequelize.ENUM(
          "Urology",
          "Dentist",
          "Cardiology",
          "Neurology",
          "Pediatrics",
          "Orthopedics",
          "Dermatology",
          "Psychiatry",
          "Ophthalmology"
        ),
      },
      specialty: {
        type: Sequelize.STRING,
      },
      shiftstart: {
        type: Sequelize.DATEONLY,
      },
      shiftend: {
        type: Sequelize.DATEONLY,
      },
      workday: {
        type: Sequelize.STRING,
      },
      shifthours: {
        type: Sequelize.STRING,
      },
      shifttype: {
        type: Sequelize.ENUM("Day Shift", "Night Shift"),
      },
      status: {
        type: Sequelize.ENUM("Available", "Unavailable", "On Leave"),
      },
      totalhoursweeks: {
        type: Sequelize.INTEGER,
      },
      shiftnotes: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("shift_managements");
  },
};

