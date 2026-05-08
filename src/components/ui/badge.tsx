import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Variant = "bronze" | "silver" | "gold" | "neutral" | "success" | "warning" | "info";

const variantClasses: Record<Variant, string> = {
  bronze: "bg-amber-50 text-amber-900 border-amber-200/80",
  silver: "bg-stone-100 text-stone-800 border-stone-200",
  gold: "bg-yellow-50 text-yellow-900 border-yellow-200",
  neutral: "bg-[var(--surface)] text-[var(--muted-fg)] border-[var(--border)]",
  success: "bg-emerald-50 text-emerald-900 border-emerald-200/80",
  warning: "bg-amber-50 text-amber-900 border-amber-200/80",
  info: "bg-[var(--brand-light)] text-[var(--brand)] border-[var(--brand)]/20",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { variant?: Variant };

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
