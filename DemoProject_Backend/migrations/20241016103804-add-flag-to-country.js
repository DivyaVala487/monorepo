"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    
    await queryInterface.addColumn("countries", "flag", {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:null
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("countries", "flag");
  },
};
