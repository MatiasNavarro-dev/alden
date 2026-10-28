"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BadgeCheck, Camera, X } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { StarDisplay, StarRating } from "@/components/StarRating";
import {
  getOperatorById,
  getReviewsForOperator,
} from "@/lib/data";
import { formatArs } from "@/lib/utils";
import { useOrder } from "@/lib/order-context";

export default function OperadorDetailPage({ params }: { params: { id: string } }) {
  const operator = getOperatorById(params.id);
  const router = useRouter();
  const { setRequest } = useOrder();
  const [showForm, setShowForm] = useState(false);
  const [direccion, setDireccion] = useState("San Martín 1200, Centro");
  const [descripcion, setDescripcion] = useState("");
  const [horario, setHorario] = useState("Hoy 18:00 - 20:00");
  const [fotos, setFotos] = useState<string[]>([]);

  if (!operator) {
    return (
      <>
        <AppHeader title="Operador" backHref="/cliente" />
        <p className="p-6 text-center text-slate-600">Operador no encontrado.</p>
      </>
    );
  }

  const reviews = getReviewsForOperator(operator.id);

  const addPhoto = () => {
    if (fotos.length >= 3) return;
    setFotos((prev) => [...prev, `foto-${prev.length + 1}`]);
  };

  const submitRequest = () => {
    setRequest({
      operadorId: operator.id,
      operadorNombre: operator.nombre,
      rubro: operator.rubro,
      direccion,
      descripcion: descripcion || "Servicio solicitado (demo)",
      horario,
      fotosSimuladas: fotos.length,
    });
    router.push("/pago");
  };

  return (
    <>
      <AppHeader title={operator.nombre} backHref="/cliente" />
      <main className="mx-auto max-w-lg space-y-4 px-4 pb-8 pt-4">
        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="flex gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={operator.avatar}
              alt={operator.nombre}
              className="h-24 w-24 rounded-2xl bg-slate-100 object-cover"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-alden-accent">
                {operator.rubro}
              </p>
              <h2 className="text-xl font-bold text-slate-900">{operator.nombre}</h2>
              <div className="mt-1 flex items-center gap-2">
                <StarDisplay value={operator.calificacion} />
                <span className="text-sm text-slate-600">
                  {operator.calificacion} ({operator.reseñas})
                </span>
              </div>
              {operator.matriculaVerificada && (
                <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  <BadgeCheck size={14} /> Matrícula verificada
                </p>
              )}
              <p className="mt-2 text-lg font-semibold text-slate-900">
                Desde {formatArs(operator.precioReferencia)}
              </p>
              <p className="text-xs text-slate-500">{operator.barrio}, Rosario</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h3 className="font-semibold text-slate-900">Reseñas</h3>
          <ul className="mt-3 space-y-3">
            {reviews.map((r) => (
              <li key={r.id} className="border-b border-slate-100 pb-3 last:border-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-800">{r.autor}</p>
                  <StarRating value={r.estrellas} readonly size={14} />
                </div>
                <p className="mt-1 text-sm text-slate-600">{r.comentario}</p>
              </li>
            ))}
          </ul>
        </section>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full rounded-2xl bg-alden-accent py-4 text-base font-semibold text-white shadow-md"
        >
          Solicitar servicio
        </button>
      </main>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40 p-4 sm:items-center">
          <div className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Detalle del pedido</h3>
              <button type="button" onClick={() => setShowForm(false)} aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>
            <label className="mt-4 block text-sm font-medium">
              Dirección
              <input
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
              />
            </label>
            <label className="mt-3 block text-sm font-medium">
              Descripción del problema
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={3}
                placeholder="Contanos qué necesitás..."
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
              />
            </label>
            <label className="mt-3 block text-sm font-medium">
              Horario preferido
              <select
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
              >
                <option>Hoy 18:00 - 20:00</option>
                <option>Mañana 10:00 - 12:00</option>
                <option>Mañana 16:00 - 18:00</option>
              </select>
            </label>
            <div className="mt-3">
              <p className="text-sm font-medium">Fotos (simuladas)</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {fotos.map((f) => (
                  <span
                    key={f}
                    className="rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-600"
                  >
                    {f}.jpg
                  </span>
                ))}
                <button
                  type="button"
                  onClick={addPhoto}
                  className="inline-flex items-center gap-1 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-600"
                >
                  <Camera size={14} /> Agregar
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={submitRequest}
              className="mt-5 w-full rounded-2xl bg-alden-primary py-3 font-semibold text-white"
            >
              Ir a pagar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
