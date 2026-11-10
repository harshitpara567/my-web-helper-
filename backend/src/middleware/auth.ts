import { NextFunction, Request, Response } from "express";
import { Admin } from "../models/Admin";
import ApiError from "../utils/ApiError";
import { verifyToken } from "../utils/token";

/** Verifies the bearer token and attaches the authenticated admin to the request. */
export async function protect(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Authentication token missing");
    }

    const token = header.slice("Bearer ".length).trim();
    if (!token) {
      throw ApiError.unauthorized("Authentication token missing");
    }

    const payload = verifyToken(token);
    const admin = await Admin.findById(payload.id).select("-password");
    if (!admin) {
      throw ApiError.unauthorized("Admin account no longer exists");
    }

    req.admin = { id: admin.id, email: admin.email, role: admin.role };
    next();
  } catch (error) {
    next(error);
  }
}

export default protect;
