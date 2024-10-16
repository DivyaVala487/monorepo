import { ResponseDto } from "@dtos/reusableDtos";
import { ICountryCreation } from "../../dtos/country.dto";
import { setErrorResponse, getResponseMessage, sendResponse } from "@services/responseServices";
import * as MainService from "./Main.services";
import { Response } from "express";
import { Request } from "@dtos/reusableDtos";
import Joi from "joi";
import { schemaValidation } from "@utils/helperFunctions";
import { IStateCreation } from "@dtos/state.dtos";
import { ICityCreation } from "@dtos/city.dtos";


// for adding the  country

export const addCountry = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const countryDetails: ICountryCreation = req.body;
        console.log(countryDetails, "Country Details");
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


        response = await MainService.addCountry(countryDetails);
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

// for adding the state
export const addState = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const stateDetails: IStateCreation = req.body;
        console.log(stateDetails, "Country Details");
        const schema = Joi.object()
            .options({})
            .keys({
                country_id: Joi.number().required().label("country_id"),
                state_name: Joi.string().required().label("state_name"),
                short_name: Joi.string().required().label("short_name"),
                gst: Joi.boolean().required().label("gst")
            });


        const validateResult: ResponseDto = await schemaValidation(stateDetails, schema);
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }


        response = await MainService.addState(stateDetails);
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
        const country_id: number = req.body;

        const schema = Joi.object()
            .options({})
            .keys({
                country_id: Joi.number().required().label("country_id"),
            });


        const validateResult: ResponseDto = await schemaValidation(country_id, schema);
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }


        response = await MainService.getAllStates(country_id);
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


        response = await MainService.addCity(cityDetails);
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
        const cityDetails: ICityCreation = req.body;
        const schema = Joi.object()
            .options({})
            .keys({
                country_id: Joi.number().required().label("Country_id"),
                state_id: Joi.number().required().label("state_id")
            });


        const validateResult: ResponseDto = await schemaValidation(cityDetails, schema);
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }


        response = await MainService.getAllCities(cityDetails);
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

