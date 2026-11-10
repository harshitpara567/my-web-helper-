import { Document, Schema, model } from "mongoose";
import { slugify } from "../utils/slug";

export type BlogStatus = "draft" | "published";

export interface IBlogSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category?: string;
  tags: string[];
  author: string;
  status: BlogStatus;
  publishedAt?: Date;
  readingTime: number;
  seo: IBlogSeo;
  createdAt: Date;
  updatedAt: Date;
}

const seoSchema = new Schema<IBlogSeo>(
  {
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    keywords: { type: [String], default: [] }
  },
  { _id: false }
);

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: { type: String, trim: true },
    category: { type: String, trim: true },
    tags: { type: [String], default: [] },
    author: { type: String, required: true, trim: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
    readingTime: { type: Number, default: 0 },
    seo: { type: seoSchema, default: () => ({ keywords: [] }) }
  },
  { timestamps: true }
);

blogSchema.index({ title: "text", excerpt: "text", content: "text" });

function computeReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter((word) => word.length > 0).length;
  return Math.max(1, Math.ceil(words / 200));
}

blogSchema.pre("validate", function () {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }
  if ((!this.readingTime || this.readingTime <= 0) && this.content) {
    this.readingTime = computeReadingTime(this.content);
  }
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

export const Blog = model<IBlog>("Blog", blogSchema);
export default Blog;
