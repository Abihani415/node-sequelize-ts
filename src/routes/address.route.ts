import { Router } from "express";
import { create, list } from "../controllers/address.controller";
import {
  addressCreateRules,
  addressUpdateRules,
} from "../validators/address.validate";
import validateRequest from "../validators/validateRequests";

const router: Router = Router();

router.post("/", addressCreateRules(), validateRequest, create);
router.get("/", list);

export default router;
