import { Document, Schema, model } from "mongoose";
import { slugify } from "../utils/slug";

export interface IPortfolio extends Document {
  title: string;
  slug: string;
  client: string;
  summary: string;
  description: string;
  coverImage?: string;
  images: string[];
  category: string;
  technologies: string[];
  results: string[];
  featured: boolean;
  year?: number;
  liveUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const portfolioSchema = new Schema<IPortfolio>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true, lowercase: true, trim: true },
    client: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    coverImage: { type: String, trim: true },
    images: { type: [String], default: [] },
    category: { type: String, required: true, trim: true },
    technologies: { type: [String], default: [] },
    results: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    year: { type: Number },
    liveUrl: { type: String, trim: true }
  },
  { timestamps: true }
);

portfolioSchema.pre("validate", function () {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }
});

export const Portfolio = model<IPortfolio>("Portfolio", portfolioSchema);
export default Portfolio;
