"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Search, SlidersHorizontal, Star } from "lucide-react";
import { operators } from "@/lib/data";
import { distanceFromClient, formatArs } from "@/lib/utils";
import { DemoFooter } from "./DemoFooter";
import { MobileBottomNav } from "./MobileBottomNav";
import { OperatorAvatar } from "./OperatorAvatar";

const ClientMap = dynamic(() => import("./ClientMap"), { ssr: false });

type Chip = "Todos" | "A domicilio" | "Express" | "★ 4.5+";

export default function ClienteView() {
  const [chip, setChip] = useState<Chip>("Todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...operators];
    if (chip === "Express") list = list.filter((o) => o.precioReferencia <= 13500);
    if (chip === "★ 4.5+") list = list.filter((o) => o.calificacion >= 4.5);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (o) =>
          o.nombre.toLowerCase().includes(q) ||
          o.rubro.toLowerCase().includes(q) ||
          o.barrio.toLowerCase().includes(q)
      );
    }
    return list;
  }, [chip, query]);

  const barrioLabel =
    filtered[0]?.barrio === "Pichincha" ? "Pichincha" : "Rosario";

  return (
    <div className="relative mx-auto flex h-dvh max-w-md flex-col bg-slate-100">
      <div className="absolute inset-x-0 top-0 z-[500] px-4 pt-3">
        <div className="flex gap-2">
          <label className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-card">
            <Search size={18} className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué servicio necesitás?"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </label>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-card"
            aria-label="Filtros"
          >
            <SlidersHorizontal size={18} className="text-slate-600" />
          </button>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {(["Todos", "A domicilio", "Express", "★ 4.5+"] as Chip[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setChip(c)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold ${
                chip === c
                  ? "bg-alden-primary text-white"
                  : "bg-white text-slate-600 shadow-sm"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[48vh] flex-1 pt-[7.5rem]">
        <ClientMap operators={filtered} />
      </div>

      <div className="relative z-[500] -mt-6 flex max-h-[52vh] flex-col rounded-t-[1.75rem] bg-white shadow-[0_-12px_40px_rgba(0,0,0,0.12)]">
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-200" />
        <div className="flex items-start justify-between px-5 pt-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Operadores cerca tuyo</h2>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={12} />
              {barrioLabel}, Rosario · {filtered.length} disponibles
            </p>
          </div>
          <span className="text-xs font-semibold text-alden-primary">Ver todos</span>
        </div>

        <ul className="mt-3 flex-1 space-y-2 overflow-y-auto px-4 pb-24 pt-1">
          {filtered.map((op, i) => (
            <li key={op.id}>
              <Link
                href={`/operador/${op.id}`}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm active:scale-[0.99]"
              >
                <OperatorAvatar id={op.id} name={op.nombre} size="lg" online />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-bold text-slate-900">{op.nombre}</p>
                    {i === 0 && (
                      <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                        Top
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{op.rubro} · a domicilio</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    {op.calificacion} ({op.reseñas}) · {distanceFromClient(op.lat, op.lng)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400">desde</p>
                  <p className="text-sm font-bold text-slate-900">
                    {formatArs(op.precioReferencia)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <MobileBottomNav variant="cliente" />
      <div className="pointer-events-none fixed bottom-16 left-0 right-0">
        <DemoFooter className="bg-gradient-to-t from-white to-transparent" />
      </div>
    </div>
  );
}
