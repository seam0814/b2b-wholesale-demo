"use client";

import { useAuth } from "@/components/auth-provider";
import { dict } from "@/lib/i18n";
import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { Lock } from "lucide-react";

export default function ProductsPage() {
  const { role, locale } = useAuth();
  const t = dict[locale];
  const isGuest = role === "guest";
  const isPending = role === "pending";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">{t.catalog.title}</h1>
          <p className="text-stone-600 mt-1">
            {locale === "ko"
              ? `총 ${products.length}개 상품 · 회원 등급에 따라 단가가 자동으로 노출됩니다.`
              : `${products.length} products · pricing reveals based on your tier.`}
          </p>
        </div>
        {role === "bronze" && <TierLegend tier="bronze" />}
        {role === "silver" && <TierLegend tier="silver" />}
        {role === "gold" && <TierLegend tier="gold" />}
      </div>

      {(isGuest || isPending) && (
        <div className="mb-6 rounded-lg border border-pink-200 bg-pink-50 p-4 flex items-start gap-3">
          <Lock className="w-5 h-5 text-pink-700 mt-0.5 shrink-0" />
          <div className="text-sm text-pink-900">
            {isGuest ? t.catalog.hiddenPriceGuest : t.catalog.hiddenPricePending}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}

function TierLegend({ tier }: { tier: "bronze" | "silver" | "gold" }) {
  const colors: Record<string, string> = {
    bronze: "bg-amber-100 text-amber-900 border-amber-200",
    silver: "bg-slate-200 text-slate-800 border-slate-300",
    gold: "bg-yellow-100 text-yellow-900 border-yellow-300",
  };
  return (
    <div className={`px-4 py-2 rounded-full border text-sm font-medium ${colors[tier]} uppercase`}>
      {tier} pricing active
    </div>
  );
}
