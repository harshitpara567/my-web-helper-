import app from "./app";
import { connectDB } from "./config/db";
import config from "./config/env";

async function start(): Promise<void> {
  await connectDB();

  const server = app.listen(config.port, () => {
    console.log(`[server] My Web Helper API running in ${config.nodeEnv} mode`);
    console.log(`[server] API:  http://localhost:${config.port}/api`);
    console.log(`[server] Docs: http://localhost:${config.port}/api-docs`);
  });

  const shutdown = (signal: string): void => {
    console.log(`[server] ${signal} received, shutting down gracefully`);
    server.close(() => process.exit(0));
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

process.on("unhandledRejection", (reason: unknown) => {
  console.error("[server] Unhandled promise rejection:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error: Error) => {
  console.error("[server] Uncaught exception:", error);
  process.exit(1);
});

start().catch((error: unknown) => {
  console.error("[server] Failed to start server:", error);
  process.exit(1);
});
