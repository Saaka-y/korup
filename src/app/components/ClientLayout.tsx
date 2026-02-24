"use client";
import { useAuthCheck } from "@/app/hooks/useAuthCheck";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useAuthCheck();
  return <>{children}</>;
}
