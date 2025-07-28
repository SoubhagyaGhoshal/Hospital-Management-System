"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ShiftManagement extends Model {
    static associate(models) {}
  }

  ShiftManagement.init(
    {
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: DataTypes.STRING,
      department: DataTypes.ENUM(
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
      specialty: DataTypes.STRING,
      shiftstart: DataTypes.DATE, // Ensure consistency with migration
      shiftend: DataTypes.DATE, // Ensure consistency with migration
      workday: DataTypes.STRING,
      shifthours: DataTypes.STRING,
      shifttype: DataTypes.ENUM("Day Shift", "Night Shift"),
      status: DataTypes.ENUM("Available", "Unavailable", "On Leave"),
      totalhoursweeks: DataTypes.INTEGER, // Ensure the same column name is used
      shiftnotes: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "shift_managements",
    }
  );

  return ShiftManagement;
};

