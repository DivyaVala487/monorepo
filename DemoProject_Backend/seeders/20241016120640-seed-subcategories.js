"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.bulkInsert("subcategories", [
      {
        category_id: 1, // Technology
        sub_category_name: "Artificial Intelligence",
        icon: "ai_icon.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: 1, // Technology
        sub_category_name: "Blockchain",
        icon: "blockchain_icon.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: 2, // Health
        sub_category_name: "Nutrition",
        icon: "nutrition_icon.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: 2, // Health
        sub_category_name: "Mental Health",
        icon: "mental_health_icon.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: 3, // Lifestyle
        sub_category_name: "Travel",
        icon: "travel_icon.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: 3, // Lifestyle
        sub_category_name: "Fashion",
        icon: "fashion_icon.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.bulkDelete("subcategories", null, {});
  },
};
