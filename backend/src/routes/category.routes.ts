import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { protect } from "../middleware/auth";
import runValidation from "../middleware/validate";
import {
  createCategoryValidator,
  updateCategoryValidator
} from "../validators/category.validator";

const router = Router();

router.get("/", categoryController.list);
router.post("/", protect, createCategoryValidator, runValidation, categoryController.create);
router.put("/:id", protect, updateCategoryValidator, runValidation, categoryController.update);
router.delete("/:id", protect, categoryController.remove);

export default router;
