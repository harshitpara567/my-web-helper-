import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const data = await authService.login(email, password);
  res.status(200).json({ success: true, message: "Login successful", data });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.admin) {
    throw ApiError.unauthorized();
  }
  const data = await authService.getProfile(req.admin.id);
  res.status(200).json({ success: true, data });
});

export default { login, me };
