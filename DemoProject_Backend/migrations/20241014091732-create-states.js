"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("states", {
      state_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: {
            tableName: "countries",
          },
          key: "country_id",
        },
      },
      short_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gst: {
        type: DataTypes.BOOLEAN,
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
    await queryInterface.dropTable("states");
  },
};
