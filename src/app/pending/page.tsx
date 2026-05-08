"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { dict } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock4, Mail } from "lucide-react";

export default function PendingPage() {
  const { locale } = useAuth();
  const t = dict[locale];

  return (
    <div className="max-w-xl mx-auto px-4 py-20">
      <Card className="p-10 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 grid place-items-center mb-5">
          <Clock4 className="w-7 h-7 text-orange-600" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mb-3">{t.auth.pendingTitle}</h1>
        <p className="text-stone-600 mb-8">{t.auth.pendingDesc}</p>

        <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 text-sm text-left mb-6">
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-stone-500 mt-0.5 shrink-0" />
            <div className="text-stone-600">
              {locale === "ko"
                ? "승인 결과는 가입 시 입력하신 이메일로 안내드립니다."
                : "We'll notify the email you provided once your application is reviewed."}
            </div>
          </div>
        </div>

        <Link href="/products">
          <Button variant="outline" size="lg">
            {locale === "ko" ? "카탈로그 둘러보기 (가격 비공개)" : "Browse catalog (prices hidden)"}
          </Button>
        </Link>
      </Card>
    </div>
  );
}
