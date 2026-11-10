import { ITestimonial, Testimonial } from "../models/Testimonial";
import ApiError from "../utils/ApiError";

export interface TestimonialInput {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating?: number;
  featured?: boolean;
  order?: number;
}

export type UpdateTestimonialInput = Partial<TestimonialInput>;

export async function list(filter: { featured?: boolean } = {}): Promise<ITestimonial[]> {
  const query: Record<string, unknown> = {};
  if (typeof filter.featured === "boolean") query.featured = filter.featured;

  return Testimonial.find(query).sort({ order: 1, createdAt: -1 });
}

export async function create(input: TestimonialInput): Promise<ITestimonial> {
  return Testimonial.create(input);
}

export async function update(id: string, input: UpdateTestimonialInput): Promise<ITestimonial> {
  const testimonial = await Testimonial.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true
  });
  if (!testimonial) {
    throw ApiError.notFound("Testimonial not found");
  }
  return testimonial;
}

export async function remove(id: string): Promise<void> {
  const result = await Testimonial.findByIdAndDelete(id);
  if (!result) {
    throw ApiError.notFound("Testimonial not found");
  }
}

export default { list, create, update, remove };
