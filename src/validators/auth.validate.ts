import { check, ValidationChain } from "express-validator";
import { getUserByFilter } from "../services/user.service";

export const registerValidationRules = (): ValidationChain[] => {
  return [
    check("user_name")
      .exists()
      .withMessage("user_name Field is required")
      .bail()
      .isLength({ min: 3, max: 15 })
      .withMessage(
        "user_name should be of 3 character min and 15 character max"
      )
      .custom(async (value: string) => {
        const isUserExists = await getUserByFilter("user_name", value);
        if (isUserExists) {
          return Promise.reject("user_name is already in use");
        }
      }),
    check("password")
      .exists()
      .withMessage("Password Field is required")
      .isLength({ min: 8 })
      .withMessage("Password length should be greater then 8"),

    // check('name','Name Field should contains alphabatic characters').isAlpha(),
  ];
};

export const loginValidationRules = (): ValidationChain[] => {
  return [
    check("user_name")
      .exists()
      .withMessage("user_name Field is required")
      .bail()
      .isLength({ min: 3, max: 15 })
      .withMessage(
        "user_name should be of 3 character min and 15 character max"
      ),

    check("password")
      .exists()
      .withMessage("Password Field is required")
      .bail()
      .isLength({ min: 8 })
      .withMessage("Password length should be greater then 8"),

    // check('name','Name Field should contains alphabatic characters').isAlpha(),
  ];
};
