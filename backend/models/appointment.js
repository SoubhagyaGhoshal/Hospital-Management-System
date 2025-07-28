"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appointment.init(
    {
      doctor_id: DataTypes.INTEGER,
      patient_id: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      gender: DataTypes.ENUM("Male", "Female"),
      mobile: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      birth: DataTypes.DATE,
      doctorName: DataTypes.STRING,
      injury: DataTypes.STRING,
      note: DataTypes.TEXT,
      patientImg: DataTypes.TEXT,
      date_of_appointment: DataTypes.DATEONLY,
      time_of_appointment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
