"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { enquirySchema, type EnquiryFormValues } from "@/lib/validations";
import { services } from "@/lib/seed/services";
import { submitEnquiry } from "@/services/api.service";
import { getErrorMessage } from "@/services/http";

const budgetOptions = [
  "< $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not sure yet"
];

const defaultValues: EnquiryFormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  budget: "",
  message: ""
};

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues
  });

  async function onSubmit(values: EnquiryFormValues) {
    setServerError(null);
    try {
      await submitEnquiry({
        name: values.name,
        email: values.email,
        company: values.company || undefined,
        phone: values.phone || undefined,
        service: values.service || undefined,
        budget: values.budget || undefined,
        message: values.message
      });
      reset(defaultValues);
      setSubmitted(true);
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  }

  if (submitted) {
    return (
      <div
        className="flex h-full flex-col items-start justify-center rounded-2xl border border-brand-500/30 bg-brand-50 p-8 sm:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-500 text-paper">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-xl font-bold tracking-tight text-ink">Thank you — message received.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/70">
          A member of our team will review your enquiry and get back to you within one business day.
          If it is urgent, email us directly and we will pick it up sooner.
        </p>
        <div className="mt-8">
          <Button type="button" variant="outline" onClick={() => setSubmitted(false)}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-ink/10 bg-paper p-6 sm:p-8"
      aria-label="Project enquiry form"
    >
      {serverError ? (
        <div
          className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{serverError}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" error={errors.name?.message} required>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Cooper"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email?.message} required>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
        </Field>

        <Field label="Company" htmlFor="company" error={errors.company?.message}>
          <Input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            {...register("company")}
          />
        </Field>

        <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (415) 555-0142"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
        </Field>

        <Field label="Service of interest" htmlFor="service" error={errors.service?.message}>
          <Select id="service" defaultValue="" {...register("service")}>
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </Select>
        </Field>

        <Field label="Estimated budget" htmlFor="budget" error={errors.budget?.message}>
          <Select id="budget" defaultValue="" {...register("budget")}>
            <option value="">Select a range</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="mt-5">
        <Field
          label="Tell us about your project"
          htmlFor="message"
          error={errors.message?.message}
          required
        >
          <Textarea
            id="message"
            rows={6}
            placeholder="Goals, timeline, current challenges — the more context the better."
            aria-invalid={Boolean(errors.message)}
            {...register("message")}
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/50">
          We reply within one business day. Your details stay confidential.
        </p>
        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
