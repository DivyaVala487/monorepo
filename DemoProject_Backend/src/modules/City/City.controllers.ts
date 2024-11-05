import { Response } from "express";
import { Request, ResponseDto } from "@dtos/reusableDtos";
import Joi from "joi";
import { schemaValidation } from "@utils/helperFunctions";
import { IStateCreation } from "@dtos/state.dtos";
import { ICityCreation } from "@dtos/city.dtos";
import { v2 as cloudinary } from "cloudinary";
import { ICategoryCreation } from "@dtos/category.dtos";
import { ISubcategoryCreation } from "@dtos/subcategory.dto";
import { getResponseMessage, sendResponse, setErrorResponse } from "@services/responseServices";
import * as CityServices from "./City.services";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const addCity = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const cityDetails: ICityCreation = req.body;

        const schema = Joi.object()
            .options({})
            .keys({
                country_id: Joi.number().required().label("country_id"),
                state_id: Joi.number().required().label("state_id"),
                city_name: Joi.string().required().label("city_name")
            });


        const validateResult: ResponseDto = await schemaValidation(cityDetails, schema);
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }


        response = await CityServices.addCity(cityDetails);
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


export const getAllCities = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        // const cityDetails: ICityCreation = req.body;
        // const schema = Joi.object()
        //     .options({})
        //     .keys({
        //         country_id: Joi.number().required().label("Country_id"),
        //         state_id: Joi.number().required().label("state_id")
        //     });


        // const validateResult: ResponseDto = await schemaValidation(cityDetails, schema);
        // if (!validateResult.status) {
        //     response = sendResponse(validateResult);
        //     return res.json(response);
        // }


        response = await CityServices.getAllCities();
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

export const deleteCity = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const { cityId } = req.params;

        response = await CityServices.deleteCity(Number(cityId));

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


export const editCity = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const cityDetails: ICityCreation = req.body;
        const schema = Joi.object().keys({
            city_id: Joi.number().required().label("city_id"),
            city_name: Joi.string().optional().label("City Name"),
            state_id: Joi.number().required().label("State Id"),
            country_id: Joi.number().required().label("Country Id"),

        });
        const validateResult: ResponseDto = await schemaValidation(cityDetails, schema);
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }
        response = await CityServices.editCity(cityDetails);
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


export const getCities = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        response = await CityServices.getCities();
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