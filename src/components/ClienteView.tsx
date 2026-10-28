"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Link from "next/link";
import { operators, type Rubro } from "@/lib/data";
import { distanceFromClient, formatArs } from "@/lib/utils";
import { StarDisplay } from "./StarRating";

const ClientMap = dynamic(() => import("./ClientMap"), { ssr: false });

const RUBROS: Array<Rubro | "Todos"> = [
  "Todos",
  "Plomería",
  "Electricidad",
  "Cerrajería",
];

export default function ClienteView() {
  const [rubro, setRubro] = useState<Rubro | "Todos">("Todos");

  const filtered = useMemo(
    () =>
      operators.filter((op) => rubro === "Todos" || op.rubro === rubro),
    [rubro]
  );

  return (
    <div className="flex h-[calc(100dvh-88px)] flex-col">
      <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
        {RUBROS.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRubro(r)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium ${
              rubro === r
                ? "bg-alden-primary text-white"
                : "bg-white text-slate-700 ring-1 ring-slate-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="relative min-h-[38vh] flex-1">
        <ClientMap operators={filtered} />
      </div>

      <div className="max-h-[42vh] overflow-y-auto rounded-t-3xl bg-white px-4 pb-6 pt-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <p className="mb-3 text-sm font-semibold text-slate-800">
          Operadores cerca tuyo
        </p>
        <ul className="space-y-3">
          {filtered.map((op) => (
            <li key={op.id}>
              <Link
                href={`/operador/${op.id}`}
                className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 active:scale-[0.99]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={op.avatar}
                  alt={op.nombre}
                  className="h-14 w-14 rounded-xl bg-white object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-slate-900">{op.nombre}</p>
                      <p className="text-xs text-alden-accent">{op.rubro}</p>
                    </div>
                    <span className="text-xs text-slate-500">
                      {distanceFromClient(op.lat, op.lng)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <StarDisplay value={op.calificacion} />
                    <span className="text-sm font-semibold text-slate-800">
                      {formatArs(op.precioReferencia)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {op.reseñas} reseñas · {op.barrio}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
