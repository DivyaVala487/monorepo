"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Technology",
        icon: "tech_icon.png",
        slug: "technology",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Health",
        icon: "health_icon.png",
        slug: "health",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Lifestyle",
        icon: "lifestyle_icon.png",
        slug: "lifestyle",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
