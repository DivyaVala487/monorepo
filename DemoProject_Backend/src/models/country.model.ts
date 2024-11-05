import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { ICountry, ICountryCreation } from "../dtos/country.dto";
import { StateModel } from "./state.model";
import { CityModel } from "./city.model";

export const CountryModel: ModelDefined<ICountry, ICountryCreation> = sequelize.define(
    "countries",
    {
        country_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        flag: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
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
        tableName: "countries",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);


CountryModel.hasMany(StateModel, {
    foreignKey: "country_id",
    as: "states",
});

CountryModel.hasMany(CityModel, {
    foreignKey: "country_id",
    as: "cities",
});


StateModel.belongsTo(CountryModel, {
    foreignKey: "country_id",
    as: "country",
});

CityModel.belongsTo(CountryModel, {
    foreignKey: "country_id",
    as: "country",
});
