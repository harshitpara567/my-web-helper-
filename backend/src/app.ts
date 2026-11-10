import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import * as swaggerUi from "swagger-ui-express";
import config from "./config/env";
import { swaggerSpec } from "./docs/swagger";
import { errorHandler, notFoundHandler } from "./middleware/error";
import { apiLimiter } from "./middleware/rateLimit";
import routes from "./routes";

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: config.corsOrigins, credentials: true }));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

if (!config.isProduction) {
  app.use(morgan("dev"));
}

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "My Web Helper API",
    data: {
      name: "My Web Helper API",
      version: "1.0.0",
      docs: "/api-docs",
      health: "/api/health"
    }
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", apiLimiter, routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
