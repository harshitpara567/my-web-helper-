import type { Metadata } from "next";
import { AuthProvider } from "@/components/admin/AuthProvider";

export const metadata: Metadata = {
  title: "Admin",
  description: "My Web Helper administration console.",
  robots: { index: false, follow: false }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-paper-soft">{children}</div>
    </AuthProvider>
  );
}
