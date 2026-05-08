"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { dict } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const { setRole, locale } = useAuth();
  const router = useRouter();
  const t = dict[locale];
  const [email, setEmail] = useState("buyer@nydermart.com");
  const [password, setPassword] = useState("••••••••");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: log in as silver tier
    setRole("silver");
    router.push("/products");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <Card className="p-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-2">{t.auth.loginTitle}</h1>
        <p className="text-sm text-stone-600 mb-6">
          {locale === "ko"
            ? "데모 환경입니다. 아무 정보나 입력하셔도 Silver 회원으로 로그인됩니다."
            : "Demo environment. Any input logs you in as a Silver-tier member."}
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">{t.auth.email}</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">{t.auth.password}</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" size="lg">
            {t.auth.loginSubmit}
          </Button>
        </form>
        <p className="text-sm text-stone-600 mt-6 text-center">
          {locale === "ko" ? "아직 회원이 아니신가요?" : "Not a member yet?"}{" "}
          <Link href="/signup" className="text-pink-700 hover:underline font-medium">
            {t.nav.signup}
          </Link>
        </p>
      </Card>
    </div>
  );
}
