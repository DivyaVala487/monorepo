import { CountryModel } from "../../models/country.model";
import { getResponseMessage, setErrorResponse, setSuccessResponse } from "../../services/responseServices";
import { sequelize } from "@loaders/database";
import { ICountryCreation } from "@dtos/country.dto";
import { ResponseDto } from "@dtos/reusableDtos";
import { IStateCreation } from "@dtos/state.dtos";
import { StateModel } from "../../models/state.model";
import { CityModel } from "../../models/city.model";
import { Op } from "sequelize";
import { v2 as cloudinary } from "cloudinary";
import { CategoryModel } from "../../models/category.model";
import { ISubcategoryCreation } from "@dtos/subcategory.dto";
import { SubcategoryModel } from "../../models/subcategory.model";
import { generateSlug, toProperCase } from "../../reusablefunctions/reusablefunctions";
import { ICityCreation } from "@dtos/city.dtos";
import { ICategoryCreation } from "@dtos/category.dtos";


export const addCity = async (data: any): Promise<ResponseDto> => {
    const { country_id, state_id, city_name } = data;
    let response: ResponseDto;
    try {

        const countryExists = await CountryModel.findOne({
            where: { country_id: country_id },
        });

        if (!countryExists) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("COUNTRY_NOT_PRESENT"),
            });
        }


        const stateExists = await StateModel.findOne({
            where: { state_id, country_id },
        });

        if (!stateExists) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("STATE_NOT_FOUND_OR_NOT_IN_COUNTRY"),
            });
        }

        // const formattedName = city_name.trim().toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase());
        const FindCity = await CityModel.findOne({
            where: {
                city_name: city_name,
                state_id: state_id
            }
        });

        if (FindCity) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("CITY_ALREADY_PRESENT"),
            });
        }
        const createCity = await CityModel.create({
            country_id,
            state_id,
            city_name: city_name,
        });

        if (!createCity) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("UNABLE_TO_ADD_CITY"),
            });
        }

        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("CITY_CREATED_SUCCESSFULLY"),
            data: createCity,
        });

    } catch (error) {
        const result: ResponseDto = setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error,
            details: error,
        });
        return result;
    }
};

export const getAllCities = async (): Promise<ResponseDto> => {
    try {
        const FindAllCountriesWithStatesAndCities = await CountryModel.findAll({
            include: [
                {
                    model: StateModel,
                    as: "states",
                    attributes: ["state_id", "state_name", "short_name", "gst"],
                    include: [
                        {
                            model: CityModel,
                            as: "cities1",
                            attributes: ["city_id", "city_name"],
                        },
                    ],
                },
            ],
            attributes: ["country_id", "name", "flag"],
        });

        if (FindAllCountriesWithStatesAndCities.length === 0) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("NO_COUNTRY_WITH_STATES_AND_CITIES_PRESENT"),
            });
        }

        const responseData = FindAllCountriesWithStatesAndCities.reduce((acc: any, country: any) => {
            country.states.forEach((state: any) => {
                state.cities1.forEach((city: any) => {
                    acc.push({
                        country_id: country.country_id,
                        country_name: country.name,
                        country_flag: country.flag,
                        state_name: state.state_name,
                        state_short_name: state.short_name,
                        state_gst: state.gst,
                        city_name: city.city_name,
                        city_id: city.city_id
                    });
                });
            });
            return acc;
        }, []);

        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("COUNTRIES_STATES_AND_CITIES_ARE_PRESENT"),
            data: responseData,
        });
    } catch (error) {
        return setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error,
            details: error,
        });
    }
};


export const deleteCity = async (cityId: number): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;
    try {
        const existingCity = await CityModel.findOne({
            where: {
                city_id: cityId
            },
            transaction,
        });
        if (!existingCity) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 404,
                message: getResponseMessage("CITY_NOT_PRESENT"),
            });
        }
        const deleteResult = await CityModel.destroy({
            where: {
                city_id: cityId
            },
            transaction,
        });
        if (!deleteResult) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("CITY_DELETION_FAILED"),
            });
        }
        await transaction.commit();
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("CITY_DELETED_SUCCESSFULLY"),
        });
    } catch (error) {
        await transaction.rollback();
        const result: ResponseDto = setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error,
            details: error,
        });
        return result;
    }
};

export const editCity = async (cityDetails: ICityCreation): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;

    try {
        const { city_id, city_name, state_id, country_id } = cityDetails;
        const existingCity = await CityModel.findOne({
            where: {
                city_id,
            },
            transaction,
        });

        if (!existingCity) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 404,
                message: getResponseMessage("CITY_NOT_PRESENT"),
            });
        }
        const existingCityWithName = await CityModel.findOne({
            where: {
                [Op.and]: [
                    { country_id: country_id },
                    { state_id: state_id },
                    { city_name: city_name },
                    { city_id: { [Op.ne]: city_id } },
                ],
            },
            transaction,
        });

        if (existingCityWithName) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("CITY_NAME_MUST_BE_UNIQUE_FOR_STATE_AND_COUNTRY"),
            });
        }
        const cityUpdate = await CityModel.update(
            {
                city_name,
            },
            {
                where: {
                    city_id,
                },
                transaction,
            }
        );
        if (cityUpdate[0] === 0) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("CITY_UPDATING_FAILED"),
                data: cityUpdate,
            });
        }
        await transaction.commit();
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("CITY_UPDATED_SUCCESSFULLY"),
        });
    } catch (error) {
        await transaction.rollback();
        const result: ResponseDto = setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error,
            details: error,
        });
        return result;
    }
};

export const getCities = async (): Promise<ResponseDto> => {
    let response: ResponseDto;
    try {

        const FindAllCountries = await CountryModel.findAll({
            include: [
                {
                    model: StateModel,
                    as: "states",
                    attributes: ["state_name", "state_id"],
                    include: [
                        {
                            model: CityModel,
                            as: "cities1",
                            attributes: ["city_name"],
                        },
                    ],
                },
            ],
            attributes: ["name"],
        });


        if (!FindAllCountries || FindAllCountries.length === 0) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("NO_COUNTRY_PRESENT"),
            });
        }


        const result = FindAllCountries.map((country: any) => ({
            country: country?.name || "",
            states: country?.states?.map((state: any) => ({
                state_name: state?.state_name || "",
                cities: state?.cities?.map((city: any) => city?.city_name) || []
            })) || []
        }));

        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("COUNTRIES_ARE_PRESENT"),
            data: result,
        });
    } catch (error) {

        return setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error,
            details: error,
        });
    }
};