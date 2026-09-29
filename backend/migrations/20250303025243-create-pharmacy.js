"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pharmacies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      medicine_id: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      companyname: {
        type: Sequelize.STRING,
      },
      purchasedate: {
        type: Sequelize.DATEONLY,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      expiredate: {
        type: Sequelize.DATEONLY,
      },
      stock: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Pharmacies");
  },
};

