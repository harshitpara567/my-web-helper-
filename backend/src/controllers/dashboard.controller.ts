import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";
import asyncHandler from "../utils/asyncHandler";

export const getStats = asyncHandler(async (_req: Request, res: Response) => {
  const data = await dashboardService.getStats();
  res.status(200).json({ success: true, data });
});

export default { getStats };
