"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";
import { dict } from "@/lib/i18n";

export function SiteHeader() {
  const { role, locale } = useAuth();
  const t = dict[locale];
  const isMember = role === "bronze" || role === "silver" || role === "gold";
  const isAdmin = role === "admin";

  return (
    <header className="sticky top-0 z-30 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-[1400px] mx-auto px-5 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[var(--brand)] grid place-items-center text-white font-serif text-[15px] italic">
            L
          </div>
          <div className="leading-tight">
            <div className="font-serif text-[19px] text-[var(--foreground)] tracking-tight">
              {t.brand}
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-fg)] mt-0.5">
              EST. 2026
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-[13px]">
          <Link href="/products" className="px-3.5 py-2 text-[var(--foreground)]/80 hover:text-[var(--brand)] transition-colors">
            {t.nav.products}
          </Link>
          {isMember && (
            <>
              <Link href="/sample-request" className="px-3.5 py-2 text-[var(--foreground)]/80 hover:text-[var(--brand)] transition-colors">
                {t.nav.sample}
              </Link>
              <Link href="/bulk-order" className="px-3.5 py-2 text-[var(--foreground)]/80 hover:text-[var(--brand)] transition-colors">
                {t.nav.bulk}
              </Link>
              <Link href="/orders" className="px-3.5 py-2 text-[var(--foreground)]/80 hover:text-[var(--brand)] transition-colors">
                {t.nav.orders}
              </Link>
            </>
          )}
          {isAdmin && (
            <Link href="/admin" className="px-3.5 py-2 text-[var(--foreground)]/80 hover:text-[var(--brand)] transition-colors">
              {t.nav.admin}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {role === "guest" && (
            <>
              <Link href="/login" className="text-[13px] text-[var(--foreground)]/70 hover:text-[var(--brand)] px-2">
                {t.nav.login}
              </Link>
              <Link
                href="/signup"
                className="text-[13px] bg-[var(--brand)] text-white hover:bg-[var(--brand-dark)] px-5 py-2.5 rounded-full font-medium transition-colors"
              >
                {t.nav.signup}
              </Link>
            </>
          )}
          {role === "pending" && (
            <span className="text-[11px] text-amber-800 bg-amber-100 px-3 py-1.5 rounded-full font-medium border border-amber-200">
              {locale === "ko" ? "승인 대기" : "Pending"}
            </span>
          )}
          {isMember && (
            <span className="text-[11px] text-[var(--brand)] bg-[var(--brand-light)] px-3 py-1.5 rounded-full font-semibold uppercase tracking-wider border border-[var(--brand)]/15">
              {role}
            </span>
          )}
          {isAdmin && (
            <span className="text-[11px] text-stone-100 bg-[#1a1410] px-3 py-1.5 rounded-full font-medium tracking-wider">
              {locale === "ko" ? "관리자" : "Admin"}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
