import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm",
        "placeholder:text-stone-400",
        "focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-[88px] w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm",
        "placeholder:text-stone-400",
        "focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent",
        className,
      )}
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
      className={cn("text-sm font-medium text-stone-700 mb-1.5 block", className)}
    >
      {children}
    </label>
  );
}
