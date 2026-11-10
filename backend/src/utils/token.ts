import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config/env";
import ApiError from "./ApiError";

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export function generateToken(payload: TokenPayload): string {
  const options: SignOptions = {
    expiresIn: config.jwtExpiresIn as SignOptions["expiresIn"]
  };
  return jwt.sign({ ...payload }, config.jwtSecret, options);
}

export function verifyToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (typeof decoded === "string") {
      throw ApiError.unauthorized("Invalid token payload");
    }
    return decoded as unknown as TokenPayload;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw ApiError.unauthorized("Invalid or expired authentication token");
  }
}

export default { generateToken, verifyToken };
