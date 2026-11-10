import { Document, Schema, model } from "mongoose";

export type EnquiryStatus = "new" | "read" | "in-progress" | "closed";

export interface IContactEnquiry extends Document {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IContactEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    company: { type: String, trim: true },
    phone: { type: String, trim: true },
    service: { type: String, trim: true },
    budget: { type: String, trim: true },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    status: {
      type: String,
      enum: ["new", "read", "in-progress", "closed"],
      default: "new",
      index: true
    }
  },
  { timestamps: true }
);

enquirySchema.index({ createdAt: -1 });

export const ContactEnquiry = model<IContactEnquiry>("ContactEnquiry", enquirySchema);
export default ContactEnquiry;
