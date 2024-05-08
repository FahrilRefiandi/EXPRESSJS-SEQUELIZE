'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PersonalAccessTokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Client, {
        foreignKey: 'id', // Kolom pada tabel 'Client' yang akan digunakan sebagai foreign key
        sourceKey: 'tokenableId', // Kolom pada tabel 'PersonalAccessTokens' yang akan dijadikan referensi
    });
    }
  }
  PersonalAccessTokens.init({
    tokenableId: DataTypes.STRING,
    lastUsedAt: DataTypes.DATE,
    token: DataTypes.STRING,
    tokennableType: DataTypes.STRING,
    name: DataTypes.STRING,
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PersonalAccessTokens',
  });
  return PersonalAccessTokens;
};