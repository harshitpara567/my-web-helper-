import { Blog } from "../models/Blog";
import { ContactEnquiry, IContactEnquiry } from "../models/ContactEnquiry";
import { Portfolio } from "../models/Portfolio";
import { Testimonial } from "../models/Testimonial";

export interface DashboardStats {
  totalEnquiries: number;
  newEnquiries: number;
  totalBlogs: number;
  publishedBlogs: number;
  totalPortfolio: number;
  totalTestimonials: number;
  recentEnquiries: IContactEnquiry[];
}

export async function getStats(): Promise<DashboardStats> {
  const [
    totalEnquiries,
    newEnquiries,
    totalBlogs,
    publishedBlogs,
    totalPortfolio,
    totalTestimonials,
    recentEnquiries
  ] = await Promise.all([
    ContactEnquiry.countDocuments(),
    ContactEnquiry.countDocuments({ status: "new" }),
    Blog.countDocuments(),
    Blog.countDocuments({ status: "published" }),
    Portfolio.countDocuments(),
    Testimonial.countDocuments(),
    ContactEnquiry.find().sort({ createdAt: -1 }).limit(5)
  ]);

  return {
    totalEnquiries,
    newEnquiries,
    totalBlogs,
    publishedBlogs,
    totalPortfolio,
    totalTestimonials,
    recentEnquiries
  };
}

export default { getStats };
