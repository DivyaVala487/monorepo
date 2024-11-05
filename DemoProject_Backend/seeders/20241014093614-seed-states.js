"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("states", [
      { country_id: 1, short_name: "CA", state_name: "California", gst: true, created_at: new Date(), updated_at: new Date() },
      { country_id: 1, short_name: "TX", state_name: "Texas", gst: true, created_at: new Date(), updated_at: new Date() },
      { country_id: 1, short_name: "NY", state_name: "New York", gst: true, created_at: new Date(), updated_at: new Date() },
      { country_id: 2, short_name: "ON", state_name: "Ontario", gst: true, created_at: new Date(), updated_at: new Date() },
      { country_id: 2, short_name: "QC", state_name: "Quebec", gst: true, created_at: new Date(), updated_at: new Date() },
      { country_id: 3, short_name: "ENG", state_name: "England", gst: true, created_at: new Date(), updated_at: new Date() },
      { country_id: 3, short_name: "SCT", state_name: "Scotland", gst: true, created_at: new Date(), updated_at: new Date() },
      { country_id: 4, short_name: "NSW", state_name: "New South Wales", gst: true, created_at: new Date(), updated_at: new Date() },
      { country_id: 5, short_name: "MH", state_name: "Maharashtra", gst: true, created_at: new Date(), updated_at: new Date() },
      { country_id: 6, short_name: "BY", state_name: "Bavaria", gst: true, created_at: new Date(), updated_at: new Date() },
      { country_id: 7, short_name: "IDF", state_name: "Île-de-France", gst: true, created_at: new Date(), updated_at: new Date() },
      { country_id: 8, short_name: "LAZ", state_name: "Lazio", gst: true, created_at: new Date(), updated_at: new Date() },
      { country_id: 9, short_name: "SP", state_name: "São Paulo", gst: true, created_at: new Date(), updated_at: new Date() },
      { country_id: 10, short_name: "TKY", state_name: "Tokyo", gst: true, created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("states", null, {});
  },
};
