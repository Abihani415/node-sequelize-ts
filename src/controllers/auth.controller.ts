import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  SuccessResponse,
  ErrorResponse,
  FailedResponse,
  UserRegister,
} from "../utils/types";
import User from "../models/user";
import { getUserByPK, getUserByFilter } from "../services/user.service";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  let response: SuccessResponse | ErrorResponse | FailedResponse;
  let statusCode: StatusCodes;
  try {
    const { body }: { body: UserRegister } = req;
    const saltRound: number = parseInt(process.env.PWD_SALT!, 10);
    const hash: string = bcryptjs.hashSync(body.password, saltRound);
    const user = await User.create({
      user_name: body.user_name,
      password: hash,
    });
    await user.createUser_profile({});
    const getUser = await getUserByPK(user.id);
    statusCode = StatusCodes.OK;
    response = {
      success: true,
      message: "user registerred successfully",
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

export const login = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  let response: SuccessResponse | ErrorResponse | FailedResponse;
  let statusCode: StatusCodes;
  try {
    const { body } = req;
    const checkUser = await getUserByFilter("user_name", body.user_name);
    if (checkUser) {
      const validPassword: boolean = bcryptjs.compareSync(
        body.password,
        checkUser.password
      );
      if (validPassword) {
        const user = await getUserByPK(checkUser.id);
        const token = jwt.sign({ data: user }, process.env.SECRET!, {
          expiresIn: "1h",
        });
        statusCode = StatusCodes.OK;
        response = {
          success: true,
          message: "user logged in successfully",
          data: { user, token },
        };
      } else {
        statusCode = StatusCodes.BAD_REQUEST;
        response = {
          success: false,
          message: "invalid password",
        };
      }
    } else {
      statusCode = StatusCodes.BAD_REQUEST;
      response = {
        success: false,
        message: "user not found",
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
