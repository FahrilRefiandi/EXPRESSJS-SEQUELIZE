"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Client.belongsTo(models.Role, { foreignKey: "roleId" });
      Client.hasMany(models.Product, { foreignKey: "clientId" });
      // Client.belongsTo(models.Store, { foreignKey: 'authorId' })
    }
  }

  Client.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      emailVerifiedAt: DataTypes.DATE,
      phoneVerifiedAt: DataTypes.DATE,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      roleId: DataTypes.UUID,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Client",
    }
  );

  // hidden password from json response
  Client.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    delete values.roleId;
    return values;
  };
  
  Client.prototype.getAvatar = function () {
    if (this.avatar) {
      this.avatar = "http://localhost:3000/uploads/" + this.avatar;
    }else{
      // use ui-avatars.com
      this.avatar = `https://ui-avatars.com/api/?name=${this.name.replace(" ", "+")}&background=random&color=fff&bold=true`;
    }
    return this;
  };

  Client.beforeCreate((client, options) => {
    client.id = uuidv4();
  });

  // Perbaikan pada hook afterFind
  Client.afterFind((clients, options) => {
    if (Array.isArray(clients)) {
      return clients.map((client) => {
        return client.getAvatar(); // Jalankan getAvatar untuk setiap client dan kembalikan nilai
      });
    } else {
      return clients.getAvatar(); // Jalankan getAvatar untuk client tunggal dan kembalikan nilai
    }
  });

  

  return Client;
};
