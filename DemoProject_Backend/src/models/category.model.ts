import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { ICategory, ICategoryCreation } from "../dtos/category.dtos";
import { SubcategoryModel } from "./subcategory.model";

export const CategoryModel: ModelDefined<ICategory, ICategoryCreation> = sequelize.define(
    "categories",
    {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        slug: {
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
        tableName: "categories",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);


CategoryModel.hasMany(SubcategoryModel, {
    foreignKey: "category_id",
    as: "subcategories",
});


SubcategoryModel.belongsTo(CategoryModel, {
    foreignKey: "category_id",
    as: "category",
});
