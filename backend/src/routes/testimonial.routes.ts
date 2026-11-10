import { Router } from "express";
import * as testimonialController from "../controllers/testimonial.controller";
import { protect } from "../middleware/auth";
import runValidation from "../middleware/validate";
import {
  createTestimonialValidator,
  updateTestimonialValidator
} from "../validators/testimonial.validator";

const router = Router();

router.get("/", testimonialController.list);
router.post(
  "/",
  protect,
  createTestimonialValidator,
  runValidation,
  testimonialController.create
);
router.put(
  "/:id",
  protect,
  updateTestimonialValidator,
  runValidation,
  testimonialController.update
);
router.delete("/:id", protect, testimonialController.remove);

export default router;
