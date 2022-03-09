import express from "express";
import {
  create,
  list,
  update,
  show,
  destroy,
} from "../controllers/user.controller";

const router: express.Router = express.Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
