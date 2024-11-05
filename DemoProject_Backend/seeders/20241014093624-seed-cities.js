"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cities", [
      { country_id: 1, state_id: 1, city_name: "Los Angeles", created_at: new Date(), updated_at: new Date() },
      { country_id: 1, state_id: 1, city_name: "San Francisco", created_at: new Date(), updated_at: new Date() },
      { country_id: 1, state_id: 2, city_name: "Houston", created_at: new Date(), updated_at: new Date() },
      { country_id: 1, state_id: 3, city_name: "New York City", created_at: new Date(), updated_at: new Date() },
      { country_id: 2, state_id: 4, city_name: "Toronto", created_at: new Date(), updated_at: new Date() },
      { country_id: 2, state_id: 5, city_name: "Montreal", created_at: new Date(), updated_at: new Date() },
      { country_id: 3, state_id: 6, city_name: "London", created_at: new Date(), updated_at: new Date() },
      { country_id: 3, state_id: 7, city_name: "Edinburgh", created_at: new Date(), updated_at: new Date() },
      { country_id: 4, state_id: 8, city_name: "Sydney", created_at: new Date(), updated_at: new Date() },
      { country_id: 5, state_id: 9, city_name: "Mumbai", created_at: new Date(), updated_at: new Date() },
      { country_id: 6, state_id: 10, city_name: "Munich", created_at: new Date(), updated_at: new Date() },
      { country_id: 7, state_id: 11, city_name: "Paris", created_at: new Date(), updated_at: new Date() },
      { country_id: 8, state_id: 12, city_name: "Rome", created_at: new Date(), updated_at: new Date() },
      { country_id: 9, state_id: 13, city_name: "São Paulo", created_at: new Date(), updated_at: new Date() },
      { country_id: 10, state_id: 14, city_name: "Tokyo", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cities", null, {});
  },
};
