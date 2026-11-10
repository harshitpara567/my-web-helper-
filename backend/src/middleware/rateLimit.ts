import { rateLimit } from "express-rate-limit";
import config from "../config/env";

export const apiLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  limit: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later."
  },
  skip: (req) => req.originalUrl.includes("/health")
});

export default apiLimiter;
