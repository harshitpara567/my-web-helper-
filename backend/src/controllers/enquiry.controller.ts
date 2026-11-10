import { Request, Response } from "express";
import { EnquiryStatus } from "../models/ContactEnquiry";
import * as enquiryService from "../services/enquiry.service";
import asyncHandler from "../utils/asyncHandler";
import { toOptionalInt } from "../utils/sanitize";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = await enquiryService.create(req.body as enquiryService.EnquiryInput);
  res
    .status(201)
    .json({ success: true, message: "Thank you — your enquiry has been received.", data });
});

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { status, search, page, limit } = req.query;
  const data = await enquiryService.list({
    status: typeof status === "string" ? status : undefined,
    search: typeof search === "string" ? search : undefined,
    page: toOptionalInt(page),
    limit: toOptionalInt(limit)
  });
  res.status(200).json({ success: true, data });
});

export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body as { status: EnquiryStatus };
  const data = await enquiryService.updateStatus(req.params.id, status);
  res.status(200).json({ success: true, message: "Enquiry status updated", data });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await enquiryService.remove(req.params.id);
  res.status(200).json({ success: true, message: "Enquiry deleted", data: null });
});

export default { create, list, updateStatus, remove };
