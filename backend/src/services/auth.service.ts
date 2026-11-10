import config from "../config/env";
import { Admin, IAdmin } from "../models/Admin";
import ApiError from "../utils/ApiError";
import { generateToken } from "../utils/token";

export interface AdminProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResult {
  token: string;
  admin: AdminProfile;
}

function toProfile(admin: IAdmin): AdminProfile {
  return { _id: admin.id, name: admin.name, email: admin.email, role: admin.role };
}

export async function verifyCredentials(email: string, password: string): Promise<IAdmin> {
  const admin = await Admin.findOne({ email: email.toLowerCase() }).select("+password");
  if (!admin) {
    throw ApiError.unauthorized("Invalid email or password");
  }
  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid email or password");
  }
  return admin;
}

export async function login(email: string, password: string): Promise<LoginResult> {
  const admin = await verifyCredentials(email, password);
  const token = generateToken({ id: admin.id, email: admin.email, role: admin.role });
  return { token, admin: toProfile(admin) };
}

export async function getProfile(id: string): Promise<AdminProfile> {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw ApiError.unauthorized("Admin account no longer exists");
  }
  return toProfile(admin);
}

export async function createDefaultAdmin(): Promise<IAdmin> {
  const { name, email, password } = config.admin;
  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) return existing;
  return Admin.create({ name, email, password, role: "admin" });
}

export default { login, verifyCredentials, getProfile, createDefaultAdmin };
