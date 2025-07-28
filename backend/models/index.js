"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Doctor = require("./doctor")(sequelize, Sequelize.DataTypes);
db.Department = require("./department")(sequelize, Sequelize.DataTypes);
db.Shiftmanagement = require("./shift_management")(
  sequelize,
  Sequelize.DataTypes
);
db.Patient = require("./patient")(sequelize, Sequelize.DataTypes);

db.Appointment = require("./appointment")(sequelize, Sequelize.DataTypes);

db.Pharmacy = require("./pharmacy")(sequelize, Sequelize.DataTypes);

db.User = require("./user")(sequelize, Sequelize.DataTypes);

// One-to-One Association For Department Start

db.Doctor.hasOne(db.Department, {
  foreignKey: "doctor_id",
  onDelete: "CASCADE",
});

db.Department.belongsTo(db.Doctor, {
  foreignKey: "doctor_id",
});

// One-to-One Association For Department End

// One-to-One Association For Shift Management Start

db.Doctor.hasOne(db.Shiftmanagement, {
  foreignKey: "doctor_id",
  onDelete: "CASCADE",
});

db.Shiftmanagement.belongsTo(db.Doctor, {
  foreignKey: "doctor_id",
});

// One-to-Many Association For Shift Management End

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

