import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { ICity, ICityCreation } from "../dtos/city.dtos";
import { CountryModel } from "../models/country.model";
import { StateModel } from "../models/state.model";

export const CityModel: ModelDefined<ICity, ICityCreation> = sequelize.define(
    "cities",
    {
        city_id: {
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
        },
        state_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: StateModel,
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
    },
    {
        tableName: "cities",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);


// CityModel.belongsTo(StateModel, {
//     foreignKey: "state_id",
//     as: "state",
// });

// CityModel.belongsTo(CountryModel, {
//     foreignKey: "country_id",
//     as: "country",
// });


