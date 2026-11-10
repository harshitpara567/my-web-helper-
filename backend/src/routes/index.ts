import { Request, Response, Router } from "express";
import authRoutes from "./auth.routes";
import blogRoutes from "./blog.routes";
import categoryRoutes from "./category.routes";
import dashboardRoutes from "./dashboard.routes";
import enquiryRoutes from "./enquiry.routes";
import portfolioRoutes from "./portfolio.routes";
import testimonialRoutes from "./testimonial.routes";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "My Web Helper API is running",
    data: { uptime: process.uptime(), timestamp: new Date().toISOString() }
  });
});

router.use("/auth", authRoutes);
router.use("/enquiries", enquiryRoutes);
router.use("/blogs", blogRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/categories", categoryRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
