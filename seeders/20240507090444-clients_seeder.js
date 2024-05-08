"use strict";
const bycrypt = require("bcryptjs");
const uuid = require("uuid");
const {moment} = require("../config/app")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Clients",
      [
        {
          // random uuid
          id: uuid.v4(),
          name: "Fahril Refiandi",
          email: "fahril@koding.in",
          username: "fahril",
          phoneNumber: "082131371687",
          emailVerifiedAt: moment().format(),
          phoneVerifiedAt: moment().format(),
          password: bycrypt.hashSync("password", 10),
          roleId: "1",
          createdAt: moment().format(),
          updatedAt: moment().format(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("Clients", null, {});
  },
};
