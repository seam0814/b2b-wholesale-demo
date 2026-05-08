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
      <section className="border-b border-[var(--border)]">
        <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <span className="eyebrow">{t.hero.eyebrow}</span>
            <h1 className="font-serif mt-4 text-[34px] md:text-[44px] lg:text-[52px] leading-[1.05] text-[var(--foreground)] whitespace-pre-line tracking-tight">
              {t.hero.title}
            </h1>
            <p className="mt-5 text-[15px] text-[var(--muted-fg)] max-w-md leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {role === "guest" ? (
                <Link href="/signup">
                  <Button>
                    {t.hero.ctaPrimary}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/products">
                  <Button>
                    {t.hero.ctaSecondary}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              )}
              <Link href="/products">
                <Button variant="ghost">
                  {t.hero.ctaSecondary}
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 hidden md:block">
            <div className="aspect-[4/5] overflow-hidden bg-[var(--muted)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured[0].image} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-[var(--border)] bg-[var(--surface)]">
          <div className="max-w-[1280px] mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border)]">
            <Stat n="84" suffix="+" label={locale === "ko" ? "글로벌 바이어" : "Buyers"} />
            <Stat n="48" label={locale === "ko" ? "도매 SKU" : "SKUs"} />
            <Stat n="32" label={locale === "ko" ? "수출 국가" : "Markets"} />
            <Stat n="24" suffix="h" label={locale === "ko" ? "승인 SLA" : "Approval"} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="md:flex md:items-baseline md:justify-between mb-10 gap-8">
          <h2 className="font-serif text-[28px] md:text-[36px] leading-tight tracking-tight">
            {t.features.title}
          </h2>
          <p className="text-[14px] text-[var(--muted-fg)] max-w-sm mt-2 md:mt-0 leading-relaxed">
            {locale === "ko"
              ? "단순한 도매가 아닌, 검증된 바이어를 위한 큐레이티드 거래 시스템."
              : "Not just wholesale — a curated trading system for verified buyers."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
          {t.features.items.map((f, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div key={i} className="bg-[var(--background)] p-6 group">
                <Icon className="w-4 h-4 text-[var(--brand)] mb-8" strokeWidth={1.5} />
                <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-fg)] mb-2">
                  0{i + 1}
                </div>
                <h3 className="text-[15px] font-medium leading-tight mb-1.5">{f.t}</h3>
                <p className="text-[12px] text-[var(--muted-fg)] leading-relaxed">{f.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-t border-[var(--border)]">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-[28px] md:text-[36px] leading-tight tracking-tight">
              {locale === "ko" ? "베스트셀러" : "Bestsellers"}
            </h2>
            <Link href="/products" className="text-[12px] text-[var(--foreground)] hover:text-[var(--brand)] underline underline-offset-4 decoration-[var(--border-strong)] hover:decoration-[var(--brand)]">
              {locale === "ko" ? "전체 보기" : "View all"}
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {featured.map((p) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-[var(--muted)] mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-fg)]">
                      {p.category}
                    </div>
                    <h3 className="text-[14px] mt-1 leading-tight">
                      {locale === "ko" ? p.nameKo : p.nameEn}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--muted-fg)] group-hover:text-[var(--brand)] mt-1 shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[var(--border)]">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <div className="bg-[#1a1410] text-white p-10 md:p-16">
            <div className="grid md:grid-cols-2 gap-6 items-end">
              <div>
                <span className="eyebrow !text-stone-400">
                  {locale === "ko" ? "지금 가입" : "Apply now"}
                </span>
                <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.05] mt-3 tracking-tight whitespace-pre-line">
                  {locale === "ko" ? "검증된 바이어만의\n도매 단가." : "Wholesale pricing,\nfor verified buyers."}
                </h2>
              </div>
              <div className="md:text-right">
                <p className="text-stone-400 text-[13px] max-w-sm md:ml-auto mb-6 leading-relaxed">
                  {locale === "ko"
                    ? "사업자 등록증 검증 후 영업일 24시간 이내 승인. 가입은 무료입니다."
                    : "Business license verified within 24 hours. No fee."}
                </p>
                <Link href="/signup">
                  <Button className="bg-white !text-[#1a1410] hover:bg-stone-100">
                    {t.hero.ctaPrimary}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ n, suffix, label }: { n: string; suffix?: string; label: string }) {
  return (
    <div className="px-4 first:pl-0 last:pr-0 md:px-8">
      <div className="font-serif text-[28px] md:text-[36px] leading-none text-[var(--foreground)] tracking-tight">
        {n}
        {suffix && <span className="text-[var(--muted-fg)] text-[20px] md:text-[24px]">{suffix}</span>}
      </div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-fg)] mt-2">{label}</div>
    </div>
  );
}
