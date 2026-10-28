"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  MessageCircle,
  Phone,
  Shield,
  X,
} from "lucide-react";
import { useOrder } from "@/lib/order-context";
import { operators, SERVICE_FEE } from "@/lib/data";
import { StarRating } from "@/components/StarRating";
import { DemoFooter } from "@/components/DemoFooter";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { OperatorAvatar } from "@/components/OperatorAvatar";
import { firstName } from "@/lib/ui";
import { formatArs } from "@/lib/utils";

const ClientMap = dynamic(() => import("@/components/ClientMap"), { ssr: false });

const STEPS = [
  { label: "Solicitado", time: "17:02" },
  { label: "Aceptado", time: "17:04" },
  { label: "En camino", time: "ahora" },
  { label: "Finalizado", time: "~18:30" },
] as const;

const TAGS = ["Puntual", "Amable", "Prolijo", "Buen precio", "Lo recomiendo"];

export default function SeguimientoPage() {
  const { order } = useOrder();
  const [stepIndex, setStepIndex] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [stars, setStars] = useState(4);
  const [tags, setTags] = useState<string[]>(["Puntual", "Amable"]);
  const [comment, setComment] = useState(
    "Muy buena atención, llegó a horario y explicó todo. Solo tardó un poco más de lo estimado."
  );
  const [submitted, setSubmitted] = useState(false);

  const opName = order?.operadorNombre ?? operators[1]?.nombre ?? "Lucía Fernández";
  const opId = order?.operadorId ?? operators[1]?.id ?? "op-2";

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

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const ratingLabel =
    stars >= 5 ? "Excelente" : stars >= 4 ? "Muy bueno" : stars >= 3 ? "Bueno" : "Regular";

  return (
    <div className="relative mx-auto h-dvh max-w-md overflow-hidden bg-slate-200">
      <div className="absolute inset-0 top-0 h-[55%]">
        <ClientMap operators={operators.slice(0, 4)} />
        <Link
          href="/cliente"
          className="absolute left-4 top-4 z-[600] flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-semibold shadow-md"
        >
          <ChevronLeft size={14} /> Pedido #A-1042
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[600] max-h-[58vh] overflow-y-auto rounded-t-[1.75rem] bg-white pb-20 shadow-[0_-8px_30px_rgba(0,0,0,.12)]">
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-200" />
        <div className="flex items-start justify-between px-5 pt-3">
          <div>
            <p className="text-sm text-slate-500">{firstName(opName)} está en camino</p>
            <p className="text-2xl font-bold text-alden-primary">Llega en 12 min</p>
            <p className="text-xs text-slate-500">Llegada estimada 17:28 · a 2,1 km</p>
          </div>
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full border-4 border-alden-primary/20">
            <span className="text-xs font-bold text-alden-primary">
              {Math.min(stepIndex + 1, 4)}/4
            </span>
          </div>
        </div>

        <div className="mx-4 mt-4 rounded-2xl bg-slate-50 p-4">
          <ol className="space-y-0">
            {STEPS.map((step, index) => {
              const done = index < stepIndex;
              const active = index === stepIndex;
              const pending = index > stepIndex;
              return (
                <li key={step.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        done
                          ? "bg-emerald-500 text-white"
                          : active
                            ? "border-2 border-alden-primary bg-white"
                            : "border-2 border-slate-200 bg-white"
                      }`}
                    >
                      {done ? (
                        <Check size={14} />
                      ) : active ? (
                        <span className="h-2 w-2 rounded-full bg-alden-primary" />
                      ) : null}
                    </div>
                    {index < STEPS.length - 1 && (
                      <div
                        className={`my-0.5 min-h-[28px] w-0.5 ${
                          done ? "bg-emerald-400" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                  <div className={`flex-1 pb-4 ${pending ? "opacity-40" : ""}`}>
                    <div className="flex justify-between">
                      <p
                        className={`text-sm ${active || done ? "font-bold text-slate-900" : "text-slate-500"}`}
                      >
                        {step.label}
                      </p>
                      <span className="text-xs text-slate-400">{step.time}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mx-4 mt-2 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
          <OperatorAvatar id={opId} name={opName} />
          <div className="flex-1">
            <p className="text-sm font-bold text-alden-primary">{opName}</p>
            <p className="text-xs text-slate-500">
              Código de inicio: <strong>4821</strong>
            </p>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-alden-primary"
          >
            <MessageCircle size={18} />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-alden-primary"
          >
            <Phone size={18} />
          </button>
        </div>
      </div>

      <MobileBottomNav variant="cliente" />

      {showRating && !submitted && (
        <div className="fixed inset-0 z-[700] flex flex-col bg-slate-100/95 p-4">
          <button
            type="button"
            onClick={() => setShowRating(false)}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
          <div className="mt-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check size={28} />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-alden-primary">¡Servicio finalizado!</h2>
            <p className="text-sm text-slate-500">
              Pedido #A-1042 · Pagaste {formatArs(SERVICE_FEE)}
            </p>
          </div>

          <div className="mx-auto mt-6 w-full max-w-sm rounded-3xl bg-white p-6 shadow-card">
            <OperatorAvatar id={opId} name={opName} size="lg" />
            <p className="mt-4 text-center text-lg font-bold">
              ¿Cómo fue tu experiencia con {firstName(opName)}?
            </p>
            <div className="mt-4 flex justify-center">
              <StarRating value={stars} onChange={setStars} size={32} />
            </div>
            <p className="mt-2 text-center text-sm font-semibold text-alden-primary">
              {ratingLabel}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    tags.includes(tag)
                      ? "bg-alden-primary text-white"
                      : "border border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 300))}
              rows={4}
              className="mt-4 w-full rounded-2xl border border-slate-200 p-3 text-sm"
            />
            <p className="mt-1 text-right text-[10px] text-slate-400">
              {comment.length}/300
            </p>
            <p className="mt-3 flex items-center justify-center gap-1 text-[11px] text-slate-500">
              <Shield size={12} /> Tu calificación ayuda a mantener la calidad del servicio
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="mt-4 w-full rounded-2xl bg-alden-primary py-3.5 text-sm font-bold text-white"
            >
              Enviar calificación
            </button>
            <button
              type="button"
              onClick={() => setShowRating(false)}
              className="mt-2 w-full py-2 text-sm text-slate-500"
            >
              Ahora no
            </button>
          </div>
          <DemoFooter />
        </div>
      )}

      {submitted && (
        <div className="fixed bottom-24 left-1/2 z-[800] -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
          ¡Gracias por tu calificación!
        </div>
      )}
    </div>
  );
}
