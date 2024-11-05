import { ResponseDto } from "@dtos/reusableDtos";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { getResponseMessage, setErrorResponse, setSuccessResponse } from "@services/responseServices";
// import { emit } from "process";


export const schemaValidation = async (data: any, schema: any): Promise<ResponseDto> => {
    try {
        const options: any = {
            errors: {
                wrap: {
                    label: "",
                },
            },
        };
        const { error } = await schema.validate(data, options);
        let response: ResponseDto;
        if (error && error.details) {
            response = setErrorResponse({
                statusCode: 422,
                message: error.details[0].message || getResponseMessage("VALIDATION_ERROR"),
            });
            return response;
        }
        response = setSuccessResponse({ statusCode: 200, message: getResponseMessage("VALIDATION_SUCCESS") });
        return response;
    } catch (error) {
        const response: ResponseDto = setErrorResponse({
            statusCode: 500,
            message: getResponseMessage("SOMETHING_WRONG"),
            error: error,
            details: error,
        });
        return response;
    }
};

export const generateAccessToken = async (userDetails: any) => {
    const { first_name, last_name, email } = userDetails;
    const payload = {
        first_name,
        last_name,
        email,
    };
    const secretKey = process.env.ACCESS_SECRET_KEY;
    const accessTokenExpiryTime = process.env.ACCESS_TOKEN_EXPIRY_TIME;

    try {
        const jwtToken = jwt.sign(payload, secretKey, { expiresIn: accessTokenExpiryTime });
        return jwtToken;
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

export const generateRefreshToken = async (userDetails: any) => {
    const { first_name, last_name, email } = userDetails;
    const payload = {
        first_name,
        last_name,
        email,
    };
    const secretKey = process.env.REFRESH_SECRET_KEY;
    const refreshTokenExpiryTime = process.env.REFRESH_TOKEN_EXPIRY_TIME;

    try {
        const refreshToken = jwt.sign(payload, secretKey, { expiresIn: refreshTokenExpiryTime });
        return refreshToken;
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

export const generateOtp = async () => {
    let otp = 0;
    for (let i = 0; i < 6; i++) {
        otp = otp * 10 + Math.floor(Math.random() * 10);
    }
    return otp;
};


export const sendMail = async (email: string, otp: number) => {


    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_SENDER,
                pass: process.env.MAIL_PASSWORD,
            }
        });

        const mailOptions = {
            from: "your-email@gmail.com",
            to: email,
            subject: "Your OTP for SignUp",
            text: `Your OTP is: ${otp}`,
            html: `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your OTP</title>
              </head>
              <body>
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h2>One-Time Password (OTP) Email</h2>
                  <p>Your One-Time Password (OTP) is: <strong>${otp}</strong></p>
                  <p>This OTP is valid for a limited time. Please do not share it with anyone.</p>
                  <p>If you didn"t request this OTP, please ignore this email.</p>
                  <hr>
                  <p style="font-size: 0.8em;">This email was sent to you as part of our security measures.</p>
                </div>
              </body>
              </html>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return error;
            }
            else {
                return info.messageId;
            }
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




