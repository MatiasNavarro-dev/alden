"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  ChevronLeft,
  Lock,
  MapPin,
  Shield,
  Star,
} from "lucide-react";
import { useOrder } from "@/lib/order-context";
import { ALDEN_COMMISSION_RATE, SERVICE_FEE } from "@/lib/data";
import { formatArs } from "@/lib/utils";
import { DemoFooter } from "@/components/DemoFooter";
import { OperatorAvatar } from "@/components/OperatorAvatar";

export default function PagoPage() {
  const router = useRouter();
  const { request, confirmPayment } = useOrder();

  const comision = Math.round(SERVICE_FEE * ALDEN_COMMISSION_RATE);
  const operadorId = request?.operadorId ?? "op-1";
  const operadorNombre = request?.operadorNombre ?? "Operador";
  const horario = request?.horario ?? "Hoy · 17:30";
  const direccion = request?.direccion ?? "Bv. Oroño 1250, Rosario";

  const pay = () => {
    confirmPayment();
    router.push("/seguimiento");
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-slate-100 pb-8">
      <header className="flex items-center gap-3 px-4 py-4">
        <Link
          href={request ? `/operador/${request.operadorId}` : "/cliente"}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white"
        >
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-slate-900">Confirmar y pagar</h1>
      </header>

      <main className="flex-1 space-y-4 px-4">
        <section className="rounded-2xl bg-white p-4 shadow-card">
          <div className="flex items-center gap-3">
            <OperatorAvatar id={operadorId} name={operadorNombre} />
            <div>
              <p className="text-sm font-bold text-slate-900">Servicio a domicilio</p>
              <p className="text-xs text-slate-500">
                con {operadorNombre}{" "}
                <Star size={10} className="inline fill-amber-400 text-amber-400" /> 4.9
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-sm text-slate-700">
            <p className="flex items-center gap-2">
              <Calendar size={16} className="text-slate-400" />
              Hoy, lunes 26 de octubre · <strong>{horario.replace(/HOY/i, "").trim() || "17:30"}</strong>
            </p>
            <p className="flex items-start justify-between gap-2">
              <span className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-slate-400" />
                {direccion}
              </span>
              <span className="shrink-0 text-xs font-bold text-alden-primary">Cambiar</span>
            </p>
          </div>
        </section>

        <div>
          <p className="mb-2 text-xs font-bold tracking-wide text-slate-400">RESUMEN</p>
          <section className="rounded-2xl bg-white p-4 shadow-card">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600">Servicio a domicilio (1 h)</dt>
                <dd className="font-semibold">{formatArs(SERVICE_FEE)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Comisión Alden (10%) · incluida</dt>
                <dd className="text-slate-500">{formatArs(comision)}</dd>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3 text-base">
                <dt className="font-bold">Total</dt>
                <dd className="font-bold">{formatArs(SERVICE_FEE)}</dd>
              </div>
            </dl>
            <div className="mt-3 flex gap-2 rounded-xl bg-indigo-50 p-3 text-xs leading-relaxed text-alden-primary">
              <Shield size={16} className="shrink-0" />
              Pagás un solo monto. Alden retiene su comisión y le liquida el resto a la
              operadora cada semana.
            </div>
          </section>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold tracking-wide text-slate-400">MEDIO DE PAGO</p>
          <div className="rounded-2xl border-2 border-mp bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mp text-xs font-bold text-white">
                MP
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">Mercado Pago</p>
                <p className="text-xs text-slate-500">Dinero en cuenta, tarjetas o cuotas</p>
              </div>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mp text-white">
                ✓
              </span>
            </div>
          </div>
          <button type="button" className="mt-2 text-sm font-bold text-alden-primary">
            + Agregar cupón de descuento
          </button>
        </div>
      </main>

      <div className="mt-auto px-4 pt-4">
        <button
          type="button"
          onClick={pay}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-mp py-4 text-sm font-bold text-white shadow-lg"
        >
          <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px]">MP</span>
          Pagar {formatArs(SERVICE_FEE)} con Mercado Pago
        </button>
        <p className="mt-2 flex items-center justify-center gap-1 text-center text-[11px] text-slate-500">
          <Lock size={12} />
          Pago seguro. Si el servicio no se realiza, te devolvemos el dinero.
        </p>
        <DemoFooter />
      </div>
    </div>
  );
}
