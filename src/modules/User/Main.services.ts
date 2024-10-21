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
import { generateSlug } from "../../reusablefunctions/reusablefunctions";

export const addCountry = async (countryDetails: ICountryCreation, file: Express.Multer.File): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;
    try {

        const { name } = countryDetails;


        const formattedName = name.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());


        const existingCountry = await CountryModel.findOne({
            where: { name: formattedName },
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
                name: formattedName,
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


export const addState = async (stateDetails: IStateCreation): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;
    try {

        const { country_id, state_name, short_name, gst } = stateDetails;
        const existingCountry = await CountryModel.findOne({
            where: { country_id: country_id },
            transaction,
        });

        if (!existingCountry) {

            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("COUNTRY_NOT_PRESENT"),
            });
        }

        const formattedName = state_name.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

        const FindState = await StateModel.findOne({
            where: {
                state_name: formattedName
            }
        });

        if (FindState) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("STATE_ALREADY_PRESENT"),
            });
        }
        const stateCreation = await StateModel.create(
            {
                country_id,
                short_name,
                state_name,
                gst
            },
            { transaction }
        );

        if (!stateCreation) {

            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("STATE_CREATION_FAILED"),
            });
        }


        await transaction.commit();


        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("STATE_CREATED_SUCCESSFULLY"),
            data: stateCreation,
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


export const getAllStates = async (): Promise<ResponseDto> => {

    let response: ResponseDto;
    try {

        const FindAllCountriesWithStates: any = await CountryModel.findAll({
            include: [
                {
                    model: StateModel,
                    as: "states",
                    attributes: ["state_name", "short_name", "gst", "state_id"],
                },
            ],
            attributes: ["country_id", "name", "flag", "created_at", "updated_at"], // Include country attributes
        });

        console.log(FindAllCountriesWithStates, "FindAllCountriesWithStates");

        if (FindAllCountriesWithStates.length === 0) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("NO_COUNTRY_WITH_STATES_PRESENT"),
            });
        }

        const transformedData = FindAllCountriesWithStates.flatMap((country: { states: { state_name: any; short_name: any; gst: any; }[]; country_id: any; name: any; flag: any; }) => {
            return country.states.map((state: { state_name: any; short_name: any; gst: any; state_id: number; }) => ({
                country_id: country.country_id,
                name: country.name,
                flag: country.flag,
                state_name: state.state_name,
                short_name: state.short_name,
                gst: state.gst,
                state_id: state.state_id,
            }));
        });

        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("COUNTRIES_AND_STATES_ARE_PRESENT"),
            data: transformedData,
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




export const addCity = async (data: any): Promise<ResponseDto> => {
    const { country_id, state_id, city_name } = data;
    let response: ResponseDto;
    try {

        const countryExists = await CountryModel.findOne({
            where: { country_id: country_id },
        });

        if (!countryExists) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("COUNTRY_NOT_PRESENT"),
            });
        }


        const stateExists = await StateModel.findOne({
            where: { state_id, country_id },
        });

        if (!stateExists) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("STATE_NOT_FOUND_OR_NOT_IN_COUNTRY"),
            });
        }


        const createCity = await CityModel.create({
            country_id,
            state_id,
            city_name,
        });

        if (!createCity) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("UNABLE_TO_ADD_CITY"),
            });
        }

        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("CITY_CREATED_SUCCESSFULLY"),
            data: createCity,
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


export const getAllCities = async (): Promise<ResponseDto> => {
    let response: ResponseDto;
    try {

        const FindAllCountriesWithStatesAndCities: any = await CountryModel.findAll({
            include: [
                {
                    model: StateModel,
                    as: "states",
                    attributes: ["state_name", "short_name", "gst"],
                    include: [
                        {
                            model: CityModel,
                            as: "cities1",
                            attributes: ["city_name"],
                        },
                    ],
                },
            ],
            attributes: ["country_id", "name", "flag", "created_at", "updated_at"],
        });

        console.log(FindAllCountriesWithStatesAndCities, "FindAllCountriesWithStatesAndCities");

        if (FindAllCountriesWithStatesAndCities.length === 0) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("NO_COUNTRY_WITH_STATES_AND_CITIES_PRESENT"),
            });
        }

        const transformedData = FindAllCountriesWithStatesAndCities.flatMap((country: {
            states: {
                state_name: any;
                short_name: any;
                gst: any;
                cities1: { city_name: any }[]; // Include cities association
            }[];
            country_id: any;
            name: any;
            flag: any;
        }) => {
            return country.states.flatMap((state: {
                state_name: any;
                short_name: any;
                gst: any;
                cities1: { city_name: any }[];
            }) => {
                return state.cities1.map((city: { city_name: any }) => ({
                    country_id: country.country_id,
                    country_name: country.name,
                    country_flag: country.flag,
                    state_name: state.state_name,
                    state_short_name: state.short_name,
                    state_gst: state.gst,
                    city_name: city.city_name,
                }));
            });
        });

        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("COUNTRIES_STATES_AND_CITIES_ARE_PRESENT"),
            data: transformedData,
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




