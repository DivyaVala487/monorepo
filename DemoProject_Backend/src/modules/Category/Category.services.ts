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

export const addCategory = async (categoryDetails: ICountryCreation, file: Express.Multer.File): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;
    try {
        const { name } = categoryDetails;
        // const formattedName = name.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
        const slug = generateSlug(name);
        const existingCategory = await CategoryModel.findOne({
            where: { name: name },
            transaction,
        });
        if (existingCategory) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("CATEGORY_ALREADY_EXISTS"),
            });
        }
        const uploadResponse = await cloudinary.uploader.upload(file.path, {
            folder: "upload",
            allowed_formats: ["jpg", "jpeg", "png"]
        });
        const newCategory = await CategoryModel.create(
            {
                name: name,
                slug: slug,
                icon: uploadResponse.secure_url,
            },
            { transaction }
        );
        if (!newCategory) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("FAILED_TO_CREATE_CATEGORY"),
            });
        }
        await transaction.commit();
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("CATEGORY_CREATED_SUCCESSFULLY"),
            data: newCategory,
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

export const getAllCategory = async (): Promise<ResponseDto> => {
    let response: ResponseDto;
    try {
        const getAllCategory = await CategoryModel.findAll({

        });

        if (getAllCategory.length === 0) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("CATEGORY_NOT_FOUND"),
            });
        }
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("CATEGORY_FOUND"),
            data: getAllCategory,
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

export const editCategory = async (
    categoryDetails: ICategoryCreation,
    file?: Express.Multer.File
): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;

    try {
        const { category_id, name } = categoryDetails;
        const existingCategory = await CategoryModel.findOne({
            where: { category_id },
            transaction,
        });

        if (!existingCategory) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("CATEGORY_NOT_FOUND"),
            });
        }


        const existingCategoryWithName = await CategoryModel.findOne({
            where: {
                [Op.and]: [
                    { name },
                    { category_id: { [Op.ne]: category_id } }
                ]
            },
            transaction,
        });

        if (existingCategoryWithName) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("CATEGORY_NAME_MUST_BE_UNIQUE"),
            });
        }


        let imageUrl = null;
        if (file) {
            const uploadResponse = await cloudinary.uploader.upload(file.path, {
                folder: "upload",
                allowed_formats: ["jpg", "jpeg", "png"],
            });
            imageUrl = uploadResponse.secure_url;
        }


        const updatedCategory = await CategoryModel.update(
            { name, icon: imageUrl },
            {
                where: { category_id },
                transaction,
            }
        );

        if (updatedCategory[0] === 0) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("CATEGORY_UPDATING_FAILED"),
                data: updatedCategory,
            });
        }

        await transaction.commit();
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("CATEGORY_UPDATED_SUCCESSFULLY"),
            data: updatedCategory,
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

export const deleteCategory = async (categoryId: number): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;
    try {
        const existingCategory = await CategoryModel.findOne({
            where: {
                category_id: categoryId
            },
            transaction,
        });

        if (!existingCategory) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 404,
                message: getResponseMessage("CATEGORY_NOT_PRESENT"),
            });
        }

        const deleteResult = await CategoryModel.destroy({
            where: {
                category_id: categoryId
            },
            transaction,
        });

        if (!deleteResult) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("CATEGORY_DELETING_FAILED"),
            });
        }
        await transaction.commit();
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("CATEGORY_DELETED_SUCCESSFULLY"),
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
