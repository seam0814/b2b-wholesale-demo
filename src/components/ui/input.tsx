import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

const baseField = "flex w-full bg-transparent border-b border-[var(--border-strong)] px-0 py-2.5 text-[14px] text-[var(--foreground)] focus:outline-none focus:border-[var(--brand)] transition-colors placeholder:text-[var(--muted-fg)]/50";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(baseField, "h-10", className)}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(baseField, "min-h-[80px] resize-none", className)}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(baseField, "h-10 cursor-pointer", className)}
      {...props}
    >
      {children}
    </select>
  );
}

export function Label({ className, children, htmlFor }: { className?: string; children: React.ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-fg)] mb-2 block", className)}
    >
      {children}
    </label>
  );
}
