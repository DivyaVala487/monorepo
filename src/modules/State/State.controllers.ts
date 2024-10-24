import { ResponseDto } from "@dtos/reusableDtos";
import { ICountryCreation } from "../../dtos/country.dto";
import { setErrorResponse, getResponseMessage, sendResponse } from "@services/responseServices";
import * as StateServices from "./State.services";
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


export const addState = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const stateDetails: IStateCreation = req.body;
        const schema = Joi.object()
            .options({})
            .keys({
                country_id: Joi.number().required().label("country_id"),
                state_name: Joi.string().required().label("state_name"),
                short_name: Joi.string().required().label("short_name"),
                gst: Joi.boolean().optional().label("gst")
            });


        const validateResult: ResponseDto = await schemaValidation(stateDetails, schema);
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }


        response = await StateServices.addState(stateDetails);
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


export const getAllStates = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        response = await StateServices.getAllStates();
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

export const deleteState = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const { stateId, countryId } = req.params;
        response = await StateServices.deleteState(Number(countryId), Number(stateId));

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


export const editState = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const stateDetails: IStateCreation = req.body;
        const schema = Joi.object().keys({
            country_id: Joi.number().required().label("country_id"),
            state_id: Joi.number().required().label("state_id"),
            short_name: Joi.string().optional().label("short_name"),
            state_name: Joi.string().optional().label("state_name"),
            gst: Joi.boolean().optional().label("gst")
        });

        const validateResult: ResponseDto = await schemaValidation(stateDetails, schema);
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }
        response = await StateServices.editState(stateDetails);
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