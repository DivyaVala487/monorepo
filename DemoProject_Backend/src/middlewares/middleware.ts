import { Response, NextFunction } from "express";
import { Request, ResponseDto } from "@dtos/reusableDtos";
import jwt from "jsonwebtoken";
import { setErrorResponse, getResponseMessage, sendResponse } from "@services/responseServices";

export const authentication = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  let response: ResponseDto;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const access_token: string = process.env.ACCESS_SECRET_KEY;
  if (!token) {
    response = setErrorResponse({
      statusCode: 401,
      message: getResponseMessage("REQUIRED_TOKEN"),
    });
    response = sendResponse(response);
    return res.json(response);
  }
  try {
    const decoded = jwt.verify(token, access_token);
    req.user = decoded;
    next();
  } catch (error) {
    response = setErrorResponse({
      statusCode: error.statusCode,
      message: error.message || getResponseMessage("REQUIRED_VALID_TOKEN"),
    });
    response = sendResponse(response);
    return res.json(response);
  }
};
