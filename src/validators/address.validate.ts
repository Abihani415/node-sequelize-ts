import { check, ValidationChain } from "express-validator";

export const addressCreateRules = (): ValidationChain[] => {
  return [
    check("line_1")
      .exists()
      .withMessage("Address Line 1 is required")
      .isLength({ min: 5 })
      .withMessage("Address Line 1 length should be greater than 5"),
    check("line_2")
      .isLength({ min: 5 })
      .withMessage("Address Line 2 length should be greater than 5"),
    check("city")
      .exists()
      .withMessage("City is required")
      .isLength({ min: 3 })
      .withMessage("City length should be greater than 3"),
    check("state")
      .exists()
      .withMessage("State is required")
      .isLength({ min: 2 })
      .withMessage("State length should be greater than 2"),
    check("country")
      .exists()
      .withMessage("Country is required")
      .isLength({ min: 3 })
      .withMessage("Country length should be greater than 3"),
    check("landmark")
      .exists()
      .withMessage("Landmark is required")
      .isLength({ min: 3 })
      .withMessage("Landmark length should be greater than 3"),
    check("pin")
      .exists()
      .withMessage("Pin is required")
      .isLength({ min: 3 })
      .withMessage("Pin length should be greater than 3"),
  ];
};
export const addressUpdateRules = (): ValidationChain[] => {
  return [
    check("line_1")
      .isLength({ min: 5 })
      .withMessage("Address Line 1 length should be greater than 5"),
    check("line_2")
      .isLength({ min: 5 })
      .withMessage("Address Line 2 length should be greater than 5"),
    check("city")
      .isLength({ min: 3 })
      .withMessage("City length should be greater than 3"),
    check("state")
      .isLength({ min: 2 })
      .withMessage("State length should be greater than 2"),
    check("country")
      .isLength({ min: 3 })
      .withMessage("Country length should be greater than 3"),
    check("landmark")
      .isLength({ min: 3 })
      .withMessage("Landmark length should be greater than 3"),
    check("pin")
      .isLength({ min: 3 })
      .withMessage("Pin length should be greater than 3"),
  ];
};
