import { ResponseDto, FunctionalResponseDto } from "@dtos/reusableDtos";

export const setSuccessResponse = function (response: ResponseDto) {
  if (!response) {
    return response;
  }

  const successResponse: ResponseDto = {
    status: true,
    statusCode: response.statusCode || 200,
  };

  if (response.message) {
    successResponse["message"] = response.message;
  }
  if (response.data) {
    successResponse["data"] = response.data;
  }

  return successResponse;
};

export const setErrorResponse = function (response: ResponseDto) {
  if (!response) {
    return response;
  }

  const errorResponse: ResponseDto = {
    status: false,
    statusCode: response.statusCode,
    message: response.message || getResponseMessage("SOMETHING_WRONG"),
  };

  if (response.data) {
    errorResponse["data"] = response.data;
  }

  if (response.error) {
    errorResponse["error"] = response.error.message || response.error;
  }

  return errorResponse;
};

export const sendResponse = (responseData: ResponseDto) => {
  let response: FunctionalResponseDto;
  if (responseData.status) {
    response = {
      api_status: responseData.statusCode,
      message: responseData.message,
    };
    if (responseData.data) {
      response = {
        api_status: responseData.statusCode || 200,
        message: responseData.message,
        data: responseData.data,
      };
    }
  } else {
    response = {
      api_status: responseData.statusCode || 500,
      error: responseData.error,
      message: responseData.message,
    };
    if (responseData.data) {
      response.data = responseData.data;
    }
    if (responseData.details) {
      response.detail = responseData.details;
    }
  }
  return response;
};

export const getResponseMessage = (message: string) => {
  const messageConstant: any = {
    SOMETHING_WRONG: "Something went wrong, Please try again",
    COUNTRY_ALREADY_EXISTS: "Country Already Exists",
    FAILED_TO_CREATE_COUNTRY: "Failed To Create The Country",
    COUNTRY_CREATED_SUCCESSFULLY: "Country Created Successfully",
    COUNTRY_NOT_PRESENT: "Country Not Present",
    STATE_CREATION_FAILED: "State Creation Failed",
    STATE_CREATED_SUCCESSFULLY: "State Created Successfully",
    NO_STATE_PRESENT: "No States Present for the selected Countries",
    STATES_ARE_PRESENT: "States are Present",
    UNABLE_TO_ADD_CITY: "Unable To Add City",
    CITY_CREATED_SUCCESSFULLY: "City Created Successfully",
    STATE_NOT_FOUND_OR_NOT_IN_COUNTRY: "State  Not Found Or Not In Country",
    // UNABLE_TO_ADD_CITY:"UNABLE_TO_ADD_CITY",
    NO_CITIES_PRESENT: "No Cities Present",
    CITIES_FOUND: "Cities Found",
    STATE_NOT_FOUND_OR_INVALID_FOR_COUNTRY: "STATE_NOT_FOUND_OR_INVALID_FOR_COUNTRY",
    NO_COUNTRY_FOUND: "No Countries Found",
    COUNTRY_FOUND: "Country Found",
    IMAGE_IS_REQUIRED: "Image Is Required",
    CATEGORY_ALREADY_EXISTS: "Category Already Exists",
    FAILED_TO_CREATE_CATEGORY: "Failed To Create Category",
    CATEGORY_CREATED_SUCCESSFULLY: "Category Created Successfully",
    CATEGORY_NOT_FOUND: "Category Not Found",
    CATEGORY_FOUND: "Category Found",
    SUBCATEGORY_CREATED_SUCCESSFULLY: "Sub Category Created Successfully",
    SUBCATEGORY_NOT_FOUND: "Sub category Not Found",
    SUBCATEGORY_DELETION_FAILED: "Subcategory Deletion Failed",
    SUBCATEGORY_DELETED_SUCCESSFULLY: "Subcategory Deleted Successfully",
    NO_COUNTRY_WITH_STATES_AND_CITIES_PRESENT: "No Country With States and Cities Present",
    COUNTRIES_STATES_AND_CITIES_ARE_PRESENT: "Countries States and Cities  Are Present",
    SUBCATEGORY_UPDATED_SUCCESSFULLY: "Subcategory Updated Successfully",
    FILES_MISMATCH: "Files Mismatch",
    SUBCATEGORY_ALREADY_EXISTS: "Subcategory Already Exists",
    SUBCATEGORIES_NOT_FOUND: "Subcategories Not Found",
    SUBCATEGORIES_FOUND: "Subcategories Found",
    SUBCATEGORIES_CREATED_SUCCESSFULLY:"Subcategories_Created_Successfully"
  };

  return messageConstant[message] || null;
};
