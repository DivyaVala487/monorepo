import { ResponseDto } from "@dtos/reusableDtos";
import { ICountryCreation } from "../../dtos/country.dto";
import { setErrorResponse, getResponseMessage, sendResponse } from "@services/responseServices";
import * as SubCatService from "./SubCategory.services";
import { Response } from "express";
import { Request } from "@dtos/reusableDtos";
import Joi from "joi";
import { schemaValidation } from "@utils/helperFunctions";
import { IStateCreation } from "@dtos/state.dtos";
import { ICityCreation } from "@dtos/city.dtos";
import { v2 as cloudinary } from "cloudinary";
import { ICategoryCreation } from "@dtos/category.dtos";
import { ISubcategoryCreation } from "@dtos/subcategory.dto";
import { Json } from "sequelize/types/utils";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const addSubCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const subcategories: string[] = Array.isArray(req.body.subcategories)
            ? req.body.subcategories
            : [req.body.subcategories];

        const files: Express.Multer.File[] = Array.isArray(req.files)
            ? (req.files as Express.Multer.File[])
            : req.files ? [req.files as unknown as Express.Multer.File] : [];

        const categoryDetails: any = req.body;


        const schema = Joi.object({
            category_id: Joi.number().required().label("Category ID"),
            subcategories: Joi.array().items(Joi.string()).required().label("Subcategories")
        });


        categoryDetails.subcategories = subcategories;


        const validateResult: ResponseDto = await schemaValidation(categoryDetails, schema);
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }


        const normalizedFiles = Array.isArray(files) ? files : (files ? [files] : []);


        if (normalizedFiles.length !== subcategories.length) {
            return res.json(setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("FILES_MISMATCH"),
            }));
        }


        const subCategoryDetailsArray = subcategories.map((subCategory, index: number) => ({
            sub_category_name: subCategory,
            icon: normalizedFiles[index],
            category_id: categoryDetails.category_id
        }));


        const serviceResponse = await SubCatService.addSubCategories(subCategoryDetailsArray);
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



export const getAllSubCategories = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        response = await SubCatService.getAllSubCategories();
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


export const deleteSubCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const { categoryId, subCategoryId } = req.params;
        response = await SubCatService.deleteSubCategory(Number(categoryId), Number(subCategoryId));
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


        response = await SubCatService.editSubCategory(subCategoryDetails, file);
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


export const editMultipleSubCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const subcategories: any[] = JSON.parse(req.body.subcategories)
            ? req.body.subcategories
            : [req.body.subcategories];

        console.log(subcategories, "subcategories");

        const files: Express.Multer.File[] = Array.isArray(req.files)
            ? (req.files as Express.Multer.File[])
            : req.files ? [req.files as unknown as Express.Multer.File] : [];

        console.log(files, "files");

        const categoryDetails: any = req.body;

        const schema = Joi.object({
            category_id: Joi.number().required().label("Category ID"),
            subcategories: Joi.array().items(Joi.object({
                sub_category_name: Joi.string().required().label("Subcategory Name"),
                subcategory_id: Joi.string().required().label("Subcategory Id")
            })).optional().label("Subcategories")
        });
        console.log(categoryDetails, "categoryDetails");
        const validateResult: ResponseDto = await schemaValidation(categoryDetails, schema);
        console.log(validateResult, "validateResult");
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }


        const subCategoryDetailsArray = subcategories.map((subCategory, index: number) => {
            const iconFile = files[index] || null;

            return {
                subcategory_id: subCategory.sub_category_id,
                sub_category_name: subCategory.sub_category_name,
                icon: iconFile,
                category_id: categoryDetails.category_id
            };
        });


        const validSubCategories = subCategoryDetailsArray.filter(subCat =>
            subCat.sub_category_name && (subCat.icon || subCat.icon === null)
        );

        console.log(validSubCategories, "validSubCategories");

        const serviceResponse = await SubCatService.editSubCategories(validSubCategories);
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


export const editingSubCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;

        const subcategories: { sub_category_name: string; subcategory_id: number }[] = Array.isArray(req.body.subcategories)
            ? req.body.subcategories
            : [req.body.subcategories];


        const files: Express.Multer.File[] = Array.isArray(req.files)
            ? (req.files as Express.Multer.File[])
            : req.files ? [req.files as unknown as Express.Multer.File] : [];

        const categoryDetails: any = req.body;

        console.log(categoryDetails, "categoryDetails");


        const schema = Joi.object({
            category_id: Joi.number().required().label("Category ID"),
            subcategories: Joi.array().items(
                Joi.object({
                    sub_category_name: Joi.string().required().label("Subcategory Name"),
                    subcategory_id: Joi.number().required().label("Subcategory ID")
                })
            ).required().label("Subcategories")
        });

        categoryDetails.subcategories = subcategories;


        const validateResult: ResponseDto = await schemaValidation(categoryDetails, schema);
        if (!validateResult.status) {
            response = sendResponse(validateResult);
            return res.json(response);
        }


        const normalizedFiles = Array.isArray(files) ? files : (files ? [files] : []);
        if (normalizedFiles.length !== subcategories.length) {
            return res.json(setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("FILES_MISMATCH"),
            }));
        }


        const subCategoryDetailsArray = subcategories.map((subCategory, index: number) => ({
            sub_category_name: subCategory.sub_category_name,
            icon: normalizedFiles[index],
            category_id: categoryDetails.category_id,
            subcategory_id: subCategory.subcategory_id
        }));

        console.log(subCategoryDetailsArray, "subCategoryDetailsArray");


        const serviceResponse = await SubCatService.editingSubCategory(subCategoryDetailsArray);
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
