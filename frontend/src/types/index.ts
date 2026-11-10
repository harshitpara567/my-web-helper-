export type ServiceStatus = "new" | "read" | "in-progress" | "closed";
export type BlogStatus = "draft" | "published";
export type CategoryType = "blog" | "portfolio";

export interface Enquiry {
  _id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  type: CategoryType;
  description?: string;
}

export interface BlogSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category?: Category | string;
  tags: string[];
  author: string;
  status: BlogStatus;
  publishedAt?: string;
  readingTime: number;
  seo?: BlogSeo;
  createdAt: string;
  updatedAt: string;
}

export interface Portfolio {
  _id: string;
  title: string;
  slug: string;
  client: string;
  summary: string;
  description: string;
  coverImage: string;
  images: string[];
  category: string;
  technologies: string[];
  results: string[];
  featured: boolean;
  year: number;
  liveUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
  rating: number;
  featured: boolean;
  order: number;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  icon: string;
  benefits: ServiceBenefit[];
  technologies: string[];
  deliverables: string[];
}

export interface DashboardStats {
  totalEnquiries: number;
  newEnquiries: number;
  totalBlogs: number;
  publishedBlogs: number;
  totalPortfolio: number;
  totalTestimonials: number;
  recentEnquiries: Enquiry[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}
