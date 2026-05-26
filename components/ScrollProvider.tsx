"use client";

import { useLenis } from "@/hooks/useLenis";

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}
