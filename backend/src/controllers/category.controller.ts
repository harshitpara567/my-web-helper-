import { Request, Response } from "express";
import { CategoryType } from "../models/Category";
import * as categoryService from "../services/category.service";
import asyncHandler from "../utils/asyncHandler";

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.query;
  const categoryType: CategoryType | undefined =
    type === "blog" || type === "portfolio" ? type : undefined;
  const data = await categoryService.list(categoryType);
  res.status(200).json({ success: true, data });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = await categoryService.create(req.body as categoryService.CategoryInput);
  res.status(201).json({ success: true, message: "Category created", data });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const data = await categoryService.update(
    req.params.id,
    req.body as categoryService.UpdateCategoryInput
  );
  res.status(200).json({ success: true, message: "Category updated", data });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await categoryService.remove(req.params.id);
  res.status(200).json({ success: true, message: "Category deleted", data: null });
});

export default { list, create, update, remove };
