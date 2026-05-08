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
    <div className="bg-[#1a1410] text-stone-200 text-xs">
      <div className="max-w-[1400px] mx-auto px-5 py-2 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="eyebrow !text-[10px] !text-rose-300/90">
            {t.demoBar.label}
          </span>
          <div className="flex flex-wrap gap-1">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",
                  role === r
                    ? "bg-white text-[#1a1410]"
                    : "bg-white/5 text-stone-300 hover:bg-white/10",
                )}
              >
                {t.demoBar.roles[r]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLocale("ko")}
            className={cn(
              "px-2 py-1 rounded text-[11px] font-medium transition-all",
              locale === "ko" ? "bg-white text-[#1a1410]" : "text-stone-400 hover:text-white",
            )}
          >
            한국어
          </button>
          <span className="text-stone-600">·</span>
          <button
            onClick={() => setLocale("en")}
            className={cn(
              "px-2 py-1 rounded text-[11px] font-medium transition-all",
              locale === "en" ? "bg-white text-[#1a1410]" : "text-stone-400 hover:text-white",
            )}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}
