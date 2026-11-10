"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/form";
import { ErrorBanner } from "@/components/admin/ErrorBanner";
import { useAdmin } from "@/components/admin/AuthProvider";
import { getErrorMessage } from "@/services/http";
import { loginSchema, type LoginFormValues } from "@/lib/validations";

export default function AdminLoginPage() {
  const router = useRouter();
  const { admin, loading, login } = useAdmin();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  useEffect(() => {
    if (!loading && admin) router.replace("/admin");
  }, [loading, admin, router]);

  async function submit(values: LoginFormValues) {
    setServerError("");
    try {
      await login(values.email, values.password);
      router.replace("/admin");
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-ink/10 bg-paper p-8 shadow-xl">
        <Logo />

        <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Secure admin
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
          Sign in to your console
        </h1>
        <p className="mt-1 text-sm text-ink/55">
          Manage enquiries, insights, portfolio and testimonials.
        </p>

        <form onSubmit={handleSubmit(submit)} className="mt-6 flex flex-col gap-4" noValidate>
          {serverError ? <ErrorBanner message={serverError} /> : null}

          <Field label="Email" htmlFor="login-email" error={errors.email?.message} required>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="admin@mywebhelper.com"
              {...register("email")}
            />
          </Field>

          <Field label="Password" htmlFor="login-password" error={errors.password?.message} required>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password")}
            />
          </Field>

          <Button type="submit" variant="dark" size="lg" className="mt-2 w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-ink/45">
          Authorised personnel only. All activity is logged.
        </p>
      </div>
    </div>
  );
}
