import { Request, Response } from "express";
import * as testimonialService from "../services/testimonial.service";
import asyncHandler from "../utils/asyncHandler";
import { toBoolean } from "../utils/sanitize";

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { featured } = req.query;
  const data = await testimonialService.list({
    featured: featured === undefined ? undefined : toBoolean(featured)
  });
  res.status(200).json({ success: true, data });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = await testimonialService.create(req.body as testimonialService.TestimonialInput);
  res.status(201).json({ success: true, message: "Testimonial created", data });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const data = await testimonialService.update(
    req.params.id,
    req.body as testimonialService.UpdateTestimonialInput
  );
  res.status(200).json({ success: true, message: "Testimonial updated", data });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await testimonialService.remove(req.params.id);
  res.status(200).json({ success: true, message: "Testimonial deleted", data: null });
});

export default { list, create, update, remove };
