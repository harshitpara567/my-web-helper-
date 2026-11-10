import {
  Blocks,
  Building2,
  Clock,
  Cloud,
  Code2,
  Globe,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Laptop,
  Megaphone,
  PenTool,
  Puzzle,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  type LucideIcon
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  Blocks,
  Building2,
  Clock,
  Cloud,
  Code2,
  Globe,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Laptop,
  Megaphone,
  PenTool,
  Puzzle,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users
};

export function Icon({
  name,
  className,
  strokeWidth = 1.6
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Component = registry[name] ?? Sparkles;
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
