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
    IMAGE_IS_REQUIRED: "Image Is Required"
  };

  return messageConstant[message] || null;
};
