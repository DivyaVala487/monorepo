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


export const addSubCategories = async (
    subCategoryDetailsArray: { category_id: number, sub_category_name: any, icon: any }[]
): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;
    try {
        const createdSubCategories = [];
        for (const subCategoryDetails of subCategoryDetailsArray) {
            const { category_id, sub_category_name, icon } = subCategoryDetails;
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


            const existingSubCategory = await SubcategoryModel.findOne({
                where: {
                    category_id,
                    sub_category_name,
                },
                transaction,
            });

            if (existingSubCategory) {
                await transaction.rollback();
                return setErrorResponse({
                    statusCode: 400,
                    message: getResponseMessage("SUBCATEGORY_ALREADY_EXISTS"),
                });
            }


            let uploadedIconUrl = null;
            if (icon && icon.path) {
                const uploadResponse = await cloudinary.uploader.upload(icon.path, {
                    folder: "upload",
                    allowed_formats: ["jpg", "jpeg", "png"],
                });
                uploadedIconUrl = uploadResponse.secure_url;
            }


            const createdSubCategory = await SubcategoryModel.create(
                {
                    category_id,
                    sub_category_name,
                    icon: uploadedIconUrl || "",
                },
                { transaction }
            );


            createdSubCategories.push({
                sub_category_name: createdSubCategory.get("sub_category_name"),
                sub_category_id: createdSubCategory.get("subcategory_id"),
                icon: uploadedIconUrl || "",
            });
        }
        await transaction.commit();
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("SUBCATEGORIES_CREATED_SUCCESSFULLY"),
            data: createdSubCategories,
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


export const getAllSubCategories = async (): Promise<ResponseDto> => {
    let response: ResponseDto;
    try {

        const getAllSubCategories = await SubcategoryModel.findAll({
            include: [
                {
                    model: CategoryModel,
                    as: "category",
                    attributes: ["category_id", "name", "icon"],
                }
            ],
            attributes: ["subcategory_id", "category_id", "sub_category_name", "icon"],
        });


        const categoryMap: Record<string, any> = {};

        getAllSubCategories.forEach((subcategory: any) => {
            const categoryId = subcategory.category.category_id;
            const categoryName = subcategory.category.name;
            const categoryIcon = subcategory.category.icon;

            if (!categoryMap[categoryId]) {
                categoryMap[categoryId] = {
                    category_id: categoryId,
                    category_name: categoryName,
                    category_icon: categoryIcon,
                    subcategory: [],
                };
            }


            categoryMap[categoryId].subcategory.push({
                subcategory_id: subcategory.subcategory_id,
                subcategory_name: subcategory.sub_category_name,
                subcategory_icon: subcategory.icon,
            });
        });


        const formattedResponse = Object.values(categoryMap);

        if (formattedResponse.length === 0) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("SUBCATEGORIES_NOT_FOUND"),
            });
        }

        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("SUBCATEGORIES_FOUND"),
            data: formattedResponse,
        });
    } catch (error) {
        return setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error,
            details: error,
        });
    }
};




export const deleteSubCategory = async (categoryId: number, subCategoryId: number): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;

    try {

        const existingSubCategory = await SubcategoryModel.findOne({
            where: {
                [Op.and]: [
                    { subcategory_id: subCategoryId },
                    { category_id: categoryId }
                ]
            },
            transaction,
        });

        if (!existingSubCategory) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 404,
                message: getResponseMessage("SUBCATEGORY_NOT_FOUND"),
            });
        }


        const deleteResult = await SubcategoryModel.destroy({
            where: {
                [Op.and]: [
                    { subcategory_id: subCategoryId },
                    { category_id: categoryId }
                ]
            },
            transaction,
        });

        if (!deleteResult) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("SUBCATEGORY_DELETION_FAILED"),
            });
        }

        await transaction.commit();
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("SUBCATEGORY_DELETED_SUCCESSFULLY"),
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

export const editSubCategory = async (
    subCategoryDetails: ISubcategoryCreation,
    file?: Express.Multer.File
): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;

    try {
        const { category_id, subcategory_id, sub_category_name } = subCategoryDetails;


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


        const existingSubcategory = await SubcategoryModel.findOne({
            where: {
                [Op.and]: [
                    { subcategory_id },
                    { category_id }
                ]
            },
            transaction,
        });

        if (!existingSubcategory) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("SUBCATEGORY_NOT_FOUND"),
            });
        }


        const updateData: any = {
            sub_category_name,
        };
        if (file) {
            const uploadResponse = await cloudinary.uploader.upload(file.path, {
                folder: "upload",
                allowed_formats: ["jpg", "jpeg", "png"],
            });
            updateData.icon = uploadResponse.secure_url;
        }


        await SubcategoryModel.update(updateData, {
            where: {
                [Op.and]: [
                    { subcategory_id },
                    { category_id }
                ]
            },
            transaction,
        });

        await transaction.commit();

        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("SUBCATEGORY_UPDATED_SUCCESSFULLY"),
            data: { ...existingSubcategory.toJSON(), ...updateData },
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