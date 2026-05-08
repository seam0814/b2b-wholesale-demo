"use client";

import { useAuth } from "./auth-provider";
import { dict } from "@/lib/i18n";

export function SiteFooter() {
  const { locale } = useAuth();
  const t = dict[locale];
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-auto">
      <div className="max-w-[1400px] mx-auto px-5 py-12">
        <div className="grid md:grid-cols-3 gap-8 pb-10 border-b border-[var(--border)]">
          <div>
            <div className="text-[14px] font-semibold tracking-[0.18em]">{t.brand}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-fg)] mt-2">{t.tagline}</div>
            <p className="text-[12px] text-[var(--muted-fg)] mt-4 max-w-xs leading-relaxed">
              {locale === "ko"
                ? "검증된 글로벌 바이어를 위한 큐레이티드 K-뷰티 도매 플랫폼."
                : "A curated K-beauty wholesale platform for verified global buyers."}
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-fg)] mb-3">
              {locale === "ko" ? "둘러보기" : "Explore"}
            </div>
            <ul className="space-y-2 text-[13px] text-[var(--foreground)]/80">
              <li>{t.nav.products}</li>
              <li>{t.nav.sample}</li>
              <li>{t.nav.bulk}</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-fg)] mb-3">
              {locale === "ko" ? "회사" : "Company"}
            </div>
            <ul className="space-y-2 text-[13px] text-[var(--foreground)]/80">
              <li>About</li>
              <li>Press</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row justify-between gap-2 text-[11px] text-[var(--muted-fg)]">
          <span>{t.footer.copyright}</span>
          <span>
            {locale === "ko" ? "데모용 가상 데이터입니다." : "All data shown is for demonstration purposes."}
          </span>
        </div>
      </div>
    </footer>
  );
}
