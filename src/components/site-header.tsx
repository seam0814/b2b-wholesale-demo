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
    <header className="sticky top-0 z-30 bg-[var(--background)]/85 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-[15px] font-semibold tracking-[0.18em] text-[var(--foreground)]">
          {t.brand}
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-[13px]">
          <Link href="/products" className="text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors">
            {t.nav.products}
          </Link>
          {isMember && (
            <>
              <Link href="/sample-request" className="text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors">
                {t.nav.sample}
              </Link>
              <Link href="/bulk-order" className="text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors">
                {t.nav.bulk}
              </Link>
              <Link href="/orders" className="text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors">
                {t.nav.orders}
              </Link>
            </>
          )}
          {isAdmin && (
            <Link href="/admin" className="text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors">
              {t.nav.admin}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {role === "guest" && (
            <>
              <Link href="/login" className="text-[13px] text-[var(--foreground)]/70 hover:text-[var(--foreground)] hidden sm:inline">
                {t.nav.login}
              </Link>
              <Link
                href="/signup"
                className="text-[12px] bg-[var(--foreground)] text-white hover:bg-[var(--brand)] px-4 py-2 rounded-full font-medium transition-colors"
              >
                {t.nav.signup}
              </Link>
            </>
          )}
          {role === "pending" && (
            <span className="text-[10px] uppercase tracking-[0.18em] text-amber-800 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
              {locale === "ko" ? "승인 대기" : "Pending"}
            </span>
          )}
          {isMember && (
            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--brand)] bg-[var(--brand-light)] px-3 py-1.5 rounded-full border border-[var(--brand)]/15 font-semibold">
              {role}
            </span>
          )}
          {isAdmin && (
            <span className="text-[10px] uppercase tracking-[0.18em] text-stone-100 bg-[#1a1410] px-3 py-1.5 rounded-full font-medium">
              {locale === "ko" ? "관리자" : "Admin"}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
