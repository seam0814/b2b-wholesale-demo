"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { dict } from "@/lib/i18n";
import { priceForRole, products } from "@/lib/mock-data";
import { formatUSD } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lock, Package, BoxesIcon, ShieldCheck } from "lucide-react";

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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link href="/products" className="text-sm text-stone-600 hover:text-pink-700 inline-flex items-center gap-1 mb-6">
        <ArrowLeft className="w-4 h-4" /> {t.common.back}
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.imageAlt} className="w-full h-full object-cover" />
        </div>

        <div>
          <Badge variant="info">{product.category}</Badge>
          <h1 className="text-3xl font-bold text-stone-900 mt-3">{name}</h1>
          <p className="text-stone-600 mt-3">{desc}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <Stat icon={Package} label="MOQ" value={`${product.moq.toLocaleString()} ${locale === "ko" ? "개" : "units"}`} />
            <Stat icon={BoxesIcon} label={t.catalog.stock} value={product.stock.toLocaleString()} />
          </div>

          <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6">
            <div className="text-xs uppercase tracking-wider text-stone-500 mb-2">
              {locale === "ko" ? "도매 단가" : "Wholesale Price"}
            </div>

            {showPrice ? (
              <>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-pink-700">{formatUSD(price)}</span>
                  <span className="text-sm text-stone-500 line-through">{formatUSD(product.retail)}</span>
                  <span className="text-xs text-green-700 font-medium">
                    {Math.round((1 - price / product.retail) * 100)}% off retail
                  </span>
                </div>
                <p className="text-sm text-stone-600 mt-1">
                  {locale === "ko" ? "단가" : "Per unit"} · {role.toUpperCase()} {t.catalog.tierLabel}
                </p>

                <div className="grid grid-cols-3 gap-3 mt-5">
                  <TierPriceCell tier="bronze" price={product.prices.bronze} active={role === "bronze"} />
                  <TierPriceCell tier="silver" price={product.prices.silver} active={role === "silver"} />
                  <TierPriceCell tier="gold" price={product.prices.gold} active={role === "gold"} />
                </div>
              </>
            ) : (
              <div className="flex items-start gap-3 py-2">
                <Lock className="w-5 h-5 text-stone-400 mt-0.5" />
                <div className="text-sm text-stone-600">
                  {role === "guest" ? t.catalog.hiddenPriceGuest : t.catalog.hiddenPricePending}
                </div>
              </div>
            )}
          </div>

          {isMember && (
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/sample-request">
                <Button size="lg">{t.catalog.requestSample}</Button>
              </Link>
              <Link href="/bulk-order">
                <Button variant="outline" size="lg">{t.catalog.addBulk}</Button>
              </Link>
            </div>
          )}

          <div className="mt-8 flex items-center gap-2 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            {locale === "ko" ? "사업자 검증 완료 회원에게만 노출되는 단가입니다." : "Pricing visible only to verified business buyers."}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-3 flex items-center gap-3">
      <Icon className="w-5 h-5 text-stone-400" />
      <div>
        <div className="text-xs text-stone-500">{label}</div>
        <div className="text-sm font-semibold text-stone-900">{value}</div>
      </div>
    </div>
  );
}

function TierPriceCell({ tier, price, active }: { tier: "bronze" | "silver" | "gold"; price: number; active: boolean }) {
  const colors: Record<string, string> = {
    bronze: "bg-amber-50 text-amber-900 border-amber-200",
    silver: "bg-slate-100 text-slate-800 border-slate-200",
    gold: "bg-yellow-50 text-yellow-900 border-yellow-200",
  };
  return (
    <div
      className={`rounded-lg border px-3 py-2 text-center ${active ? `${colors[tier]} ring-2 ring-pink-500` : "bg-stone-50 text-stone-400 border-stone-200"}`}
    >
      <div className="text-[10px] uppercase tracking-wider font-semibold">{tier}</div>
      <div className="text-sm font-bold mt-0.5">{formatUSD(price)}</div>
    </div>
  );
}
