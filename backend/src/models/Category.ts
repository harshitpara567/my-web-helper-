import { Document, Schema, model } from "mongoose";
import { slugify } from "../utils/slug";

export type CategoryType = "blog" | "portfolio";

export interface ICategory extends Document {
  name: string;
  slug: string;
  type: CategoryType;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true, lowercase: true, trim: true },
    type: { type: String, enum: ["blog", "portfolio"], required: true, default: "blog" },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

categorySchema.pre("validate", function () {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name);
  }
});

export const Category = model<ICategory>("Category", categorySchema);
export default Category;
