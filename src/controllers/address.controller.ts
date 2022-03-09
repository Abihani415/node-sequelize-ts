import { RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse, FailedResponse, ErrorResponse } from "../utils/types";
import Address, { AddressAttributes } from "../models/address";

export const create: RequestHandler = async (
  req,
  res
): Promise<Response<any, Record<string, any>>> => {
  let response: SuccessResponse | ErrorResponse;
  let statusCode: StatusCodes;
  try {
    const { body }: { body: AddressAttributes } = req;
    const address = await Address.create({
      ...body,
      user_id: req.user.id,
    });
    statusCode = StatusCodes.OK;
    response = {
      success: true,
      message: "address created successfully",
      data: address,
    };
  } catch (e) {
    const error = e as Error;
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    response = {
      success: false,
      message: error.message,
      error,
    };
  }
  return res.status(statusCode).json(response);
};

export const list: RequestHandler = async (
  req,
  res
): Promise<Response<any, Record<string, any>>> => {
  let response: SuccessResponse | ErrorResponse;
  let statusCode: StatusCodes;
  try {
    const addresses = await Address.findAll({
      where: {
        user_id: req.user.id,
      },
    });
    statusCode = StatusCodes.OK;
    response = {
      success: true,
      message: "address created successfully",
      data: addresses,
    };
  } catch (e) {
    const error = e as Error;
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    response = {
      success: false,
      message: error.message,
      error,
    };
  }
  return res.status(statusCode).json(response);
};
