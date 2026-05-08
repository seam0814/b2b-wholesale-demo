import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { DemoBar } from "@/components/demo-bar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumière Beauty — Global K-Beauty B2B Wholesale",
  description:
    "Closed B2B wholesale platform for verified buyers. Tiered pricing, sample requests, bulk orders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
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
