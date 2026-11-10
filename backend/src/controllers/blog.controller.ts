import { Request, Response } from "express";
import * as blogService from "../services/blog.service";
import asyncHandler from "../utils/asyncHandler";
import { toOptionalInt } from "../utils/sanitize";

export const listPublished = asyncHandler(async (req: Request, res: Response) => {
  const { category, search, page, limit } = req.query;
  const data = await blogService.listPublished({
    category: typeof category === "string" ? category : undefined,
    search: typeof search === "string" ? search : undefined,
    page: toOptionalInt(page),
    limit: toOptionalInt(limit)
  });
  res.status(200).json({ success: true, data });
});

export const listAll = asyncHandler(async (_req: Request, res: Response) => {
  const data = await blogService.listAll();
  res.status(200).json({ success: true, data });
});

export const getBySlug = asyncHandler(async (req: Request, res: Response) => {
  const data = await blogService.getBySlug(req.params.slug);
  res.status(200).json({ success: true, data });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = await blogService.create(req.body as blogService.CreateBlogInput);
  res.status(201).json({ success: true, message: "Blog post created", data });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const data = await blogService.update(req.params.id, req.body as blogService.UpdateBlogInput);
  res.status(200).json({ success: true, message: "Blog post updated", data });
});

export const togglePublish = asyncHandler(async (req: Request, res: Response) => {
  const data = await blogService.togglePublish(req.params.id);
  res.status(200).json({ success: true, message: "Blog publish state toggled", data });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await blogService.remove(req.params.id);
  res.status(200).json({ success: true, message: "Blog post deleted", data: null });
});

export default { listPublished, listAll, getBySlug, create, update, togglePublish, remove };
