"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { StarRating } from "@/components/StarRating";
import { useOrder } from "@/lib/order-context";

const STEPS = [
  { key: "enviado", label: "Pedido enviado" },
  { key: "aceptado", label: "Aceptado" },
  { key: "en_camino", label: "En camino" },
  { key: "finalizado", label: "Finalizado" },
] as const;

export default function SeguimientoPage() {
  const { order } = useOrder();
  const [stepIndex, setStepIndex] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (stepIndex >= STEPS.length - 1) return;
    const timer = setTimeout(() => setStepIndex((i) => i + 1), 3000);
    return () => clearTimeout(timer);
  }, [stepIndex]);

  useEffect(() => {
    if (stepIndex === STEPS.length - 1) {
      const t = setTimeout(() => setShowRating(true), 500);
      return () => clearTimeout(t);
    }
  }, [stepIndex]);

  return (
    <>
      <AppHeader title="Seguimiento" backHref="/cliente" />
      <main className="mx-auto max-w-lg px-4 pb-8 pt-6">
        {order && (
          <p className="mb-4 text-sm text-slate-600">
            {order.rubro} con {order.operadorNombre} · {order.direccion}
          </p>
        )}

        <ol className="space-y-0">
          {STEPS.map((step, index) => {
            const done = index <= stepIndex;
            const active = index === stepIndex;
            return (
              <li key={step.key} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                      done
                        ? "border-alden-primary bg-alden-primary text-white"
                        : "border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    {done ? <Check size={16} /> : index + 1}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`my-1 w-0.5 flex-1 min-h-[36px] ${
                        index < stepIndex ? "bg-alden-primary" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
                <div className="pb-6 pt-1">
                  <p
                    className={`font-semibold ${
                      active || done ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>
                  {active && (
                    <p className="text-xs text-alden-accent">Actualizando en vivo (demo)</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </main>

      {showRating && !submitted && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40 p-4 sm:items-center">
          <div className="w-full max-w-md rounded-2xl bg-white p-5">
            <h3 className="text-lg font-semibold">¿Cómo fue el servicio?</h3>
            <p className="mt-1 text-sm text-slate-600">Calificá a tu operador</p>
            <div className="mt-4">
              <StarRating value={stars} onChange={setStars} size={28} />
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Dejá un comentario (opcional)"
              className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              rows={3}
            />
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="mt-4 w-full rounded-2xl bg-alden-primary py-3 font-semibold text-white"
            >
              Enviar calificación
            </button>
          </div>
        </div>
      )}

      {submitted && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
          ¡Gracias por tu calificación!
        </div>
      )}
    </>
  );
}
