"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("cities", {
      city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "countries",
          },
          key: "country_id",
        },
      },
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "states",
          },
          key: "state_id",
        },
      },
      city_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cities");
  },
};
