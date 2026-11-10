import axios, { AxiosError, type AxiosInstance } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export const TOKEN_KEY = "hwc_admin_token";

export const http: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 12000
});

http.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const payload = error.response?.data as
      | { message?: string; errors?: { message: string }[] }
      | undefined;
    if (payload?.errors?.length) return payload.errors.map((e) => e.message).join(", ");
    if (payload?.message) return payload.message;
    if (error.code === "ERR_NETWORK") return "Cannot reach the server. Please try again shortly.";
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

export interface Envelope<T> {
  success: boolean;
  message?: string;
  data: T;
}

export async function unwrap<T>(promise: Promise<{ data: Envelope<T> }>): Promise<T> {
  const res = await promise;
  return res.data.data;
}
