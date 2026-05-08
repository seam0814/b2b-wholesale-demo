"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { dict } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Layers, Boxes, Globe2, ArrowUpRight } from "lucide-react";
import { products } from "@/lib/mock-data";

const FEATURE_ICONS = [ShieldCheck, Layers, Boxes, Globe2];

export default function Home() {
  const { locale, role } = useAuth();
  const t = dict[locale];
  const featured = products.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="max-w-[1400px] mx-auto px-5 pt-20 pb-24 md:pt-32 md:pb-32 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7 lg:col-span-7">
            <span className="eyebrow">{t.hero.eyebrow}</span>
            <h1 className="font-serif mt-5 text-[44px] md:text-[72px] lg:text-[88px] leading-[0.98] text-[var(--foreground)] whitespace-pre-line">
              {t.hero.title}
            </h1>
            <p className="mt-7 text-[16px] md:text-[17px] text-[var(--muted-fg)] max-w-xl leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {role === "guest" ? (
                <Link href="/signup">
                  <Button size="lg">
                    {t.hero.ctaPrimary}
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/products">
                  <Button size="lg">
                    {t.hero.ctaSecondary}
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              <Link href="/products">
                <Button variant="outline" size="lg">
                  {t.hero.ctaSecondary}
                </Button>
              </Link>
            </div>
          </div>

          {/* Editorial product collage */}
          <div className="md:col-span-5 lg:col-span-5 hidden md:block">
            <div className="relative h-[480px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured[0].image}
                alt=""
                className="absolute top-0 right-0 w-[68%] h-[64%] object-cover rounded-[2px] grayscale-0"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured[1].image}
                alt=""
                className="absolute bottom-0 left-0 w-[58%] h-[54%] object-cover rounded-[2px] shadow-xl"
              />
              <div className="absolute top-[58%] right-[8%] w-[120px] bg-[var(--background)] border border-[var(--border)] p-3 rotate-[2deg] shadow-md">
                <div className="text-[9px] uppercase tracking-[0.18em] text-[var(--muted-fg)]">Featured</div>
                <div className="font-serif text-[15px] mt-1 leading-tight">
                  {locale === "ko" ? featured[0].nameKo.split(" ")[0] : featured[0].nameEn.split(" ")[0]}
                </div>
                <div className="h-px bg-[var(--border)] my-2" />
                <div className="text-[10px] text-[var(--muted-fg)]">
                  {locale === "ko" ? "전 세계 32개국" : "Shipped to 32 countries"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile featured product */}
        <div className="md:hidden px-5 pb-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featured[0].image} alt="" className="w-full aspect-[4/5] object-cover rounded-[2px]" />
        </div>

        {/* Stats strip — under hero */}
        <div className="border-y border-[var(--border)] bg-[var(--surface)]">
          <div className="max-w-[1400px] mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border)]">
            <Stat n="84+" label={locale === "ko" ? "글로벌 바이어" : "Global Buyers"} />
            <Stat n="48" label={locale === "ko" ? "도매 SKU" : "Wholesale SKUs"} />
            <Stat n="32" label={locale === "ko" ? "수출 국가" : "Export Markets"} />
            <Stat n="24h" label={locale === "ko" ? "승인 SLA" : "Approval SLA"} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1400px] mx-auto px-5 py-24 md:py-32">
        <div className="md:flex md:items-end md:justify-between mb-14">
          <div>
            <span className="eyebrow">{locale === "ko" ? "왜 우리인가" : "What sets us apart"}</span>
            <h2 className="font-serif mt-3 text-[40px] md:text-[56px] leading-[1.05] max-w-2xl">
              {t.features.title}
            </h2>
          </div>
          <p className="text-[15px] text-[var(--muted-fg)] max-w-sm mt-4 md:mt-0 leading-relaxed">
            {locale === "ko"
              ? "단순한 도매가 아닌, 검증된 바이어를 위한 큐레이티드 브랜드 파트너십."
              : "Not just wholesale — a curated brand partnership for verified buyers."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)]">
          {t.features.items.map((f, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div key={i} className="bg-[var(--background)] p-8 hover:bg-[var(--card)] transition-colors group">
                <div className="flex items-start justify-between mb-12">
                  <div className="w-11 h-11 rounded-full bg-[var(--brand-light)] grid place-items-center group-hover:bg-[var(--brand)] transition-colors">
                    <Icon className="w-5 h-5 text-[var(--brand)] group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-serif italic text-[var(--muted-fg)]/60 text-2xl">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-[22px] leading-tight mb-2">{f.t}</h3>
                <p className="text-[13px] text-[var(--muted-fg)] leading-relaxed">{f.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)]/40">
        <div className="max-w-[1400px] mx-auto px-5 py-24 md:py-32">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="eyebrow">{locale === "ko" ? "베스트셀러" : "Bestsellers"}</span>
              <h2 className="font-serif mt-3 text-[40px] md:text-[56px] leading-[1.05]">
                {locale === "ko" ? "큐레이션된 베스트셀러" : "Curated Bestsellers"}
              </h2>
            </div>
            <Link href="/products" className="hidden md:inline-flex items-center gap-1 text-[13px] text-[var(--brand)] hover:text-[var(--brand-dark)] font-medium">
              {locale === "ko" ? "전체 카탈로그" : "View Catalog"}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-[var(--muted)] mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-fg)]">
                      {p.category} · 0{i + 1}
                    </div>
                    <h3 className="font-serif text-[22px] mt-1.5 leading-tight">
                      {locale === "ko" ? p.nameKo : p.nameEn}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--muted-fg)] group-hover:text-[var(--brand)] mt-1 shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-[1400px] mx-auto px-5 py-24 md:py-32">
        <div className="border border-[var(--border)] bg-[#1a1410] text-white p-12 md:p-20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--brand)]/30 blur-3xl" aria-hidden />
          <div className="relative grid md:grid-cols-2 gap-8 items-end">
            <div>
              <span className="eyebrow !text-rose-300/80">
                {locale === "ko" ? "지금 가입하세요" : "Apply now"}
              </span>
              <h2 className="font-serif text-[40px] md:text-[64px] leading-[1.02] mt-4">
                {locale === "ko" ? "검증된 바이어만의\n도매 단가." : "Wholesale pricing,\nfor verified buyers only."}
              </h2>
            </div>
            <div className="md:text-right">
              <p className="text-stone-400 text-[14px] max-w-md md:ml-auto mb-7 leading-relaxed">
                {locale === "ko"
                  ? "사업자 등록증 검증 후 영업일 24시간 이내 승인. 가입은 무료입니다."
                  : "Business license verified within 24 business hours. No application fee."}
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-white text-[#1a1410] hover:bg-stone-100">
                  {t.hero.ctaPrimary}
                  <ArrowUpRight className="w-4 h-4" />
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
    <div className="px-4 first:pl-0 last:pr-0 md:px-8">
      <div className="font-serif text-[36px] md:text-[44px] leading-none text-[var(--foreground)]">{n}</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-fg)] mt-2">{label}</div>
    </div>
  );
}
