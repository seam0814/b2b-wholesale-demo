"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useAuth } from "./auth-provider";
import { dict } from "@/lib/i18n";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { priceForRole, type Product } from "@/lib/mock-data";
import { formatUSD } from "@/lib/utils";

export function ProductCard({ p }: { p: Product }) {
  const { role, locale } = useAuth();
  const t = dict[locale];
  const price = priceForRole(p, role);
  const showPrice = price !== null;
  const name = locale === "ko" ? p.nameKo : p.nameEn;

  return (
    <Link href={`/products/${p.slug}`} className="group">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="aspect-[4/3] relative bg-stone-100 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={p.imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="info" className="bg-white/90 backdrop-blur">
              {p.category}
            </Badge>
          </div>
          {!showPrice && (
            <div className="absolute inset-0 bg-stone-900/40 grid place-items-center backdrop-blur-[1px]">
              <div className="text-center px-4">
                <Lock className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-xs text-white font-medium">
                  {role === "guest" ? t.catalog.hiddenPriceGuest : t.catalog.hiddenPricePending}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col gap-2 flex-1">
          <h3 className="font-medium text-stone-900 line-clamp-2">{name}</h3>
          <div className="text-xs text-stone-500">
            MOQ {p.moq.toLocaleString()} · {locale === "ko" ? "재고" : "Stock"} {p.stock.toLocaleString()}
          </div>
          <div className="mt-auto flex items-end justify-between pt-2">
            {showPrice ? (
              <div>
                <div className="text-xs text-stone-500 line-through">{formatUSD(p.retail)}</div>
                <div className="text-lg font-bold text-pink-700">{formatUSD(price)}</div>
              </div>
            ) : (
              <div className="text-sm text-stone-400">— — —</div>
            )}
            {role === "bronze" && <Badge variant="bronze">Bronze</Badge>}
            {role === "silver" && <Badge variant="silver">Silver</Badge>}
            {role === "gold" && <Badge variant="gold">Gold</Badge>}
          </div>
        </div>
      </Card>
    </Link>
  );
}
