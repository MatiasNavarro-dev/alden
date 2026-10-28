"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  adminMetrics,
  adminOrdersByDay,
  pendingOperators,
  sampleOrders,
  operators,
} from "@/lib/data";
import { formatArs } from "@/lib/utils";

export default function AdminPage() {
  const [pending, setPending] = useState(pendingOperators);

  const metrics = useMemo(
    () => [
      { label: "Pedidos hoy", value: String(adminMetrics.pedidosHoy) },
      {
        label: "Facturación mes",
        value: formatArs(adminMetrics.facturacionMes),
      },
      {
        label: "Comisión cobrada",
        value: formatArs(adminMetrics.comisionCobrada),
      },
      {
        label: "Operadores activos",
        value: String(adminMetrics.operadoresActivos),
      },
    ],
    []
  );

  return (
    <div className="min-h-[calc(100dvh-28px)] bg-slate-100">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-alden-primary">Alden Admin</h1>
            <p className="text-sm text-slate-500">Panel de administración (escritorio)</p>
          </div>
          <Link href="/" className="text-sm font-medium text-alden-primary underline">
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 md:px-6">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
            >
              <p className="text-sm text-slate-500">{m.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{m.value}</p>
            </div>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <h2 className="font-semibold text-slate-900">
              Operadores pendientes de aprobación
            </h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b text-slate-500">
                    <th className="py-2 pr-2">Nombre</th>
                    <th className="py-2 pr-2">Rubro</th>
                    <th className="py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-4 text-slate-500">
                        No hay pendientes
                      </td>
                    </tr>
                  ) : (
                    pending.map((op) => (
                      <tr key={op.id} className="border-b border-slate-100">
                        <td className="py-2 pr-2 font-medium">{op.nombre}</td>
                        <td className="py-2 pr-2">{op.rubro}</td>
                        <td className="py-2">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setPending((list) => list.filter((x) => x.id !== op.id))
                              }
                              className="rounded-lg bg-emerald-600 px-2 py-1 text-xs font-semibold text-white"
                            >
                              Aprobar
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setPending((list) => list.filter((x) => x.id !== op.id))
                              }
                              className="rounded-lg bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-700"
                            >
                              Rechazar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <h2 className="font-semibold text-slate-900">Pedidos por día</h2>
            <div className="mt-3 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminOrdersByDay}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="dia" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="pedidos" fill="#F97316" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-semibold text-slate-900">Pedidos recientes</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b text-slate-500">
                  <th className="py-2 pr-3">ID</th>
                  <th className="py-2 pr-3">Cliente</th>
                  <th className="py-2 pr-3">Operador</th>
                  <th className="py-2 pr-3">Estado</th>
                  <th className="py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {sampleOrders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-100">
                    <td className="py-2 pr-3 font-mono text-xs">{o.id}</td>
                    <td className="py-2 pr-3">{o.cliente}</td>
                    <td className="py-2 pr-3">{o.operadorNombre}</td>
                    <td className="py-2 pr-3 capitalize">{o.estado.replace("_", " ")}</td>
                    <td className="py-2">{formatArs(o.montoTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            {operators.length} operadores registrados en la demo · Rosario
          </p>
        </section>
      </main>
    </div>
  );
}
