"use client";

import { OrderProvider } from "@/lib/order-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <OrderProvider>{children}</OrderProvider>;
}
