"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useAuth } from "./auth-provider";
import { dict } from "@/lib/i18n";
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
    <Link href={`/products/${p.slug}`} className="group block">
      <div className="aspect-[4/5] relative overflow-hidden bg-[var(--muted)] mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={p.imageAlt}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 left-3">
          <span className="text-[10px] uppercase tracking-[0.18em] bg-white/90 backdrop-blur px-2 py-1 text-[var(--foreground)]">
            {p.category}
          </span>
        </div>
        {!showPrice && (
          <div className="absolute inset-0 bg-[#1a1410]/45 grid place-items-center backdrop-blur-[1px]">
            <div className="text-center px-4">
              <Lock className="w-5 h-5 text-white mx-auto mb-2" />
              <div className="text-[11px] text-white font-medium max-w-[180px]">
                {role === "guest" ? t.catalog.hiddenPriceGuest : t.catalog.hiddenPricePending}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-serif text-[18px] leading-tight text-[var(--foreground)] line-clamp-2">{name}</h3>
        <div className="text-[11px] text-[var(--muted-fg)] uppercase tracking-wider">
          MOQ {p.moq.toLocaleString()} · {locale === "ko" ? "재고" : "Stock"} {p.stock.toLocaleString()}
        </div>
        <div className="flex items-end justify-between mt-2 pt-2 border-t border-[var(--border)]">
          {showPrice ? (
            <div>
              <div className="text-[11px] text-[var(--muted-fg)]/70 line-through">{formatUSD(p.retail)}</div>
              <div className="font-serif text-[20px] text-[var(--brand)] leading-none mt-0.5">
                {formatUSD(price)}
              </div>
            </div>
          ) : (
            <div className="text-[13px] text-[var(--muted-fg)]/60 tracking-widest">— — —</div>
          )}
          {role === "bronze" && <Badge variant="bronze">Bronze</Badge>}
          {role === "silver" && <Badge variant="silver">Silver</Badge>}
          {role === "gold" && <Badge variant="gold">Gold</Badge>}
        </div>
      </div>
    </Link>
  );
}
