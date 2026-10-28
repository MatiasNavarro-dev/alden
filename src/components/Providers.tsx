"use client";

import { OrderProvider } from "@/lib/order-context";
import { DemoBanner } from "@/components/DemoBanner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OrderProvider>
      <DemoBanner />
      {children}
    </OrderProvider>
  );
}
