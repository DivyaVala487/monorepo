import { CountryModel } from "../../models/country.model";
import { getResponseMessage, setErrorResponse, setSuccessResponse } from "../../services/responseServices"; // Adjust path
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

        // const formattedName = state_name.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

        const FindState = await StateModel.findOne({
            where: {
                state_name: state_name,
                country_id: country_id
            }
        });

        if (FindState) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("STATE_ALREADY_PRESENT"),
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

export const getAllStates = async (): Promise<ResponseDto> => {

    let response: ResponseDto;
    try {

        const FindAllCountriesWithStates: any = await CountryModel.findAll({
            include: [
                {
                    model: StateModel,
                    as: "states",
                    attributes: ["state_name", "short_name", "gst", "state_id"],
                },
            ],
            attributes: ["country_id", "name", "flag", "created_at", "updated_at"],
        });



        if (FindAllCountriesWithStates.length === 0) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("NO_COUNTRY_WITH_STATES_PRESENT"),
            });
        }

        const transformedData = FindAllCountriesWithStates.flatMap((country: { states: { state_name: any; short_name: any; gst: any; }[]; country_id: any; name: any; flag: any; }) => {
            return country.states.map((state: { state_name: any; short_name: any; gst: any; state_id: number; }) => ({
                country_id: country.country_id,
                name: country.name,
                flag: country.flag,
                state_name: state.state_name,
                short_name: state.short_name,
                gst: state.gst,
                state_id: state.state_id,
            }));
        });

        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("COUNTRIES_AND_STATES_ARE_PRESENT"),
            data: transformedData,
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

export const deleteState = async (countryId: number, stateId: number): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;
    try {

        const existingCountryAndState = await StateModel.findOne({
            where: {
                [Op.and]: [
                    { country_id: countryId },
                    { state_id: stateId }
                ]
            },
            transaction,
        });

        if (!existingCountryAndState) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 404,
                message: getResponseMessage("COUNTRY_OR_STATE_NOT_FOUND"),
            });
        }

        const deleteResult = await StateModel.destroy({
            where: {
                [Op.and]: [
                    { country_id: countryId },
                    { state_id: stateId }
                ]
            },
            transaction,
        });

        if (!deleteResult) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("STATE_DELETION_FAILED"),
            });
        }
        await transaction.commit();
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("STATE_DELETED_SUCCESSFULLY"),
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

export const editState = async (stateDetails: IStateCreation): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;

    try {
        const { country_id, state_id, short_name, state_name, gst } = stateDetails;
        const existingState = await StateModel.findOne({
            where: {
                [Op.and]: [
                    { country_id: country_id },
                    { state_id: state_id }
                ]
            },
            transaction,
        });

        if (!existingState) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 404,
                message: getResponseMessage("COUNTRY_OR_STATE_NOT_PRESENT"),
            });
        }


        const existingStateWithName = await StateModel.findOne({
            where: {
                [Op.and]: [
                    { country_id: country_id },
                    { state_name: state_name },
                    { state_id: { [Op.ne]: state_id } }
                ]
            },
            transaction,
        });

        if (existingStateWithName) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("STATE_NAME_MUST_BE_UNIQUE_FOR_COUNTRY"),
            });
        }


        const existingStateWithShortName = await StateModel.findOne({
            where: {
                [Op.and]: [
                    { country_id: country_id },
                    { short_name: short_name },
                    { state_id: { [Op.ne]: state_id } }
                ]
            },
            transaction,
        });

        if (existingStateWithShortName) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("SHORT_NAME_MUST_BE_UNIQUE_FOR_COUNTRY"),
            });
        }


        const stateUpdate = await StateModel.update(
            { short_name, state_name, gst },
            {
                where: {
                    [Op.and]: [
                        { country_id: country_id },
                        { state_id: state_id }
                    ]
                },
                transaction,
            }
        );

        if (stateUpdate[0] === 0) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("STATE_UPDATING_FAILED"),
                data: stateUpdate
            });
        }

        await transaction.commit();
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("STATE_UPDATED_SUCCESSFULLY")
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
