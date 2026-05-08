"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";
import { dict } from "@/lib/i18n";
import { Sparkles } from "lucide-react";

export function SiteHeader() {
  const { role, locale } = useAuth();
  const t = dict[locale];
  const isMember = role === "bronze" || role === "silver" || role === "gold";
  const isAdmin = role === "admin";

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 grid place-items-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-stone-900 tracking-tight">{t.brand}</div>
            <div className="text-[10px] uppercase tracking-wider text-stone-500">{t.tagline}</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Link href="/products" className="px-3 py-2 text-stone-700 hover:text-pink-700 rounded-md">
            {t.nav.products}
          </Link>
          {isMember && (
            <>
              <Link href="/sample-request" className="px-3 py-2 text-stone-700 hover:text-pink-700 rounded-md">
                {t.nav.sample}
              </Link>
              <Link href="/bulk-order" className="px-3 py-2 text-stone-700 hover:text-pink-700 rounded-md">
                {t.nav.bulk}
              </Link>
              <Link href="/orders" className="px-3 py-2 text-stone-700 hover:text-pink-700 rounded-md">
                {t.nav.orders}
              </Link>
            </>
          )}
          {isAdmin && (
            <Link href="/admin" className="px-3 py-2 text-stone-700 hover:text-pink-700 rounded-md">
              {t.nav.admin}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {role === "guest" && (
            <>
              <Link href="/login" className="text-sm text-stone-700 hover:text-pink-700 px-3 py-2">
                {t.nav.login}
              </Link>
              <Link
                href="/signup"
                className="text-sm bg-[color:var(--brand)] text-white hover:bg-pink-700 px-4 py-2 rounded-lg font-medium"
              >
                {t.nav.signup}
              </Link>
            </>
          )}
          {role === "pending" && (
            <span className="text-xs text-orange-700 bg-orange-100 px-3 py-1.5 rounded-full font-medium">
              {locale === "ko" ? "승인 대기" : "Pending Approval"}
            </span>
          )}
          {isMember && (
            <span className="text-xs text-pink-700 bg-pink-100 px-3 py-1.5 rounded-full font-medium uppercase">
              {role}
            </span>
          )}
          {isAdmin && (
            <span className="text-xs text-stone-100 bg-stone-900 px-3 py-1.5 rounded-full font-medium">
              {locale === "ko" ? "관리자" : "Admin"}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
