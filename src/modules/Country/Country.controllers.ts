import { ResponseDto } from "@dtos/reusableDtos";
import { ICountryCreation } from "../../dtos/country.dto";
import { setErrorResponse, getResponseMessage, sendResponse } from "@services/responseServices";
import * as CountryServices from "./Country.services";
import { Response } from "express";
import { Request } from "@dtos/reusableDtos";
import Joi from "joi";
import { schemaValidation } from "@utils/helperFunctions";
import { IStateCreation } from "@dtos/state.dtos";
import { ICityCreation } from "@dtos/city.dtos";
import { v2 as cloudinary } from "cloudinary";
import { ICategoryCreation } from "@dtos/category.dtos";
import { ISubcategoryCreation } from "@dtos/subcategory.dto";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const addCountry = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const countryDetails: ICountryCreation = req.body;
        const schema = Joi.object()
            .options({})
            .keys({
                name: Joi.string().required().label("Country Name"),
            });

        const validateResult: ResponseDto = await schemaValidation(countryDetails, schema);
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }
        if (!req.file) {
            return res.json(setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("IMAGE_IS_REQUIRED"),
            }));
        }


        response = await CountryServices.addCountry(countryDetails, req.file);
        response = sendResponse(response);
        return res.json(response);
    } catch (error) {
        let result: ResponseDto = setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error,
            details: error,
        });
        result = sendResponse(result);
        return res.json(result);
    }
};


export const getAllCountries = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        response = await CountryServices.getAllCountries();
        response = sendResponse(response);
        return res.json(response);
    } catch (error) {
        let result: ResponseDto = setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error,
            details: error,
        });
        result = sendResponse(result);
        return res.json(result);
    }
};

export const deleteCountry = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const { countryId } = req.params;
        response = await CountryServices.deleteCountry(Number(countryId));
        response = sendResponse(response);
        return res.json(response);
    } catch (error) {
        let result: ResponseDto = setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error,
            details: error,
        });
        result = sendResponse(result);
        return res.json(result);
    }
};

export const editCountry = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const countryDetails: ICountryCreation = req.body;
        console.log(countryDetails, "countryDetails");
        // const schema = Joi.object().keys({
        //     country_id: Joi.number().required().label("country_id"),
        //     name: Joi.string().optional().label("country_name"),
        // });
        const schema = Joi.object()
            .options({})
            .keys({
                country_id: Joi.number().optional().label("country_id"),
                name: Joi.string().optional().label("country_name"),
            });

        console.log(schema, "schema");

        const validateResult: ResponseDto = await schemaValidation(countryDetails, schema);
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }
        const file = req.file;
        response = await CountryServices.editCountry(countryDetails, file);
        response = sendResponse(response);
        return res.json(response);
    } catch (error) {
        let result: ResponseDto = setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error,
            details: error,
        });
        result = sendResponse(result);
        return res.json(result);
    }
};