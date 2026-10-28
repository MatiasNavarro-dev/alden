"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  ChevronLeft,
  Heart,
  Star,
} from "lucide-react";
import { getOperatorById, getReviewsForOperator, SERVICE_FEE } from "@/lib/data";
import { useOrder } from "@/lib/order-context";
import { distanceFromClient, formatArs } from "@/lib/utils";
import { DemoFooter } from "@/components/DemoFooter";
import { OperatorAvatar } from "@/components/OperatorAvatar";

const DAYS = [
  { key: "hoy", label: "HOY", num: "26" },
  { key: "mar", label: "MAR", num: "27" },
  { key: "mie", label: "MIÉ", num: "28" },
  { key: "jue", label: "JUE", num: "29" },
  { key: "vie", label: "VIE", num: "30" },
];

const TIMES = ["15:00", "16:30", "17:30", "19:00"];

export default function OperadorDetailPage({ params }: { params: { id: string } }) {
  const operator = getOperatorById(params.id);
  const router = useRouter();
  const { setRequest } = useOrder();
  const [service, setService] = useState<"domicilio" | "express">("domicilio");
  const [day, setDay] = useState("hoy");
  const [time, setTime] = useState("17:30");
  const [direccion] = useState("Bv. Oroño 1250, Rosario");

  const reviews = useMemo(
    () => (operator ? getReviewsForOperator(operator.id).slice(0, 1) : []),
    [operator]
  );

  if (!operator) {
    return (
      <p className="p-6 text-center text-slate-600">Operador no encontrado.</p>
    );
  }

  const submit = () => {
    const dayLabel = DAYS.find((d) => d.key === day)?.label ?? "HOY";
    setRequest({
      operadorId: operator.id,
      operadorNombre: operator.nombre,
      rubro: operator.rubro,
      direccion,
      descripcion: `${operator.rubro} · ${service === "domicilio" ? "Servicio a domicilio" : "Servicio express"}`,
      horario: `${dayLabel} ${time}`,
      fotosSimuladas: 0,
    });
    router.push("/pago");
  };

  const price = service === "domicilio" ? SERVICE_FEE : 9500;

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-slate-50 pb-28">
      <div className="relative bg-alden-primary px-4 pb-16 pt-4 text-white">
        <div className="flex items-center justify-between">
          <Link
            href="/cliente"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"
          >
            <ChevronLeft size={20} />
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"
            aria-label="Favorito"
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      <div className="relative -mt-12 px-4">
        <section className="rounded-3xl bg-white p-4 shadow-card">
          <div className="flex gap-3">
            <OperatorAvatar id={operator.id} name={operator.nombre} size="xl" />
            <div>
              <div className="flex items-center gap-1">
                <h1 className="text-lg font-bold text-alden-primary">{operator.nombre}</h1>
                {operator.matriculaVerificada && (
                  <BadgeCheck size={16} className="text-sky-500" />
                )}
              </div>
              <p className="text-xs text-slate-500">Operador verificada · desde 2025</p>
              <p className="mt-2 text-xs text-slate-600">
                <Star size={12} className="mr-0.5 inline fill-amber-400 text-amber-400" />
                {operator.calificacion} ({operator.reseñas}) ·{" "}
                {distanceFromClient(operator.lat, operator.lng)} · 412 servicios
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-xs font-bold tracking-wide text-slate-400">SERVICIOS</h2>
          <div className="mt-2 space-y-2">
            {[
              { id: "domicilio" as const, title: "Servicio a domicilio", sub: "1 h aprox.", p: SERVICE_FEE },
              { id: "express" as const, title: "Servicio express", sub: "30 min aprox.", p: 9500 },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setService(s.id)}
                className={`flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3 text-left ${
                  service === s.id ? "border-alden-primary bg-indigo-50/40" : "border-slate-100 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      service === s.id
                        ? "border-alden-primary"
                        : "border-slate-300"
                    }`}
                  >
                    {service === s.id && (
                      <span className="h-2.5 w-2.5 rounded-full bg-alden-primary" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{s.title}</p>
                    <p className="text-xs text-slate-500">{s.sub}</p>
                  </div>
                </div>
                <span className="text-sm font-bold">{formatArs(s.p)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-xs font-bold tracking-wide text-slate-400">
            ELEGÍ DÍA Y HORARIO
          </h2>
          <div className="mt-2 flex gap-2 overflow-x-auto scrollbar-hide">
            {DAYS.map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => setDay(d.key)}
                className={`min-w-[3.5rem] rounded-2xl px-3 py-2 text-center ${
                  day === d.key
                    ? "bg-alden-primary text-white"
                    : "border border-slate-200 bg-white text-slate-700"
                }`}
              >
                <p className="text-[10px] font-semibold opacity-80">{d.label}</p>
                <p className="text-lg font-bold">{d.num}</p>
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {TIMES.map((t) => {
              const disabled = t === "15:00";
              return (
                <button
                  key={t}
                  type="button"
                  disabled={disabled}
                  onClick={() => setTime(t)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    disabled
                      ? "text-slate-300 line-through"
                      : time === t
                        ? "bg-alden-primary text-white"
                        : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold tracking-wide text-slate-400">RESEÑAS</h2>
            <span className="text-xs font-semibold text-alden-primary">
              Ver las {operator.reseñas}
            </span>
          </div>
          {reviews.map((r) => (
            <div
              key={r.id}
              className="mt-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold">
                    {r.autor.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{r.autor}</p>
                    <p className="text-xs text-slate-400">hace 3 días</p>
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: r.estrellas }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-600">{r.comentario}</p>
            </div>
          ))}
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-4 py-3 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500">
              Hoy, {time}
            </p>
            <p className="text-xl font-bold text-alden-primary">{formatArs(price)}</p>
          </div>
          <button
            type="button"
            onClick={submit}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-alden-accent py-3.5 text-sm font-bold text-white"
          >
            Solicitar <ArrowLeft size={16} className="rotate-180" />
          </button>
        </div>
      </div>
      <DemoFooter className="fixed bottom-[4.5rem] left-0 right-0" />
    </div>
  );
}
