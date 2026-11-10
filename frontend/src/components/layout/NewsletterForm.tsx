"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { fetchNewsletterSubscribe } from "@/services/api.service";
import { getErrorMessage } from "@/services/http";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setState("error");
      setMessage("Enter a valid email address.");
      return;
    }
    setState("loading");
    try {
      await fetchNewsletterSubscribe(email);
      setState("done");
      setMessage("You're subscribed. Welcome aboard.");
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage(getErrorMessage(error));
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 w-full max-w-sm">
      <div className="flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 p-1.5 focus-within:border-lime">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-paper placeholder:text-paper/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          aria-label="Subscribe to newsletter"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime text-ink transition-colors hover:bg-lime-deep disabled:opacity-60"
        >
          {state === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : state === "done" ? (
            <Check className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </button>
      </div>
      {message ? (
        <p
          className={`mt-2 text-xs ${state === "error" ? "text-red-300" : "text-lime"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
