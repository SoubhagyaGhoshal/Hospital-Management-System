"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Patients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patient_id: {
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female"),
      },
      mobile: {
        type: Sequelize.STRING,
      },
      birth: {
        type: Sequelize.DATE,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      maritalStatus: {
        type: Sequelize.ENUM("Single", "Married"),
      },
      address: {
        type: Sequelize.TEXT,
      },
      bloodGroup: {
        type: Sequelize.STRING,
      },
      bloodPressure: {
        type: Sequelize.STRING,
      },
      sugar: {
        type: Sequelize.STRING,
      },
      injury: {
        type: Sequelize.TEXT,
      },
      patientImg: {
        type: Sequelize.TEXT,
      },
      password: {
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
    await queryInterface.dropTable("Patients");
  },
};