export const addCategory = async (categoryDetails: ICountryCreation, file: Express.Multer.File): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    let response: ResponseDto;
    try {

        const { name } = categoryDetails;
        console.log(name, "names");


        const formattedName = name.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());


        const slug = generateSlug(name);

        const existingCategory = await CategoryModel.findOne({
            where: { name: formattedName },
            transaction,
        });

        console.log(existingCategory, "existingCategory");

        if (existingCategory) {
            await transaction.rollback();
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("CATEGORY_ALREADY_EXISTS"),
            });
        }

        console.log("before_upload");
        console.log("beforeUploading", file.path);
        const uploadResponse = await cloudinary.uploader.upload(file.path, {
            folder: "upload",
            allowed_formats: ["jpg", "jpeg", "png"]
        });
        console.log(file.path, "filepath");
        console.log("another");
        console.log(uploadResponse, "uploadResponse");

        const newCategory = await CategoryModel.create(
            {
                name: formattedName,
                slug: slug,
                icon: uploadResponse.secure_url,
            },
            { transaction }
        );

        console.log(newCategory, "newCategory");
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


export const getStates = async (): Promise<ResponseDto> => {
    let response: ResponseDto;
    try {
        // Fetch all states along with the associated country
        const FindAllStates = await StateModel.findAll({
            include: [
                {
                    model: CountryModel,
                    as: "country",
                    attributes: ["name"],
                },
            ],
            attributes: ["state_name", "short_name", "country_id"], // Use the correct column names here
        });

        // Check if no states are found
        if (FindAllStates.length === 0) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("NO_STATE_PRESENT"),
            });
        }

        // Transform the data to the desired format
        const countryMap: { [key: string]: any } = {};

        // Group states by country and ensure uniqueness
        FindAllStates.forEach((state: any) => {
            const countryName = state.country.name;
            const stateName = state.state_name; // Corrected from state.name to state.state_name
            const shortName = state.short_name; // Corrected from state.shortname to state.short_name

            // If the country is not already in the map, add it with empty sets for states and shortnames
            if (!countryMap[countryName]) {
                countryMap[countryName] = {
                    country: countryName,
                    states: new Set(),
                    shortnames: new Set(),
                };
            }

            // Add state name and shortname to the respective sets to ensure uniqueness
            if (stateName) {
                countryMap[countryName].states.add(stateName);
            }
            if (shortName) {
                countryMap[countryName].shortnames.add(shortName);
            }
        });

        // Convert sets to arrays and the map to an array of objects
        const formattedResult = Object.values(countryMap).map((entry: any) => ({
            country: entry.country,
            states: Array.from(entry.states),       // Convert the set to an array
            shortnames: Array.from(entry.shortnames), // Convert the set to an array
        }));

        // Return the success response with the formatted data
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("STATES_ARE_PRESENT"),
            data: formattedResult,
        });
    } catch (error) {
        // Return the error response in case of an exception
        const result: ResponseDto = setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error,
            details: error,
        });
        return result;
    }
};

export const getCities = async (): Promise<ResponseDto> => {
    let response: ResponseDto;
    try {
        // Fetch all countries with associated states and cities
        const FindAllCountries = await CountryModel.findAll({
            include: [
                {
                    model: StateModel,
                    as: "states", // Ensure alias is "states"
                    attributes: ["state_name", "state_id"],
                    include: [
                        {
                            model: CityModel,
                            as: "cities1", // Ensure alias is "cities"
                            attributes: ["city_name"],
                        },
                    ],
                },
            ],
            attributes: ["name"], // Get country name
        });

        // Check if any countries are found
        if (!FindAllCountries || FindAllCountries.length === 0) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("NO_COUNTRY_PRESENT"),
            });
        }

        // Prepare the final result format
        const result = FindAllCountries.map((country: any) => ({
            country: country?.name || "", // Country name
            states: country?.states?.map((state: any) => ({
                state_name: state?.state_name || "", // State name
                cities: state?.cities?.map((city: any) => city?.city_name) || [] // List of cities
            })) || [] // Ensure empty array if no states found
        }));

        // Return success response with the formatted data
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("COUNTRIES_ARE_PRESENT"),
            data: result,
        });
    } catch (error) {
        // Return error response in case of an exception
        return setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error,
            details: error,
        });
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
export const getAllSubCategories = async (): Promise<ResponseDto> => {
    let response: ResponseDto;
    try {
        const getAllSubCategories = await SubcategoryModel.findAll({
            include: [
                {
                    model: CategoryModel,
                    as: "category",
                    attributes: ["name", "icon"],
                }
            ],
        });
        if (getAllSubCategories.length === 0) {
            return setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("SUBCATEGORIES_NOT_FOUND"),
            });
        }
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("SUBCATEGORIES_FOUND"),
            data: getAllSubCategories,
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

