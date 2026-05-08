"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { dict } from "@/lib/i18n";
import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const { role, locale } = useAuth();
  const t = dict[locale];
  const isGuest = role === "guest";
  const isPending = role === "pending";
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      <div className="mb-10">
        <span className="eyebrow">{locale === "ko" ? "도매 카탈로그" : "Wholesale Catalog"}</span>
        <div className="md:flex md:items-baseline md:justify-between mt-3 gap-8">
          <h1 className="font-serif text-[32px] md:text-[44px] leading-tight tracking-tight max-w-2xl">
            {t.catalog.title}
          </h1>
          <p className="text-[13px] text-[var(--muted-fg)] max-w-sm mt-2 md:mt-0 leading-relaxed">
            {locale === "ko"
              ? `총 ${products.length}개 · 회원 등급에 따라 단가 노출.`
              : `${products.length} products · pricing reveals by tier.`}
          </p>
        </div>
      </div>

      {(isGuest || isPending) && (
        <div className="mb-10 border border-[var(--brand)]/15 bg-[var(--brand-light)] px-5 py-4 flex items-start gap-3">
          <Lock className="w-4 h-4 text-[var(--brand)] mt-0.5 shrink-0" />
          <div className="text-[13px] text-[var(--brand-dark)]">
            {isGuest ? t.catalog.hiddenPriceGuest : t.catalog.hiddenPricePending}
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="flex flex-wrap gap-1 mb-10 border-b border-[var(--border)] pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={cn(
              "px-3 py-2.5 text-[13px] tracking-wide transition-colors border-b-2 -mb-px",
              activeCategory === c
                ? "border-[var(--brand)] text-[var(--brand)] font-medium"
                : "border-transparent text-[var(--muted-fg)] hover:text-[var(--foreground)]",
            )}
          >
            {c}
          </button>
        ))}
        {(role === "bronze" || role === "silver" || role === "gold") && (
          <span className="ml-auto text-[10px] uppercase tracking-[0.18em] self-center px-3 py-2 text-[var(--brand)]">
            {role} {locale === "ko" ? "단가 적용" : "pricing active"}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
