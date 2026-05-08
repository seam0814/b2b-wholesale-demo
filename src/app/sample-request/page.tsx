"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { dict } from "@/lib/i18n";
import { products } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea, Select } from "@/components/ui/input";
import { Trash2, Plus, CheckCircle2, ShieldAlert } from "lucide-react";

type Row = { productId: string; qty: number };

export default function SampleRequestPage() {
  const { role, locale } = useAuth();
  const t = dict[locale];
  const [rows, setRows] = useState<Row[]>([{ productId: products[0].id, qty: 1 }]);
  const [submitted, setSubmitted] = useState(false);

  if (role !== "bronze" && role !== "silver" && role !== "gold") {
    return <NotAllowed locale={locale} />;
  }

  const addRow = () => {
    if (rows.length >= 5) return;
    const used = new Set(rows.map((r) => r.productId));
    const next = products.find((p) => !used.has(p.id))?.id ?? products[0].id;
    setRows([...rows, { productId: next, qty: 1 }]);
  };
  const removeRow = (i: number) => setRows(rows.filter((_, idx) => idx !== i));
  const updateRow = (i: number, patch: Partial<Row>) =>
    setRows(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) return <SuccessScreen onReset={() => { setSubmitted(false); setRows([{ productId: products[0].id, qty: 1 }]); }} locale={locale} />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900">{t.sample.title}</h1>
      <p className="text-stone-600 mt-2 mb-8">{t.sample.desc}</p>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            {rows.map((r, i) => (
              <div key={i} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label>{locale === "ko" ? "상품" : "Product"}</Label>
                  <Select
                    value={r.productId}
                    onChange={(e) => updateRow(i, { productId: e.target.value })}
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {locale === "ko" ? p.nameKo : p.nameEn}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="w-28">
                  <Label>{t.sample.qty}</Label>
                  <Input
                    type="number"
                    min={1}
                    max={2}
                    value={r.qty}
                    onChange={(e) => updateRow(i, { qty: Number(e.target.value) })}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => removeRow(i)}
                  disabled={rows.length === 1}
                  className="!px-3"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {rows.length < 5 && (
            <Button type="button" variant="ghost" onClick={addRow}>
              <Plus className="w-4 h-4" /> {locale === "ko" ? "상품 추가" : "Add product"}
            </Button>
          )}

          <div>
            <Label>{t.sample.reason}</Label>
            <Textarea placeholder={locale === "ko" ? "예: 일본 도쿄 백화점 입점 검토용" : "e.g., Evaluation for Tokyo department store launch"} />
          </div>

          <Button type="submit" size="lg" className="w-full">{t.sample.submit}</Button>
        </form>
      </Card>
    </div>
  );
}

function SuccessScreen({ onReset, locale }: { onReset: () => void; locale: "ko" | "en" }) {
  return (
    <div className="max-w-xl mx-auto px-4 py-20">
      <Card className="p-10 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 grid place-items-center mb-5">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">
          {locale === "ko" ? "샘플 요청이 접수되었습니다" : "Sample request received"}
        </h2>
        <p className="text-stone-600 mb-6">
          {locale === "ko"
            ? "영업일 기준 1~2일 이내에 발송됩니다. 주문 내역에서 진행 상태를 확인하실 수 있습니다."
            : "We'll ship within 1–2 business days. Track status in My Orders."}
        </p>
        <Button onClick={onReset} variant="outline">
          {locale === "ko" ? "추가 요청하기" : "Make another request"}
        </Button>
      </Card>
    </div>
  );
}

function NotAllowed({ locale }: { locale: "ko" | "en" }) {
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
            ? "샘플 요청은 승인된 도매 회원만 이용할 수 있습니다. 상단 데모 바에서 Bronze/Silver/Gold로 전환해보세요."
            : "Sample requests are restricted to approved members. Switch to Bronze/Silver/Gold via the demo bar above."}
        </p>
      </Card>
    </div>
  );
}
