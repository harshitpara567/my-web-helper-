import dotenv from "dotenv";

dotenv.config();

function readString(key: string, fallback: string): string {
  const value = process.env[key];
  return value && value.trim() !== "" ? value.trim() : fallback;
}

function readNumber(key: string, fallback: number): number {
  const raw = process.env[key];
  if (!raw || raw.trim() === "") return fallback;
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a valid number`);
  }
  return parsed;
}

export interface AdminConfig {
  name: string;
  email: string;
  password: string;
}

export interface AppConfig {
  port: number;
  nodeEnv: string;
  isProduction: boolean;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  corsOrigins: string[];
  rateLimitWindowMs: number;
  rateLimitMax: number;
  admin: AdminConfig;
}

const nodeEnv = readString("NODE_ENV", "development");

const config: AppConfig = {
  port: readNumber("PORT", 5000),
  nodeEnv,
  isProduction: nodeEnv === "production",
  mongoUri: readString("MONGODB_URI", "mongodb://127.0.0.1:27017/healthy_web_care"),
  jwtSecret: readString("JWT_SECRET", "healthy-web-care-dev-secret-change-me"),
  jwtExpiresIn: readString("JWT_EXPIRES_IN", "7d"),
  corsOrigins: readString("CORS_ORIGINS", "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0),
  rateLimitWindowMs: readNumber("RATE_LIMIT_WINDOW_MS", 15 * 60 * 1000),
  rateLimitMax: readNumber("RATE_LIMIT_MAX", 300),
  admin: {
    name: readString("ADMIN_NAME", "My Web Helper Admin"),
    email: readString("ADMIN_EMAIL", "admin@mywebhelper.com"),
    password: readString("ADMIN_PASSWORD", "Admin@12345")
  }
};

export default config;
