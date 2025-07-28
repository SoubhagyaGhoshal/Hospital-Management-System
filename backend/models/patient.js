"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init(
    {
      patient_id: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      gender: DataTypes.ENUM("Male", "Female"),
      mobile: DataTypes.STRING,
      birth: DataTypes.DATE,
      age: DataTypes.INTEGER,
      email: DataTypes.STRING,
      maritalStatus: DataTypes.ENUM("Single", "Married"),
      address: DataTypes.TEXT,
      bloodGroup: DataTypes.STRING,
      bloodPressure: DataTypes.STRING,
      sugar: DataTypes.STRING,
      injury: DataTypes.TEXT,
      patientImg: DataTypes.TEXT,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};

