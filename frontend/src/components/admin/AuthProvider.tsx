"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { adminLogin, fetchCurrentAdmin } from "@/services/api.service";
import { TOKEN_KEY } from "@/services/http";
import type { AdminUser } from "@/types";

export const ADMIN_KEY = "hwc_admin_user";

interface AuthContextValue {
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredAdmin(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(ADMIN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(ADMIN_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const token = window.localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setLoading(false);
      return;
    }

    setAdmin(readStoredAdmin());

    fetchCurrentAdmin()
      .then((user) => {
        if (!active) return;
        setAdmin(user);
        window.localStorage.setItem(ADMIN_KEY, JSON.stringify(user));
      })
      .catch((error: unknown) => {
        if (!active) return;
        if (error instanceof AxiosError && error.response?.status === 401) {
          clearSession();
        }
        setAdmin(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { token, admin: user } = await adminLogin(email, password);
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(ADMIN_KEY, JSON.stringify(user));
    setAdmin(user);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setAdmin(null);
    router.replace("/admin/login");
  }, [router]);

  const value = useMemo<AuthContextValue>(
    () => ({ admin, loading, login, logout }),
    [admin, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAdmin(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAdmin must be used within an AuthProvider");
  return context;
}
