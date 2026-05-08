"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role } from "@/lib/mock-data";
import type { Locale } from "@/lib/i18n";

type AuthState = {
  role: Role;
  setRole: (r: Role) => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("guest");
  const [locale, setLocaleState] = useState<Locale>("ko");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const r = localStorage.getItem("demo-role") as Role | null;
    const l = localStorage.getItem("demo-locale") as Locale | null;
    if (r) setRoleState(r);
    if (l) setLocaleState(l);
    setHydrated(true);
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    localStorage.setItem("demo-role", r);
  };
  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("demo-locale", l);
  };

  return (
    <AuthContext.Provider value={{ role, setRole, locale, setLocale }}>
      <div style={{ visibility: hydrated ? "visible" : "hidden" }}>{children}</div>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}

export function useT() {
  const { locale } = useAuth();
  return { locale };
}
