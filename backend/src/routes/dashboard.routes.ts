import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/stats", protect, dashboardController.getStats);

export default router;
