"use client";

import { useAuth } from "./auth-provider";
import { dict } from "@/lib/i18n";

export function SiteFooter() {
  const { locale } = useAuth();
  const t = dict[locale];
  return (
    <footer className="border-t border-stone-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-stone-500 flex flex-col sm:flex-row gap-2 sm:justify-between">
        <span>{t.footer.copyright}</span>
        <span className="text-stone-400">
          {locale === "ko"
            ? "데모용 가상 데이터입니다."
            : "All data shown is for demonstration purposes."}
        </span>
      </div>
    </footer>
  );
}
