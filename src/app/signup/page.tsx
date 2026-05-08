"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { dict } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

export default function SignupPage() {
  const { setRole, locale } = useAuth();
  const router = useRouter();
  const t = dict[locale];
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setRole("pending");
      router.push("/pending");
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card className="p-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-2">{t.auth.signupTitle}</h1>
        <p className="text-sm text-stone-600 mb-8">{t.auth.signupDesc}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label={t.auth.email}>
              <Input type="email" placeholder="buyer@example.com" required />
            </Field>
            <Field label={t.auth.password}>
              <Input type="password" placeholder="••••••••" required minLength={8} />
            </Field>
          </div>

          <div className="border-t border-stone-200 pt-5">
            <div className="text-sm font-semibold text-stone-900 mb-3">
              {locale === "ko" ? "사업자 정보" : "Business Information"}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t.auth.company}>
                <Input placeholder="ACME Trading Co., Ltd." required />
              </Field>
              <Field label={t.auth.bizNumber}>
                <Input placeholder="000-00-00000" required />
              </Field>
              <Field label={t.auth.country}>
                <Select defaultValue="" required>
                  <option value="" disabled>—</option>
                  <option>United States</option>
                  <option>Japan</option>
                  <option>China</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>United Kingdom</option>
                  <option>Thailand</option>
                  <option>Vietnam</option>
                  <option>Singapore</option>
                  <option>UAE</option>
                  <option>Australia</option>
                </Select>
              </Field>
              <Field label={t.auth.contact}>
                <Input placeholder="John Doe" required />
              </Field>
              <Field label={t.auth.phone}>
                <Input placeholder="+1 555 123 4567" required />
              </Field>
            </div>
          </div>

          <Field label={t.auth.bizDoc}>
            <label className="flex items-center justify-center gap-2 h-24 rounded-lg border-2 border-dashed border-stone-300 cursor-pointer hover:bg-stone-50 transition-colors text-stone-500 text-sm">
              <UploadCloud className="w-5 h-5" />
              <span>{locale === "ko" ? "파일 선택 또는 드래그" : "Click to upload or drag"}</span>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
            </label>
          </Field>

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? "..." : t.auth.submit}
          </Button>
        </form>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
