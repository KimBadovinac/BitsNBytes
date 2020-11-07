'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zivali extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Zivali.init({
    ime: DataTypes.STRING,
    status: DataTypes.STRING,
    vrsta: DataTypes.STRING,
    barva: DataTypes.STRING,
    datum: DataTypes.DATE,
    lokacija: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Zivali',
  });
  return Zivali;
};