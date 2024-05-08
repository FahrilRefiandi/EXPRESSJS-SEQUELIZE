'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      phoneNumber: {
        type: Sequelize.STRING,
        unique: true
      },
      emailVerifiedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      phoneVerifiedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients');
  }
};