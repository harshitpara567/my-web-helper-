import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-lime text-ink hover:bg-lime-deep focus-visible:ring-lime",
  dark: "bg-ink text-paper hover:bg-brand-700 focus-visible:ring-brand-500",
  outline:
    "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper focus-visible:ring-ink",
  light:
    "border border-paper/25 bg-transparent text-paper hover:bg-paper hover:text-ink focus-visible:ring-paper",
  ghost: "bg-transparent text-ink hover:bg-ink/5 focus-visible:ring-ink"
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base"
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 disabled:pointer-events-none disabled:opacity-50";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

interface ButtonProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

interface LinkProps extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
  prefetch?: boolean;
}

type Props = ButtonProps | LinkProps;

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", size = "md", className, children, ...props },
  ref
) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, target, rel, prefetch } = props;
    return (
      <Link href={href} target={target} rel={rel} prefetch={prefetch} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonProps & { href?: undefined };
  return (
    <button ref={ref} className={classes} {...buttonProps}>
      {children}
    </button>
  );
});
