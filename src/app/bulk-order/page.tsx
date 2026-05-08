"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { dict } from "@/lib/i18n";
import { priceForRole, products, shippingRates } from "@/lib/mock-data";
import { formatUSD } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { CheckCircle2, ShieldAlert, Truck, Package, CreditCard } from "lucide-react";

export default function BulkOrderPage() {
  const { role, locale } = useAuth();
  const t = dict[locale];

  if (role !== "bronze" && role !== "silver" && role !== "gold") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20">
        <Card className="p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 grid place-items-center mb-5">
            <ShieldAlert className="w-7 h-7 text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">
            {locale === "ko" ? "회원 전용 기능입니다" : "Members only"}
          </h2>
          <p className="text-stone-600">
            {locale === "ko"
              ? "벌크 오더는 승인된 도매 회원만 이용할 수 있습니다."
              : "Bulk orders are restricted to approved members."}
          </p>
        </Card>
      </div>
    );
  }

  const [productId, setProductId] = useState(products[0].id);
  const [qty, setQty] = useState(500);
  const [country, setCountry] = useState("United States");
  const [weight, setWeight] = useState(50);
  const [submitted, setSubmitted] = useState(false);

  const product = products.find((p) => p.id === productId)!;
  const unitPrice = priceForRole(product, role) ?? 0;
  const subtotal = useMemo(() => unitPrice * qty, [unitPrice, qty]);
  const shippingPerKg = shippingRates[country] ?? 15;
  const shipping = useMemo(() => Math.round(weight * shippingPerKg * 100) / 100, [weight, shippingPerKg]);
  const pgFee = useMemo(() => Math.round((subtotal + shipping) * 0.033 * 100) / 100, [subtotal, shipping]);
  const total = subtotal + shipping + pgFee;

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20">
        <Card className="p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-100 grid place-items-center mb-5">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            {locale === "ko" ? "견적 요청이 접수되었습니다" : "Quote request received"}
          </h2>
          <p className="text-stone-600 mb-6">
            {locale === "ko"
              ? "영업 담당자가 24시간 이내 회신드립니다."
              : "Our sales team will respond within 24 hours."}
          </p>
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            {locale === "ko" ? "추가 견적 요청" : "Request another quote"}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900">{t.bulk.title}</h1>
      <p className="text-stone-600 mt-2 mb-8">{t.bulk.desc}</p>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <Card className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-5"
          >
            <div>
              <Label>{t.bulk.product}</Label>
              <Select value={productId} onChange={(e) => setProductId(e.target.value)}>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {locale === "ko" ? p.nameKo : p.nameEn} · {formatUSD(priceForRole(p, role) ?? 0)}/unit
                  </option>
                ))}
              </Select>
              <p className="text-xs text-stone-500 mt-1">
                MOQ {product.moq.toLocaleString()} · {locale === "ko" ? "재고" : "Stock"} {product.stock.toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t.bulk.qty}</Label>
                <Input
                  type="number"
                  min={product.moq}
                  step={50}
                  value={qty}
                  onChange={(e) => setQty(Math.max(product.moq, Number(e.target.value)))}
                />
                <p className="text-xs text-stone-500 mt-1">
                  {locale === "ko" ? `최소 ${product.moq.toLocaleString()}개` : `Min ${product.moq.toLocaleString()}`}
                </p>
              </div>
              <div>
                <Label>{t.bulk.weight}</Label>
                <Input
                  type="number"
                  min={1}
                  step={1}
                  value={weight}
                  onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
                />
              </div>
            </div>

            <div>
              <Label>{t.bulk.shipTo}</Label>
              <Select value={country} onChange={(e) => setCountry(e.target.value)}>
                {Object.keys(shippingRates).map((c) => (
                  <option key={c} value={c}>
                    {c} (${shippingRates[c]}/kg)
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label>{locale === "ko" ? "추가 요청 사항" : "Additional notes"}</Label>
              <Textarea placeholder={locale === "ko" ? "예: OEM 라벨 변경 요청, 분할 배송 등" : "e.g., OEM relabeling, split shipment"} />
            </div>

            <Button type="submit" size="lg" className="w-full">{t.bulk.submit}</Button>
          </form>
        </Card>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6">
            <h3 className="font-semibold text-stone-900 mb-4">
              {locale === "ko" ? "예상 견적" : "Estimated Quote"}
            </h3>
            <div className="space-y-3 text-sm">
              <Row icon={Package} label={`${formatUSD(unitPrice)} × ${qty.toLocaleString()}`} value={formatUSD(subtotal)} />
              <Row icon={Truck} label={`${t.bulk.shippingEstimate} (${weight}kg × $${shippingPerKg})`} value={formatUSD(shipping)} />
              <Row icon={CreditCard} label={t.bulk.pgFee} value={formatUSD(pgFee)} />
              <div className="border-t border-stone-200 pt-3 flex justify-between items-baseline">
                <span className="font-semibold text-stone-900">{t.bulk.total}</span>
                <span className="text-2xl font-bold text-pink-700">{formatUSD(total)}</span>
              </div>
            </div>
            <p className="text-xs text-stone-500 mt-4 leading-relaxed">
              {locale === "ko"
                ? "* 실제 배송비는 부피·포장 기준에 따라 변동될 수 있으며, 영업 담당자가 최종 견적을 회신드립니다."
                : "* Final shipping may vary by volume/packaging. Our sales team confirms the final quote."}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-stone-600">
      <span className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-stone-400" />
        {label}
      </span>
      <span className="font-medium text-stone-900">{value}</span>
    </div>
  );
}
