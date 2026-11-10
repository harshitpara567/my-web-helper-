import { Router } from "express";
import * as blogController from "../controllers/blog.controller";
import { protect } from "../middleware/auth";
import runValidation from "../middleware/validate";
import { createBlogValidator, updateBlogValidator } from "../validators/blog.validator";

const router = Router();

router.get("/", blogController.listPublished);
router.get("/admin/all", protect, blogController.listAll);
router.get("/:slug", blogController.getBySlug);
router.post("/", protect, createBlogValidator, runValidation, blogController.create);
router.put("/:id", protect, updateBlogValidator, runValidation, blogController.update);
router.patch("/:id/publish", protect, blogController.togglePublish);
router.delete("/:id", protect, blogController.remove);

export default router;
