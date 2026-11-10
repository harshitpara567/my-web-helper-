import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(160),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+()\-\s\d]*$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(20, "Tell us a little more (min 20 characters)").max(4000)
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const blogSchema = z.object({
  title: z.string().trim().min(3, "Title is required").max(200),
  slug: z.string().trim().max(200).optional().or(z.literal("")),
  excerpt: z.string().trim().min(10, "Excerpt is required").max(400),
  content: z.string().trim().min(50, "Content is required"),
  coverImage: z.string().trim().url("Cover image must be a valid URL").or(z.literal("")),
  category: z.string().trim().optional().or(z.literal("")),
  author: z.string().trim().min(2).max(120),
  tags: z.string().trim().optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
  metaTitle: z.string().trim().max(200).optional().or(z.literal("")),
  metaDescription: z.string().trim().max(300).optional().or(z.literal(""))
});

export type BlogFormValues = z.infer<typeof blogSchema>;

export const portfolioSchema = z.object({
  title: z.string().trim().min(3, "Title is required").max(200),
  slug: z.string().trim().max(200).optional().or(z.literal("")),
  client: z.string().trim().min(2, "Client is required").max(160),
  summary: z.string().trim().min(10, "Summary is required").max(400),
  description: z.string().trim().min(20, "Description is required"),
  coverImage: z.string().trim().url("Cover image must be a valid URL").or(z.literal("")),
  category: z.string().trim().min(2, "Category is required").max(120),
  technologies: z.string().trim().optional().or(z.literal("")),
  results: z.string().trim().optional().or(z.literal("")),
  year: z.coerce.number().int().min(2000).max(2100),
  liveUrl: z.string().trim().url("Live URL must be valid").or(z.literal("")),
  featured: z.boolean()
});

export type PortfolioFormValues = z.infer<typeof portfolioSchema>;

export const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  role: z.string().trim().min(2, "Role is required").max(120),
  company: z.string().trim().min(2, "Company is required").max(160),
  quote: z.string().trim().min(20, "Quote is required").max(1200),
  rating: z.coerce.number().int().min(1).max(5),
  featured: z.boolean(),
  order: z.coerce.number().int().min(0),
  avatar: z.string().trim().url("Avatar must be a valid URL").or(z.literal(""))
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  slug: z.string().trim().max(120).optional().or(z.literal("")),
  type: z.enum(["blog", "portfolio"]),
  description: z.string().trim().max(300).optional().or(z.literal(""))
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
