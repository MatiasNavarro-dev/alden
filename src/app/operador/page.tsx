"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppHeader } from "@/components/AppHeader";
import {
  incomingOperatorOrder,
  operatorDayOrders,
  operatorWeeklyEarnings,
} from "@/lib/data";
import { formatArs } from "@/lib/utils";

export default function OperadorPanelPage() {
  const [tab, setTab] = useState<"pedidos" | "ganancias">("pedidos");
  const [incoming, setIncoming] = useState(incomingOperatorOrder);

  return (
    <>
      <AppHeader title="Panel operador" backHref="/" />
      <main className="mx-auto max-w-lg px-4 pb-8 pt-4">
        <div className="mb-4 flex rounded-2xl bg-white p-1 ring-1 ring-slate-100">
          {(["pedidos", "ganancias"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-semibold capitalize ${
                tab === t ? "bg-alden-primary text-white" : "text-slate-600"
              }`}
            >
              {t === "pedidos" ? "Pedidos" : "Ganancias"}
            </button>
          ))}
        </div>

        {tab === "pedidos" && (
          <>
            {incoming.estado === "enviado" && (
              <section className="mb-4 rounded-2xl border-2 border-alden-accent bg-orange-50 p-4">
                <p className="text-xs font-bold uppercase text-alden-accent">
                  Pedido entrante
                </p>
                <p className="mt-1 font-semibold text-slate-900">{incoming.cliente}</p>
                <p className="text-sm text-slate-700">{incoming.rubro}</p>
                <p className="text-sm text-slate-600">{incoming.direccion}</p>
                <p className="mt-2 text-lg font-bold text-slate-900">
                  Neto: {formatArs(incoming.montoNetoOperador)}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setIncoming((o) => ({ ...o, estado: "aceptado" }))
                    }
                    className="flex-1 rounded-xl bg-alden-primary py-2.5 text-sm font-semibold text-white"
                  >
                    Aceptar
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setIncoming((o) => ({ ...o, estado: "rechazado" }))
                    }
                    className="flex-1 rounded-xl border border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-700"
                  >
                    Rechazar
                  </button>
                </div>
              </section>
            )}

            <h2 className="mb-2 text-sm font-semibold text-slate-800">Pedidos del día</h2>
            <ul className="space-y-3">
              {operatorDayOrders.map((o) => (
                <li
                  key={o.id}
                  className="rounded-2xl bg-white p-4 ring-1 ring-slate-100"
                >
                  <div className="flex justify-between">
                    <p className="font-medium text-slate-900">{o.cliente}</p>
                    <span className="text-xs capitalize text-slate-500">{o.estado.replace("_", " ")}</span>
                  </div>
                  <p className="text-sm text-slate-600">{o.rubro} · {o.direccion}</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-700">
                    Neto {formatArs(o.montoNetoOperador)}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === "ganancias" && (
          <>
            <section className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
              <p className="text-sm text-slate-600">Total semanal neto</p>
              <p className="text-3xl font-bold text-alden-primary">
                {formatArs(operatorWeeklyEarnings.totalNeto)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Comisión Alden descontada:{" "}
                {formatArs(operatorWeeklyEarnings.comisionDescontada)}
              </p>
            </section>

            <section className="mt-4 h-64 rounded-2xl bg-white p-3 ring-1 ring-slate-100">
              <p className="mb-2 text-sm font-semibold text-slate-800">
                Ganancias netas por día
              </p>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={operatorWeeklyEarnings.porDia}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value) => formatArs(Number(value ?? 0))}
                    labelFormatter={(l) => `Día: ${l}`}
                  />
                  <Bar dataKey="neto" fill="#3730A3" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </section>
          </>
        )}
      </main>
    </>
  );
}
