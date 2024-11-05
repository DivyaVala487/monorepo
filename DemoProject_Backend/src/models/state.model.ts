import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { IState, IStateCreation } from "../dtos/state.dtos";
import { CountryModel } from "./country.model";
import { CityModel } from "./city.model";

export const StateModel: ModelDefined<IState, IStateCreation> = sequelize.define(
    "states",
    {
        state_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        country_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: CountryModel,
                key: "country_id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
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
    },
    {
        tableName: "states",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);



StateModel.hasMany(CityModel, {
    foreignKey: "state_id",
    as: "cities1",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
CityModel.belongsTo(StateModel, {
    foreignKey: "state_id",
    as: "state",
});
