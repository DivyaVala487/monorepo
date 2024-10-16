import { CountryModel } from "../../models/country.model";
import { getResponseMessage, setErrorResponse, setSuccessResponse } from "../../services/responseServices"; // Adjust path
import { sequelize } from "@loaders/database";
import { ICountryCreation } from "@dtos/country.dto";
import { ResponseDto } from "@dtos/reusableDtos";
import { IStateCreation } from "@dtos/state.dtos";
import { StateModel } from "../../models/state.model";
import { CityModel } from "../../models/city.model";
import { Op } from "sequelize";

export const addCountry = async (countryDetails: ICountryCreation): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;
    try {

        const { name } = countryDetails;


        const formattedName = name.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());


        const existingCountry = await CountryModel.findOne({
            where: { name: formattedName },
            transaction,
        });

        if (existingCountry) {

            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("COUNTRY_ALREADY_EXISTS"),
            });
        }


        const newCountry = await CountryModel.create(
            {
                name: formattedName,
            },
            { transaction }
        );

        if (!newCountry) {

            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("FAILED_TO_CREATE_COUNTRY"),
            });
        }


        await transaction.commit();


        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("COUNTRY_CREATED_SUCCESSFULLY"),
            data: newCountry,
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


export const addState = async (stateDetails: IStateCreation): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;
    try {

        const { country_id, state_name, short_name, gst } = stateDetails;
        const existingCountry = await CountryModel.findOne({
            where: { country_id: country_id },
            transaction,
        });

        if (!existingCountry) {

            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("COUNTRY_NOT_PRESENT"),
            });
        }


        const stateCreation = await StateModel.create(
            {
                country_id,
                short_name,
                state_name,
                gst
            },
            { transaction }
        );

        if (!stateCreation) {

            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("STATE_CREATION_FAILED"),
            });
        }


        await transaction.commit();


        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("STATE_CREATED_SUCCESSFULLY"),
            data: stateCreation,
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


export const getAllStates = async (data: any): Promise<ResponseDto> => {

    const { country_id } = data;
    let response: ResponseDto;
    try {


        const FindAllStates = await StateModel.findAll({
            where: { country_id },


        });

        console.log(FindAllStates, "FindAllStates");

        if (FindAllStates.length === 0) {


            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("NO_STATE_PRESENT"),
            });
        }


        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("STATES_ARE_PRESENT"),
            data: FindAllStates,
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


        const createCity = await CityModel.create({
            country_id,
            state_id,
            city_name,
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


export const getAllCities = async (data: any): Promise<ResponseDto> => {
    const { country_id, state_id } = data;
    let response: ResponseDto;

    try {

        const countryExists = await CountryModel.findOne({
            where: { country_id }
        });

        if (!countryExists) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("COUNTRY_NOT_PRESENT"),
            });
        }


        const stateExists = await StateModel.findOne({
            where: { state_id, country_id }
        });

        if (!stateExists) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("STATE_NOT_FOUND_OR_INVALID_FOR_COUNTRY"),
            });
        }


        const allCities = await CityModel.findAll({
            where: {
                [Op.and]: [
                    { country_id: country_id },
                    { state_id: state_id }
                ]
            }
        });

        if (!allCities || allCities.length === 0) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("NO_CITIES_PRESENT"),
            });
        }

        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("CITIES_FOUND"),
            data: allCities,
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


