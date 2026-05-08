"use client";

import { useAuth } from "@/components/auth-provider";
import { dict } from "@/lib/i18n";
import { orders } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatUSD } from "@/lib/utils";
import { ShieldAlert } from "lucide-react";

export default function OrdersPage() {
  const { role, locale } = useAuth();
  const t = dict[locale];

  if (role !== "bronze" && role !== "silver" && role !== "gold") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20">
        <Card className="p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 grid place-items-center mb-5">
            <ShieldAlert className="w-7 h-7 text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">
            {locale === "ko" ? "회원 전용 페이지입니다" : "Members only"}
          </h2>
        </Card>
      </div>
    );
  }

  // Pretend the current user has 3 orders
  const myOrders = orders.slice(0, 3);
  const statusVariant: Record<string, "warning" | "info" | "success" | "neutral"> = {
    pending: "warning",
    quoted: "info",
    paid: "info",
    shipped: "info",
    delivered: "success",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">{t.orders.title}</h1>

      {myOrders.length === 0 ? (
        <Card className="p-10 text-center text-stone-500">{t.orders.empty}</Card>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-4 py-3 font-medium">{t.orders.cols.id}</th>
                <th className="text-left px-4 py-3 font-medium">{t.orders.cols.date}</th>
                <th className="text-left px-4 py-3 font-medium">{t.orders.cols.type}</th>
                <th className="text-left px-4 py-3 font-medium">{t.orders.cols.status}</th>
                <th className="text-right px-4 py-3 font-medium">{t.orders.cols.total}</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o) => (
                <tr key={o.id} className="border-t border-stone-100 hover:bg-stone-50">
                  <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
                  <td className="px-4 py-3 text-stone-600">{o.date}</td>
                  <td className="px-4 py-3">
                    <Badge variant={o.type === "bulk" ? "info" : "neutral"}>{t.orders.types[o.type]}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[o.status]}>{t.orders.status[o.status]}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {o.total > 0 ? formatUSD(o.total) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
