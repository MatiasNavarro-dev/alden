"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { useOrder } from "@/lib/order-context";
import { SERVICE_FEE, ALDEN_COMMISSION_RATE } from "@/lib/data";
import { formatArs } from "@/lib/utils";

export default function PagoPage() {
  const router = useRouter();
  const { request, confirmPayment } = useOrder();

  const comision = Math.round(SERVICE_FEE * ALDEN_COMMISSION_RATE);

  const pay = () => {
    confirmPayment();
    router.push("/seguimiento");
  };

  return (
    <>
      <AppHeader title="Pago" backHref={request ? `/operador/${request.operadorId}` : "/cliente"} />
      <main className="mx-auto max-w-lg px-4 pb-8 pt-4">
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Resumen del pedido</h2>
          {request && (
            <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
              <p>
                <span className="font-medium">Operador:</span> {request.operadorNombre}
              </p>
              <p>
                <span className="font-medium">Servicio:</span> {request.rubro}
              </p>
              <p>
                <span className="font-medium">Dirección:</span> {request.direccion}
              </p>
            </div>
          )}
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-600">Servicio a domicilio</dt>
              <dd className="font-medium">{formatArs(SERVICE_FEE)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Comisión Alden 10% incluida</dt>
              <dd className="font-medium">{formatArs(comision)}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base">
              <dt className="font-semibold text-slate-900">Total</dt>
              <dd className="font-bold text-alden-primary">{formatArs(SERVICE_FEE)}</dd>
            </div>
          </dl>
        </section>

        <button
          type="button"
          onClick={pay}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-mp py-4 text-base font-semibold text-white shadow-lg"
        >
          <span className="rounded bg-white/20 px-2 py-0.5 text-xs">MP</span>
          Pagar con Mercado Pago
        </button>
        <p className="mt-3 text-center text-xs text-slate-500">
          Pago simulado · no se realiza ningún cargo real
        </p>
      </main>
    </>
  );
}
