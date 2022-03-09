import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationErrorResponse } from "../utils/types";

export default (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: string[] = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  const response: ValidationErrorResponse = {
    success: false,
    message: "Validation Fails",
    error: extractedErrors,
  };
  console.log(111, response);
  return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(response);
};
