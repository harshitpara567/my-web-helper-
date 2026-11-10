import { FilterQuery } from "mongoose";
import { ContactEnquiry, EnquiryStatus, IContactEnquiry } from "../models/ContactEnquiry";
import ApiError from "../utils/ApiError";

export interface EnquiryInput {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
}

export interface EnquiryListFilter {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function create(input: EnquiryInput): Promise<IContactEnquiry> {
  return ContactEnquiry.create(input);
}

export async function list(filter: EnquiryListFilter = {}): Promise<IContactEnquiry[]> {
  const query: FilterQuery<IContactEnquiry> = {};

  if (filter.status) {
    query.status = filter.status;
  }
  if (filter.search && filter.search.trim() !== "") {
    const regex = new RegExp(escapeRegex(filter.search.trim()), "i");
    query.$or = [{ name: regex }, { email: regex }, { company: regex }, { message: regex }];
  }

  const page = filter.page && filter.page > 0 ? filter.page : 1;
  const limit = filter.limit && filter.limit > 0 ? filter.limit : 100;

  return ContactEnquiry.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
}

export async function updateStatus(id: string, status: EnquiryStatus): Promise<IContactEnquiry> {
  const enquiry = await ContactEnquiry.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
  if (!enquiry) {
    throw ApiError.notFound("Enquiry not found");
  }
  return enquiry;
}

export async function remove(id: string): Promise<void> {
  const result = await ContactEnquiry.findByIdAndDelete(id);
  if (!result) {
    throw ApiError.notFound("Enquiry not found");
  }
}

export async function countByStatus(): Promise<Record<string, number>> {
  const rows = await ContactEnquiry.aggregate<{ _id: string; count: number }>([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);
  return rows.reduce<Record<string, number>>((acc, row) => {
    acc[row._id] = row.count;
    return acc;
  }, {});
}

export default { create, list, updateStatus, remove, countByStatus };
