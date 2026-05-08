import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { DemoBar } from "@/components/demo-bar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "HANEUL — Curated K-Beauty Wholesale",
  description:
    "Closed B2B wholesale platform for verified buyers. Tiered pricing, sample requests, bulk orders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <DemoBar />
          <SiteHeader />
          <main className="flex-1 animate-fade-in">{children}</main>
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
