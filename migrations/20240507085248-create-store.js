'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stores', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      authorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Clients',
          foreignKey: 'id',    
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'storeCategories',
          foreignKey: 'id',
        }
      },
      name: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Stores');
  }
};