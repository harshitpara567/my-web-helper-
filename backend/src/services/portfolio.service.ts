import { IPortfolio, Portfolio } from "../models/Portfolio";
import ApiError from "../utils/ApiError";

export interface PortfolioInput {
  title: string;
  client: string;
  summary: string;
  description: string;
  category: string;
  slug?: string;
  coverImage?: string;
  images?: string[];
  technologies?: string[];
  results?: string[];
  featured?: boolean;
  year?: number;
  liveUrl?: string;
}

export type UpdatePortfolioInput = Partial<PortfolioInput>;

export async function list(filter: { featured?: boolean; category?: string } = {}): Promise<
  IPortfolio[]
> {
  const query: Record<string, unknown> = {};
  if (typeof filter.featured === "boolean") query.featured = filter.featured;
  if (filter.category) query.category = filter.category;

  return Portfolio.find(query).sort({ featured: -1, year: -1, createdAt: -1 });
}

export async function getBySlug(slug: string): Promise<IPortfolio> {
  const project = await Portfolio.findOne({ slug });
  if (!project) {
    throw ApiError.notFound("Portfolio project not found");
  }
  return project;
}

export async function create(input: PortfolioInput): Promise<IPortfolio> {
  return Portfolio.create(input);
}

export async function update(id: string, input: UpdatePortfolioInput): Promise<IPortfolio> {
  const project = await Portfolio.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true
  });
  if (!project) {
    throw ApiError.notFound("Portfolio project not found");
  }
  return project;
}

export async function remove(id: string): Promise<void> {
  const result = await Portfolio.findByIdAndDelete(id);
  if (!result) {
    throw ApiError.notFound("Portfolio project not found");
  }
}

export default { list, getBySlug, create, update, remove };
