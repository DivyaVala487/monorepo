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
import { v2 as cloudinary } from "cloudinary";
import { ICategoryCreation } from "@dtos/category.dtos";
import { ISubcategoryCreation } from "@dtos/subcategory.dto";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
        if (!req.file) {
            return res.json(setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("IMAGE_IS_REQUIRED"),
            }));
        }


        response = await MainService.addCountry(countryDetails, req.file);
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
        response = await MainService.getAllStates();
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


        response = await MainService.getAllCities();
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
        response = await MainService.getAllCountries();
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


export const addCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const categoryDetails: ICategoryCreation = req.body;
        console.log(categoryDetails, "categoryDetails");
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
        // console.log(req.file , "request");


        response = await MainService.addCategory(categoryDetails, req.file);
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
        response = await MainService.getAllCategory();
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

export const addSubCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;

        const subcategories: string[] = req.body.subcategories;
        const files: Express.Multer.File[] = req.files as Express.Multer.File[];


        const categoryDetails: any = req.body;


        const schema = Joi.object({
            category_id: Joi.number().required().label("Category ID"),
            subcategories: Joi.array().items(Joi.string()).required().label("Subcategories")
        });

        const validateResult: ResponseDto = await schemaValidation(categoryDetails, schema);
        console.log(validateResult, "validateResult");
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }


        if (files.length !== subcategories.length) {
            return res.json(setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("FILES_MISMATCH"),
            }));
        }


        const subCategoryDetailsArray: any = subcategories.map((subCategory, index) => ({
            sub_category_name: subCategory,
            icon: files[index].path,
            category_id: categoryDetails.category_id
        }));




        const serviceResponse = await MainService.addSubCategories(subCategoryDetailsArray);
        return res.json(sendResponse(serviceResponse));

    } catch (error) {
        const result: ResponseDto = setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error,
            details: error,
        });
        return res.json(sendResponse(result));
    }
};
export const deleteSubCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const { categoryId, subCategoryId } = req.params;
        response = await MainService.deleteSubCategory(Number(categoryId), Number(subCategoryId));
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


export const editSubCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const subCategoryDetails: ISubcategoryCreation = req.body;
        console.log(subCategoryDetails, "subCategoryDetails");

        const schema = Joi.object().keys({
            category_id: Joi.number().required().label("category_id"),
            subcategory_id: Joi.number().required().label("subcategory_id"),
            sub_category_name: Joi.string().optional().label("sub_category_name"),
        });

        const validateResult: ResponseDto = await schemaValidation(subCategoryDetails, schema);
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }


        const file = req.file;


        response = await MainService.editSubCategory(subCategoryDetails, file);
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



export const getStates = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        response = await MainService.getStates();
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



        response = await MainService.getCities();
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

export const getAllSubCategories = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;



        response = await MainService.getAllSubCategories();
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