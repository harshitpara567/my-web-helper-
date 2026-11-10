import bcrypt from "bcryptjs";
import { Document, Schema, model } from "mongoose";

export type AdminRole = "admin";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ["admin"], default: "admin" }
  },
  { timestamps: true }
);

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = function (
  this: IAdmin,
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

export const Admin = model<IAdmin>("Admin", adminSchema);
export default Admin;
