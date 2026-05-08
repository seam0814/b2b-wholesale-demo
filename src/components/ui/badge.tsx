import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Variant = "bronze" | "silver" | "gold" | "neutral" | "success" | "warning" | "info";

const variantClasses: Record<Variant, string> = {
  bronze: "bg-amber-100 text-amber-900 border-amber-200",
  silver: "bg-slate-200 text-slate-800 border-slate-300",
  gold: "bg-yellow-100 text-yellow-900 border-yellow-300",
  neutral: "bg-stone-100 text-stone-700 border-stone-200",
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-orange-100 text-orange-800 border-orange-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { variant?: Variant };

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
