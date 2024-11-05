"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("countries", [
      { name: "United States", created_at: new Date(), updated_at: new Date() },
      { name: "Canada", created_at: new Date(), updated_at: new Date() },
      { name: "United Kingdom", created_at: new Date(), updated_at: new Date() },
      { name: "Australia", created_at: new Date(), updated_at: new Date() },
      { name: "India", created_at: new Date(), updated_at: new Date() },
      { name: "Germany", created_at: new Date(), updated_at: new Date() },
      { name: "France", created_at: new Date(), updated_at: new Date() },
      { name: "Italy", created_at: new Date(), updated_at: new Date() },
      { name: "Brazil", created_at: new Date(), updated_at: new Date() },
      { name: "Japan", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("countries", null, {});
  },
};
