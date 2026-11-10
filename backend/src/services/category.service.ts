import { Category, CategoryType, ICategory } from "../models/Category";
import ApiError from "../utils/ApiError";

export interface CategoryInput {
  name: string;
  type: CategoryType;
  slug?: string;
  description?: string;
}

export type UpdateCategoryInput = Partial<CategoryInput>;

export async function list(type?: CategoryType): Promise<ICategory[]> {
  const query = type ? { type } : {};
  return Category.find(query).sort({ name: 1 });
}

export async function create(input: CategoryInput): Promise<ICategory> {
  return Category.create(input);
}

export async function update(id: string, input: UpdateCategoryInput): Promise<ICategory> {
  const category = await Category.findById(id);
  if (!category) {
    throw ApiError.notFound("Category not found");
  }

  if (input.name !== undefined) category.name = input.name;
  if (input.type !== undefined) category.type = input.type;
  if (input.description !== undefined) category.description = input.description;
  if (input.slug !== undefined) category.slug = input.slug;

  await category.save();
  return category;
}

export async function remove(id: string): Promise<void> {
  const result = await Category.findByIdAndDelete(id);
  if (!result) {
    throw ApiError.notFound("Category not found");
  }
}

export default { list, create, update, remove };
