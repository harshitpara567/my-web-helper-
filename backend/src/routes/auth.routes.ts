import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { protect } from "../middleware/auth";
import runValidation from "../middleware/validate";
import { loginValidator } from "../validators/auth.validator";

const router = Router();

router.post("/login", loginValidator, runValidation, authController.login);
router.get("/me", protect, authController.me);

export default router;
