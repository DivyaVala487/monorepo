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

export const addCountry = async (countryDetails: ICountryCreation, file: Express.Multer.File): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;
    try {

        const { name } = countryDetails;


        // const formattedName = name.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());


        const existingCountry = await CountryModel.findOne({
            where: { name: name },
            transaction,
        });

        if (existingCountry) {

            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("COUNTRY_ALREADY_EXISTS"),
            });
        }

        const uploadResponse = await cloudinary.uploader.upload(file.path, {
            folder: "uploads",
            allowed_formats: ["jpg", "jpeg", "png"]
        });


        const newCountry = await CountryModel.create(
            {
                name: name,
                flag: uploadResponse.secure_url,
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

export const getAllCountries = async (): Promise<ResponseDto> => {

    let response: ResponseDto;
    try {
        const getAllCountires = await CountryModel.findAll({

        });

        if (getAllCountires.length === 0) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("NO_COUNTRY_FOUND"),
            });
        }
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("COUNTRY_FOUND"),
            data: getAllCountires,
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


export const deleteCountry = async (countryId: number): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;
    try {

        const existingCountry = await CountryModel.findOne({
            where: {
                country_id: countryId
            },
            transaction,
        });

        if (!existingCountry) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 404,
                message: getResponseMessage("COUNTRY_NOT_PRESENT"),
            });
        }


        const deleteResult = await CountryModel.destroy({
            where: {
                country_id: countryId
            },
            transaction,
        });

        if (!deleteResult) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("COUNTRY_DELETION_FAILED"),
            });
        }

        await transaction.commit();
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("COUNTRY_DELETED_SUCCESSFULLY"),
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

export const editCountry = async (countryDetails: ICountryCreation, file: Express.Multer.File): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;
    try {
        const { country_id, name } = countryDetails;

        const existingCountry = await CountryModel.findOne({
            where: { country_id },
        });


        if (!existingCountry) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 404,
                message: getResponseMessage("COUNTRY_NOT_PRESENT"),
            });
        }


        let flagUrl = "";
        if (file) {

            const uploadResponse = await cloudinary.uploader.upload(file.path, {
                folder: "uploads",
                allowed_formats: ["jpg", "jpeg", "png"]
            });
            flagUrl = uploadResponse.secure_url;
        }

        const countryUpdate = await CountryModel.update(
            {
                name, flag: flagUrl,
            },
            {
                where: {
                    country_id,
                },
            }
        );

        if (!countryUpdate) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("COUNTRY_UPDATING_FAILED"),
            });
        }


        await transaction.commit();
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("COUNTRY_UPDATED_SUCCESSFULLY")
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