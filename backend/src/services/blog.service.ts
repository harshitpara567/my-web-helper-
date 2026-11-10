import { FilterQuery } from "mongoose";
import { Blog, BlogStatus, IBlog, IBlogSeo } from "../models/Blog";
import ApiError from "../utils/ApiError";

export interface BlogListFilter {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateBlogInput {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  slug?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  status?: BlogStatus;
  seo?: Partial<IBlogSeo>;
}

export type UpdateBlogInput = Partial<CreateBlogInput>;

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function listPublished(filter: BlogListFilter = {}): Promise<IBlog[]> {
  const query: FilterQuery<IBlog> = { status: "published" };

  if (filter.category) query.category = filter.category;
  if (filter.search && filter.search.trim() !== "") {
    const regex = new RegExp(escapeRegex(filter.search.trim()), "i");
    query.$or = [{ title: regex }, { excerpt: regex }, { content: regex }];
  }

  const page = filter.page && filter.page > 0 ? filter.page : 1;
  const limit = filter.limit && filter.limit > 0 ? filter.limit : 100;

  return Blog.find(query)
    .sort({ publishedAt: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
}

export async function listAll(): Promise<IBlog[]> {
  return Blog.find().sort({ createdAt: -1 });
}

export async function getBySlug(slug: string, onlyPublished = true): Promise<IBlog> {
  const query: FilterQuery<IBlog> = { slug };
  if (onlyPublished) query.status = "published";

  const blog = await Blog.findOne(query);
  if (!blog) {
    throw ApiError.notFound("Blog post not found");
  }
  return blog;
}

export async function create(input: CreateBlogInput): Promise<IBlog> {
  return Blog.create(input);
}

export async function update(id: string, input: UpdateBlogInput): Promise<IBlog> {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw ApiError.notFound("Blog post not found");
  }

  const { seo, ...rest } = input;
  Object.assign(blog, rest);

  if (seo) {
    blog.seo = {
      metaTitle: seo.metaTitle ?? blog.seo.metaTitle,
      metaDescription: seo.metaDescription ?? blog.seo.metaDescription,
      keywords: seo.keywords ?? blog.seo.keywords
    };
  }

  await blog.save();
  return blog;
}

export async function togglePublish(id: string): Promise<IBlog> {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw ApiError.notFound("Blog post not found");
  }

  blog.status = blog.status === "published" ? "draft" : "published";
  if (blog.status === "published") {
    blog.publishedAt = new Date();
  }

  await blog.save();
  return blog;
}

export async function remove(id: string): Promise<void> {
  const result = await Blog.findByIdAndDelete(id);
  if (!result) {
    throw ApiError.notFound("Blog post not found");
  }
}

export default { listPublished, listAll, getBySlug, create, update, togglePublish, remove };
