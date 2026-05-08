"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { dict } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Layers, Boxes, Globe2, ArrowRight } from "lucide-react";
import { members, orders, products } from "@/lib/mock-data";

const FEATURE_ICONS = [ShieldCheck, Layers, Boxes, Globe2];

export default function Home() {
  const { locale, role } = useAuth();
  const t = dict[locale];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl" aria-hidden />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-pink-700 bg-pink-100 px-3 py-1 rounded-full mb-6">
              {t.hero.eyebrow}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-900 leading-[1.1] whitespace-pre-line">
              {t.hero.title}
            </h1>
            <p className="mt-6 text-lg text-stone-600 max-w-xl">{t.hero.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {role === "guest" ? (
                <Link href="/signup">
                  <Button size="lg">
                    {t.hero.ctaPrimary}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/products">
                  <Button size="lg">
                    {t.hero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              <Link href="/products">
                <Button variant="outline" size="lg">
                  {t.hero.ctaSecondary}
                </Button>
              </Link>
            </div>

            {/* Stat strip */}
            <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              <Stat n={`${members.length * 14}+`} label={locale === "ko" ? "글로벌 바이어" : "Global Buyers"} />
              <Stat n={`${products.length * 6}+`} label={locale === "ko" ? "도매 상품" : "Wholesale SKUs"} />
              <Stat n={`${orders.length * 28}+`} label={locale === "ko" ? "월간 주문" : "Monthly Orders"} />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold tracking-tight text-stone-900 mb-12 text-center">
          {t.features.title}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.items.map((f, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div key={i} className="rounded-xl border border-stone-200 bg-white p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-pink-100 grid place-items-center mb-4">
                  <Icon className="w-5 h-5 text-pink-700" />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{f.t}</h3>
                <p className="text-sm text-stone-600">{f.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="rounded-2xl bg-gradient-to-br from-stone-900 to-stone-800 p-10 md:p-14 text-white relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl" aria-hidden />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-2xl">
              {locale === "ko"
                ? "지금 가입 신청하고 바이어 단가를 확인하세요."
                : "Apply now to unlock verified buyer pricing."}
            </h2>
            <p className="mt-4 text-stone-300 max-w-xl">
              {locale === "ko"
                ? "사업자 등록증 검증 후 영업일 24시간 이내 승인 안내."
                : "Approval within 24 business hours after business license verification."}
            </p>
            <div className="mt-8">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-stone-900 hover:bg-stone-100">
                  {t.hero.ctaPrimary}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-2xl md:text-3xl font-bold text-stone-900">{n}</div>
      <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}
