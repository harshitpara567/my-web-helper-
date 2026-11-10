import { Router } from "express";
import * as enquiryController from "../controllers/enquiry.controller";
import { protect } from "../middleware/auth";
import runValidation from "../middleware/validate";
import {
  createEnquiryValidator,
  updateEnquiryStatusValidator
} from "../validators/enquiry.validator";

const router = Router();

router.post("/", createEnquiryValidator, runValidation, enquiryController.create);
router.get("/", protect, enquiryController.list);
router.patch(
  "/:id/status",
  protect,
  updateEnquiryStatusValidator,
  runValidation,
  enquiryController.updateStatus
);
router.delete("/:id", protect, enquiryController.remove);

export default router;
