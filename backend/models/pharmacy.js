'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pharmacy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pharmacy.init({
    medicine_id: DataTypes.STRING,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    companyname: DataTypes.STRING,
    purchasedate: DataTypes.DATEONLY,
    price: DataTypes.FLOAT,
    expiredate: DataTypes.DATEONLY,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pharmacy',
  });
  return Pharmacy;
};