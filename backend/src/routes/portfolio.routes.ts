import { Router } from "express";
import * as portfolioController from "../controllers/portfolio.controller";
import { protect } from "../middleware/auth";
import runValidation from "../middleware/validate";
import {
  createPortfolioValidator,
  updatePortfolioValidator
} from "../validators/portfolio.validator";

const router = Router();

router.get("/", portfolioController.list);
router.get("/:slug", portfolioController.getBySlug);
router.post(
  "/",
  protect,
  createPortfolioValidator,
  runValidation,
  portfolioController.create
);
router.put(
  "/:id",
  protect,
  updatePortfolioValidator,
  runValidation,
  portfolioController.update
);
router.delete("/:id", protect, portfolioController.remove);

export default router;
