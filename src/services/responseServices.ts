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
    ARTICLES_NOT_FOUND: "Articles not found",
    ARTICLES_FOUND: "Articles found",
    INTERNSHIPS_FOUND: "Internships found",
    INTERNSHIPS_NOT_FOUND: "Internships not found",
    TOOLS_FOUND: "Tools found",
    TOOLS_NOT_FOUND: "Tools not found",
    GAMES_FOUND: "Games found",
    GAMES_NOT_FOUND: "Games not found",
    SLIDERS_NOT_FOUND: "Sliders not found",
    SLIDERS_FOUND: "Sliders found",
    VALUE_NOT_FOUND: " Value not found",
    VALUE_FOUND: "Value found",
    DATA_FOUND: "Data found",
    DATA_NOT_FOUND: "Data not found",
    VALIDATION_ERROR: "Validation error",
    VALIDATION_SUCCESS: "Validation success",
    USER_NOT_REGISTERED: "Not registered user",
    UNIQUE_EMAIL: "Unique Email",
    REGISTRATION_SUCCESS_AND_EMAIL_SENT: "Registration Success And Email Sent",
    EMAIL_ALREADY_EXIST: "Email Already exists",
    REGISTRATION_FAILED: "Registration failed",
    INVALID_PASSWORD: "Invalid password",
    LOGIN_SUCCESS: "Login success",
    INVAILD_REFRESH_TOKEN: "Invalid refresh token",
    TOKEN_GENERATED_AGAIN: "Token generated again",
    EMAIL_NOT_SEND: "Email not send",
    OTP_VERIFIED_SUCCESSFULLY: "Otp verified successfully",
    INVALID_OTP: "Invalid otp",
    UNABLE_TO_CANCEL: "Unable to cancel",
    CANCELED_SUCCESSFULLY: "Canceled Successfully",
    EMAIL_NOT_FOUND: "Email Not Found",
    UNABLE_TO_CREATE_DATA: "Unable To Insert Data",
    BASIC_DETAILS_UPDATED_SUCCESSFULLY: "Basic Details Update Successfully",
    EXPERIENCE_DETAILS_UPDATED_SUCCESSFULLY: "Experience Details Update Succesfully",
    EDUCATION_DETAILS_UPDATED_SUCCESSFULLY: "Education Details updated Successfully",
    USER_NOT_FOUND: "User Not Found",
    UNABLE_TO_FIND_THE_FOLLOWERS: "Unable To Find The Followers",
    FOUND_PEOPLE_TO_FOLLOW: "Found People To Follow",
    FOUND_LEFT_CARD: "Found the left card",
    POST_CREATED_SUCCESSFULLY: "Post Created Successfully"



  };

  return messageConstant[message] || null;
};
