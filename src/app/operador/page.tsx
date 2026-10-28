"use client";

import { Suspense } from "react";
import OperadorPanelInner from "./OperadorPanelInner";

export default function OperadorPanelPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Cargando…</div>}>
      <OperadorPanelInner />
    </Suspense>
  );
}
