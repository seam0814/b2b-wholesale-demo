"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { dict } from "@/lib/i18n";
import { priceForRole, products } from "@/lib/mock-data";
import { formatUSD, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { role, locale } = useAuth();
  const t = dict[locale];
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  const price = priceForRole(product, role);
  const showPrice = price !== null;
  const isMember = role === "bronze" || role === "silver" || role === "gold";
  const name = locale === "ko" ? product.nameKo : product.nameEn;
  const desc = locale === "ko" ? product.descKo : product.descEn;

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">
      <Link href="/products" className="text-[11px] tracking-[0.18em] text-[var(--muted-fg)] hover:text-[var(--brand)] inline-flex items-center gap-1.5 mb-8 uppercase">
        <ArrowLeft className="w-3 h-3" /> {t.common.back}
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="aspect-[4/5] overflow-hidden bg-[var(--muted)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.imageAlt} className="w-full h-full object-cover" />
        </div>

        <div className="lg:py-4">
          <span className="eyebrow">{product.category}</span>
          <h1 className="font-serif text-[28px] md:text-[36px] leading-tight tracking-tight mt-3 text-[var(--foreground)]">
            {name}
          </h1>
          <p className="text-[14px] text-[var(--muted-fg)] mt-4 leading-relaxed max-w-md">{desc}</p>

          <div className="mt-8 grid grid-cols-2 gap-px bg-[var(--border)] max-w-md">
            <div className="bg-[var(--background)] p-4">
              <div className="eyebrow !text-[10px]">MOQ</div>
              <div className="font-serif text-[24px] mt-1 leading-none">
                {product.moq.toLocaleString()}
              </div>
              <div className="text-[11px] text-[var(--muted-fg)] mt-1">
                {locale === "ko" ? "최소 발주" : "Min Order"}
              </div>
            </div>
            <div className="bg-[var(--background)] p-4">
              <div className="eyebrow !text-[10px]">{t.catalog.stock}</div>
              <div className="font-serif text-[24px] mt-1 leading-none">
                {(product.stock / 1000).toFixed(1)}k
              </div>
              <div className="text-[11px] text-[var(--muted-fg)] mt-1">
                {locale === "ko" ? "재고 단위" : "Available Units"}
              </div>
            </div>
          </div>

          {/* Price block */}
          <div className="mt-10 border-t border-[var(--border)] pt-8">
            <div className="eyebrow mb-3">
              {locale === "ko" ? "도매 단가" : "Wholesale Price"}
            </div>

            {showPrice ? (
              <>
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-[36px] md:text-[44px] leading-none text-[var(--brand)] tracking-tight">
                    {formatUSD(price)}
                  </span>
                  <div>
                    <div className="text-[12px] text-[var(--muted-fg)]/80 line-through">
                      {formatUSD(product.retail)}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-emerald-700 font-semibold mt-0.5">
                      {Math.round((1 - price / product.retail) * 100)}% off retail
                    </div>
                  </div>
                </div>
                <p className="text-[12px] text-[var(--muted-fg)] mt-3 uppercase tracking-wider">
                  {role.toUpperCase()} {t.catalog.tierLabel} · {locale === "ko" ? "단가" : "Per unit"}
                </p>

                <div className="grid grid-cols-3 gap-px bg-[var(--border)] mt-6">
                  <TierPriceCell tier="bronze" price={product.prices.bronze} active={role === "bronze"} />
                  <TierPriceCell tier="silver" price={product.prices.silver} active={role === "silver"} />
                  <TierPriceCell tier="gold" price={product.prices.gold} active={role === "gold"} />
                </div>
              </>
            ) : (
              <div className="flex items-start gap-3 py-2">
                <Lock className="w-5 h-5 text-[var(--muted-fg)] mt-0.5" />
                <div className="text-[14px] text-[var(--muted-fg)] max-w-md">
                  {role === "guest" ? t.catalog.hiddenPriceGuest : t.catalog.hiddenPricePending}
                </div>
              </div>
            )}
          </div>

          {isMember && (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sample-request">
                <Button size="lg">{t.catalog.requestSample}</Button>
              </Link>
              <Link href="/bulk-order">
                <Button variant="outline" size="lg">{t.catalog.addBulk}</Button>
              </Link>
            </div>
          )}

          <div className="mt-10 flex items-center gap-2 text-[11px] text-[var(--muted-fg)] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            {locale === "ko" ? "사업자 검증 회원 전용 단가" : "Verified buyers only"}
          </div>
        </div>
      </div>
    </div>
  );
}

function TierPriceCell({ tier, price, active }: { tier: "bronze" | "silver" | "gold"; price: number; active: boolean }) {
  return (
    <div
      className={cn(
        "p-3 text-center",
        active
          ? "bg-[var(--brand)] text-white"
          : "bg-[var(--background)] text-[var(--muted-fg)]",
      )}
    >
      <div className="text-[9px] uppercase tracking-[0.2em] font-semibold opacity-80">{tier}</div>
      <div className={cn("font-serif text-[20px] mt-1 leading-none", active ? "" : "text-[var(--foreground)]")}>
        {formatUSD(price)}
      </div>
    </div>
  );
}
