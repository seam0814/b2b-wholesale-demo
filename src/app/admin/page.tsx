"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { dict } from "@/lib/i18n";
import { members as initialMembers, orders, pendingApplications as initialPending, products, type Tier } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/input";
import { formatUSD } from "@/lib/utils";
import { ShieldAlert, Users, Clock4, ShoppingCart, TrendingUp, Check, X } from "lucide-react";

export default function AdminPage() {
  const { role, locale } = useAuth();
  const t = dict[locale];

  const [pending, setPending] = useState(initialPending);
  const [members, setMembers] = useState(initialMembers);
  const [tab, setTab] = useState<"pending" | "members" | "products" | "orders">("pending");

  if (role !== "admin") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20">
        <Card className="p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 grid place-items-center mb-5">
            <ShieldAlert className="w-7 h-7 text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">
            {locale === "ko" ? "관리자 권한이 필요합니다" : "Admin only"}
          </h2>
          <p className="text-stone-600">
            {locale === "ko"
              ? "상단 데모 바에서 관리자로 전환하세요."
              : "Switch to Admin via the demo bar above."}
          </p>
        </Card>
      </div>
    );
  }

  const totalRevenue = orders.filter((o) => o.status !== "pending").reduce((s, o) => s + o.total, 0);

  const approve = (id: string, tier: Tier = "bronze") => {
    const app = pending.find((a) => a.id === id);
    if (!app) return;
    setPending(pending.filter((a) => a.id !== id));
    setMembers([
      {
        id: `m${Date.now()}`,
        email: app.email,
        company: app.company,
        country: app.country,
        tier,
        ytdVolume: 0,
        joinedAt: app.appliedAt,
      },
      ...members,
    ]);
  };
  const reject = (id: string) => setPending(pending.filter((a) => a.id !== id));

  const tabs: { id: typeof tab; label: string; count?: number }[] = [
    { id: "pending", label: t.admin.pending, count: pending.length },
    { id: "members", label: t.admin.members, count: members.length },
    { id: "products", label: t.admin.products, count: products.length },
    { id: "orders", label: t.admin.orders, count: orders.length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-900">{t.admin.title}</h1>
      <p className="text-stone-600 mt-1 mb-8">
        {locale === "ko" ? `오늘 ${t.admin.stats.title}` : `Today's ${t.admin.stats.title}`}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label={t.admin.stats.members} value={members.length.toString()} accent="blue" />
        <StatCard icon={Clock4} label={t.admin.stats.pending} value={pending.length.toString()} accent="orange" />
        <StatCard icon={ShoppingCart} label={t.admin.stats.orders} value={orders.length.toString()} accent="pink" />
        <StatCard icon={TrendingUp} label={t.admin.stats.revenue} value={formatUSD(totalRevenue)} accent="green" />
      </div>

      <div className="flex gap-1 border-b border-stone-200 mb-6 overflow-x-auto">
        {tabs.map((x) => (
          <button
            key={x.id}
            onClick={() => setTab(x.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              tab === x.id
                ? "border-pink-600 text-pink-700"
                : "border-transparent text-stone-600 hover:text-stone-900"
            }`}
          >
            {x.label}
            {typeof x.count === "number" && (
              <span className="ml-2 text-xs bg-stone-100 px-2 py-0.5 rounded-full">{x.count}</span>
            )}
          </button>
        ))}
      </div>

      {tab === "pending" && (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-4 py-3 font-medium">{locale === "ko" ? "회사" : "Company"}</th>
                <th className="text-left px-4 py-3 font-medium">{locale === "ko" ? "국가" : "Country"}</th>
                <th className="text-left px-4 py-3 font-medium">{locale === "ko" ? "사업자번호" : "Biz #"}</th>
                <th className="text-left px-4 py-3 font-medium">{locale === "ko" ? "신청일" : "Applied"}</th>
                <th className="text-right px-4 py-3 font-medium">{locale === "ko" ? "조치" : "Action"}</th>
              </tr>
            </thead>
            <tbody>
              {pending.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-stone-500">
                  {locale === "ko" ? "승인 대기 중인 신청이 없습니다." : "No pending applications."}
                </td></tr>
              ) : pending.map((a) => (
                <tr key={a.id} className="border-t border-stone-100">
                  <td className="px-4 py-3">
                    <div className="font-medium text-stone-900">{a.company}</div>
                    <div className="text-xs text-stone-500">{a.email} · {a.contact}</div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{a.country}</td>
                  <td className="px-4 py-3 font-mono text-xs">{a.bizNumber}</td>
                  <td className="px-4 py-3 text-stone-600">{a.appliedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button variant="primary" size="sm" onClick={() => approve(a.id, "bronze")}>
                        <Check className="w-3.5 h-3.5" />
                        {t.admin.approve}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => reject(a.id)}>
                        <X className="w-3.5 h-3.5" />
                        {t.admin.reject}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === "members" && (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-4 py-3 font-medium">{locale === "ko" ? "회사" : "Company"}</th>
                <th className="text-left px-4 py-3 font-medium">{locale === "ko" ? "국가" : "Country"}</th>
                <th className="text-left px-4 py-3 font-medium">{t.admin.tier}</th>
                <th className="text-right px-4 py-3 font-medium">YTD {locale === "ko" ? "거래액" : "Volume"}</th>
                <th className="text-left px-4 py-3 font-medium">{locale === "ko" ? "가입일" : "Joined"}</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-t border-stone-100">
                  <td className="px-4 py-3">
                    <div className="font-medium text-stone-900">{m.company}</div>
                    <div className="text-xs text-stone-500">{m.email}</div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{m.country}</td>
                  <td className="px-4 py-3">
                    <Select
                      value={m.tier}
                      onChange={(e) =>
                        setMembers(members.map((x) => x.id === m.id ? { ...x, tier: e.target.value as Tier } : x))
                      }
                      className="!h-8 !w-28 !text-xs"
                    >
                      <option value="bronze">Bronze</option>
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                    </Select>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">{formatUSD(m.ytdVolume)}</td>
                  <td className="px-4 py-3 text-stone-600">{m.joinedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === "products" && (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-4 py-3 font-medium">{locale === "ko" ? "상품" : "Product"}</th>
                <th className="text-left px-4 py-3 font-medium">{t.catalog.category}</th>
                <th className="text-right px-4 py-3 font-medium">Bronze</th>
                <th className="text-right px-4 py-3 font-medium">Silver</th>
                <th className="text-right px-4 py-3 font-medium">Gold</th>
                <th className="text-right px-4 py-3 font-medium">{locale === "ko" ? "재고" : "Stock"}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-stone-100">
                  <td className="px-4 py-3 font-medium text-stone-900">{locale === "ko" ? p.nameKo : p.nameEn}</td>
                  <td className="px-4 py-3 text-stone-600">{p.category}</td>
                  <td className="px-4 py-3 text-right">{formatUSD(p.prices.bronze)}</td>
                  <td className="px-4 py-3 text-right">{formatUSD(p.prices.silver)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-pink-700">{formatUSD(p.prices.gold)}</td>
                  <td className="px-4 py-3 text-right text-stone-600">{p.stock.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === "orders" && (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-4 py-3 font-medium">{t.orders.cols.id}</th>
                <th className="text-left px-4 py-3 font-medium">{locale === "ko" ? "회원" : "Member"}</th>
                <th className="text-left px-4 py-3 font-medium">{t.orders.cols.type}</th>
                <th className="text-left px-4 py-3 font-medium">{t.orders.cols.status}</th>
                <th className="text-right px-4 py-3 font-medium">{t.orders.cols.total}</th>
                <th className="text-left px-4 py-3 font-medium">{t.orders.cols.date}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const sv: Record<string, "warning" | "info" | "success" | "neutral"> = {
                  pending: "warning", quoted: "info", paid: "info", shipped: "info", delivered: "success",
                };
                return (
                  <tr key={o.id} className="border-t border-stone-100">
                    <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
                    <td className="px-4 py-3 text-stone-600">{o.memberEmail}</td>
                    <td className="px-4 py-3">
                      <Badge variant={o.type === "bulk" ? "info" : "neutral"}>{t.orders.types[o.type]}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={sv[o.status]}>{t.orders.status[o.status]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">{o.total > 0 ? formatUSD(o.total) : "—"}</td>
                    <td className="px-4 py-3 text-stone-600">{o.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; accent: "blue" | "orange" | "pink" | "green" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-orange-50 text-orange-700",
    pink: "bg-pink-50 text-pink-700",
    green: "bg-green-50 text-green-700",
  };
  return (
    <Card className="p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg grid place-items-center ${colors[accent]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-xs text-stone-500 uppercase tracking-wider">{label}</div>
        <div className="text-xl font-bold text-stone-900 mt-0.5">{value}</div>
      </div>
    </Card>
  );
}
