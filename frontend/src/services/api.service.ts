import { http, unwrap } from "@/services/http";
import type { Blog, Category, Enquiry, Portfolio, Testimonial, DashboardStats } from "@/types";

/* ------------------------------- Public ------------------------------- */

export interface EnquiryPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<Enquiry> {
  return unwrap<Enquiry>(http.post("/enquiries", payload));
}

export async function fetchNewsletterSubscribe(email: string): Promise<void> {
  await unwrap(http.post("/enquiries", {
    name: "Newsletter Subscriber",
    email,
    message: "Subscribed via footer newsletter form.",
    service: "Newsletter"
  }));
}

/* -------------------------------- Admin ------------------------------- */

export interface LoginResponse {
  token: string;
  admin: { _id: string; name: string; email: string; role: string };
}

export async function adminLogin(email: string, password: string): Promise<LoginResponse> {
  return unwrap<LoginResponse>(http.post("/auth/login", { email, password }));
}

export async function fetchCurrentAdmin() {
  return unwrap<LoginResponse["admin"]>(http.get("/auth/me"));
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  return unwrap<DashboardStats>(http.get("/dashboard/stats"));
}

export interface ListParams {
  status?: string;
  search?: string;
  category?: string;
}

export async function fetchEnquiries(params: ListParams = {}): Promise<Enquiry[]> {
  return unwrap<Enquiry[]>(http.get("/enquiries", { params }));
}

export async function updateEnquiryStatus(id: string, status: string): Promise<Enquiry> {
  return unwrap<Enquiry>(http.patch(`/enquiries/${id}/status`, { status }));
}

export async function deleteEnquiry(id: string): Promise<void> {
  await http.delete(`/enquiries/${id}`);
}

export async function fetchAdminBlogs(): Promise<Blog[]> {
  return unwrap<Blog[]>(http.get("/blogs/admin/all"));
}

export async function createBlog(payload: Partial<Blog>): Promise<Blog> {
  return unwrap<Blog>(http.post("/blogs", payload));
}

export async function updateBlog(id: string, payload: Partial<Blog>): Promise<Blog> {
  return unwrap<Blog>(http.put(`/blogs/${id}`, payload));
}

export async function toggleBlogPublish(id: string): Promise<Blog> {
  return unwrap<Blog>(http.patch(`/blogs/${id}/publish`));
}

export async function deleteBlog(id: string): Promise<void> {
  await http.delete(`/blogs/${id}`);
}

export async function fetchPortfolio(): Promise<Portfolio[]> {
  return unwrap<Portfolio[]>(http.get("/portfolio"));
}

export async function createPortfolio(payload: Partial<Portfolio>): Promise<Portfolio> {
  return unwrap<Portfolio>(http.post("/portfolio", payload));
}

export async function updatePortfolio(id: string, payload: Partial<Portfolio>): Promise<Portfolio> {
  return unwrap<Portfolio>(http.put(`/portfolio/${id}`, payload));
}

export async function deletePortfolio(id: string): Promise<void> {
  await http.delete(`/portfolio/${id}`);
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  return unwrap<Testimonial[]>(http.get("/testimonials"));
}

export async function createTestimonial(payload: Partial<Testimonial>): Promise<Testimonial> {
  return unwrap<Testimonial>(http.post("/testimonials", payload));
}

export async function updateTestimonial(id: string, payload: Partial<Testimonial>): Promise<Testimonial> {
  return unwrap<Testimonial>(http.put(`/testimonials/${id}`, payload));
}

export async function deleteTestimonial(id: string): Promise<void> {
  await http.delete(`/testimonials/${id}`);
}

export async function fetchCategories(): Promise<Category[]> {
  return unwrap<Category[]>(http.get("/categories"));
}

export async function createCategory(payload: Partial<Category>): Promise<Category> {
  return unwrap<Category>(http.post("/categories", payload));
}

export async function updateCategory(id: string, payload: Partial<Category>): Promise<Category> {
  return unwrap<Category>(http.put(`/categories/${id}`, payload));
}

export async function deleteCategory(id: string): Promise<void> {
  await http.delete(`/categories/${id}`);
}
