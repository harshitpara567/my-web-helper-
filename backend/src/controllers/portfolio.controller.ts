import { Request, Response } from "express";
import * as portfolioService from "../services/portfolio.service";
import asyncHandler from "../utils/asyncHandler";
import { toBoolean } from "../utils/sanitize";

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { featured, category } = req.query;
  const data = await portfolioService.list({
    featured: featured === undefined ? undefined : toBoolean(featured),
    category: typeof category === "string" ? category : undefined
  });
  res.status(200).json({ success: true, data });
});

export const getBySlug = asyncHandler(async (req: Request, res: Response) => {
  const data = await portfolioService.getBySlug(req.params.slug);
  res.status(200).json({ success: true, data });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = await portfolioService.create(req.body as portfolioService.PortfolioInput);
  res.status(201).json({ success: true, message: "Portfolio project created", data });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const data = await portfolioService.update(
    req.params.id,
    req.body as portfolioService.UpdatePortfolioInput
  );
  res.status(200).json({ success: true, message: "Portfolio project updated", data });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await portfolioService.remove(req.params.id);
  res.status(200).json({ success: true, message: "Portfolio project deleted", data: null });
});

export default { list, getBySlug, create, update, remove };
