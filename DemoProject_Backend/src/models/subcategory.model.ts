import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { ISubcategory, ISubcategoryCreation } from "../dtos/subcategory.dto";
import { CategoryModel } from "./category.model";

export const SubcategoryModel: ModelDefined<ISubcategory, ISubcategoryCreation> = sequelize.define(
  "subcategories",
  {
    subcategory_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CategoryModel,
        key: "category_id",
      },
      onDelete: "CASCADE",
    },
    sub_category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
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
  },
  {
    tableName: "subcategories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

