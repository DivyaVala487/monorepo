import { ResponseDto } from "@dtos/reusableDtos";
import { ICountryCreation } from "../../dtos/country.dto";
import { setErrorResponse, getResponseMessage, sendResponse } from "@services/responseServices";
import * as CategoryServices from "./Category.services";
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


export const addCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const categoryDetails: ICategoryCreation = req.body;
        const schema = Joi.object()
            .options({})
            .keys({
                name: Joi.string().required().label("Category Name")
            });
        const validateResult: ResponseDto = await schemaValidation(categoryDetails, schema);
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



        response = await CategoryServices.addCategory(categoryDetails, req.file);
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

export const getAllCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        response = await CategoryServices.getAllCategory();
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

export const editCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const categoryDetails: ICategoryCreation = req.body;

        const schema = Joi.object().keys({
            category_id: Joi.number().required().label("category_id"),
            name: Joi.string().optional().label("category_name"),
        });

        const validateResult: ResponseDto = await schemaValidation(categoryDetails, schema);
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }


        const file = req.file;


        response = await CategoryServices.editCategory(categoryDetails, file);
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


export const deleteCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const { categoryId } = req.params;

        response = await CategoryServices.deleteCategory(Number(categoryId));

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
