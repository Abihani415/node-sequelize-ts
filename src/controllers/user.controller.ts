import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse, ErrorResponse, FailedResponse } from "../utils/types";
import User from "../models/user";
import UserProfile from "../models/userprofile";
import { getUserByPK } from "../services/user.service";
import bcryptjs from "bcryptjs";

const create = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  let response: SuccessResponse | ErrorResponse;
  let statusCode: StatusCodes;
  try {
    const { body } = req;
    const saltRound: number = parseInt(process.env.PWD_SALT!, 10);
    const salt: string = bcryptjs.genSaltSync(saltRound);
    const hash: string = bcryptjs.hashSync(body.password, salt);
    const user = await User.create({
      user_name: body.user_name,
      password: hash,
    });
    await user.createUser_profile({
      age: body.age,
    });
    const getUser = await getUserByPK(user.id);
    statusCode = StatusCodes.OK;
    response = {
      success: true,
      message: "user created successfully",
      data: getUser,
    };
  } catch (e) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const error = e as Error;
    response = {
      success: false,
      message: error.message,
      error,
    };
  }
  return res.status(statusCode).json(response);
};

const list = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  let response: SuccessResponse | ErrorResponse;
  let statusCode: StatusCodes;
  try {
    const users = await User.findAll({
      include: [{ model: UserProfile, as: "user_profile" }],
    });
    statusCode = StatusCodes.OK;
    response = {
      success: true,
      message: "users found successfully",
      data: { users, auth: req.user },
    };
  } catch (e) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const error = e as Error;
    response = {
      success: false,
      message: error.message,
      error,
    };
  }
  return res.status(statusCode).json(response);
};

const show = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  let response: SuccessResponse | ErrorResponse | FailedResponse;
  let statusCode: StatusCodes;
  try {
    const { id } = req.params;
    // const user = await User.findByPk(id);
    const user = await getUserByPK(parseInt(id, 10), true);
    if (!user) {
      statusCode = StatusCodes.OK;
      response = {
        success: false,
        message: "user not found",
      };
    } else {
      // const userProfile = await user.getUser_profile();
      statusCode = StatusCodes.BAD_REQUEST;
      response = {
        success: true,
        message: "user found successfully",
        data: user,
      };
    }
  } catch (e) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const error = e as Error;
    response = {
      success: false,
      message: error.message,
      error,
    };
  }
  return res.status(statusCode).json(response);
};
const update = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  let response: SuccessResponse | ErrorResponse;
  let statusCode: StatusCodes;
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await User.update(body, { where: { id } });
    statusCode = StatusCodes.OK;
    response = {
      success: true,
      message: "user updated successfully",
      data: user,
    };
  } catch (e) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const error = e as Error;
    response = {
      success: false,
      message: error.message,
      error,
    };
  }
  return res.status(statusCode).json(response);
};

const destroy = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  let response: SuccessResponse | ErrorResponse;
  let statusCode: StatusCodes;
  try {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });
    statusCode = StatusCodes.OK;
    response = {
      success: true,
      message: "user deleted successfully",
      data: user,
    };
  } catch (e) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const error = e as Error;
    response = {
      success: false,
      message: error.message,
      error,
    };
  }
  return res.status(statusCode).json(response);
};

export { create, list, show, update, destroy };
