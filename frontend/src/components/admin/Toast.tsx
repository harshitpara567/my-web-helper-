"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastMessage {
  type: "success" | "error";
  text: string;
}

export function Toast({
  message,
  onDismiss
}: {
  message: ToastMessage | null;
  onDismiss: () => void;
}) {
  const dismissRef = useRef(onDismiss);
  dismissRef.current = onDismiss;

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => dismissRef.current(), 3600);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4 sm:bottom-6">
      <AnimatePresence>
        {message ? (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "pointer-events-auto flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium shadow-lg backdrop-blur",
              message.type === "success"
                ? "border-brand-200 bg-brand-50/95 text-brand-700"
                : "border-red-200 bg-red-50/95 text-red-700"
            )}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            ) : (
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
            )}
            {message.text}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
