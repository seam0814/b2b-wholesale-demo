"use client";

import { useAuth } from "./auth-provider";
import { dict } from "@/lib/i18n";
import type { Role } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const roles: Role[] = ["guest", "pending", "bronze", "silver", "gold", "admin"];

export function DemoBar() {
  const { role, setRole, locale, setLocale } = useAuth();
  const t = dict[locale];

  return (
    <div className="bg-stone-900 text-stone-100 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs uppercase tracking-wider text-pink-300 font-semibold">
            {t.demoBar.label}
          </span>
          <div className="flex flex-wrap gap-1">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={cn(
                  "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                  role === r
                    ? "bg-pink-500 text-white"
                    : "bg-stone-800 text-stone-300 hover:bg-stone-700",
                )}
              >
                {t.demoBar.roles[r]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLocale("ko")}
            className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              locale === "ko" ? "bg-pink-500 text-white" : "bg-stone-800 text-stone-300 hover:bg-stone-700",
            )}
          >
            한국어
          </button>
          <button
            onClick={() => setLocale("en")}
            className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              locale === "en" ? "bg-pink-500 text-white" : "bg-stone-800 text-stone-300 hover:bg-stone-700",
            )}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
}
