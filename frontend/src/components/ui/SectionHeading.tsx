import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", tone === "dark" && "text-lime")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "mt-4 text-display-3 text-balance",
          tone === "dark" ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed text-pretty",
            tone === "dark" ? "text-paper/70" : "text-ink/70"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
