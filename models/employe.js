'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employe.init({
    storeId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Employe',
  });
  return Employe;
};