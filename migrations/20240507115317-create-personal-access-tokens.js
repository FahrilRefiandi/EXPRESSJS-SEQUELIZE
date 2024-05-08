'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PersonalAccessTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tokenableId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model : 'Clients',
          key : 'id'
        }

      },
      lastUsedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
         
      },
      token: {
        type: Sequelize.STRING,
        unique: true
      },
      tokennableType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PersonalAccessTokens');
  }
};