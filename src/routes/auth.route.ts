import express, { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import {
  registerValidationRules,
  loginValidationRules,
} from "../validators/auth.validate";
import validateRequest from "../validators/validateRequests";

const router: Router = express.Router();

router.post("/login", loginValidationRules(), validateRequest, login);
router.post("/register", registerValidationRules(), validateRequest, register);

export default router;
