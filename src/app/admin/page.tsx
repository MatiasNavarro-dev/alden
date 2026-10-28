"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Clock,
  LayoutDashboard,
  Search,
  Settings,
  Star,
  Timer,
  Users,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  adminMetrics,
  adminOrdersByDay,
  pendingOperators,
  sampleOrders,
} from "@/lib/data";
import { avatarColor, getInitials } from "@/lib/ui";
import { formatArs } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Pedidos", icon: Clock },
  { label: "Operadores", icon: Users },
  { label: "Liquidaciones", icon: Wallet },
  { label: "Calidad", icon: Star },
  { label: "Tiempos de servicio", icon: Timer },
  { label: "Configuración", icon: Settings },
];

const LOW_REVIEWS = [
  {
    id: "1",
    name: "Martín G.",
    rating: 2.0,
    text: "Llegó tarde y no trajo repuestos.",
  },
  {
    id: "2",
    name: "Ana R.",
    rating: 2.5,
    text: "El precio final fue distinto al cotizado.",
  },
];

export default function AdminPage() {
  const [pending, setPending] = useState(pendingOperators);

  const metrics = useMemo(
    () => [
      {
        label: "Pedidos (semana)",
        value: String(adminMetrics.pedidosHoy * 21),
        hint: "+ 14% vs semana anterior",
        up: true,
      },
      {
        label: "Operadores activos",
        value: `${adminMetrics.operadoresActivos} / 58`,
        hint: "11 en servicio ahora",
      },
      {
        label: "Facturación bruta",
        value: formatArs(adminMetrics.facturacionMes),
        hint: "+ 9% vía Mercado Pago",
        up: true,
      },
      {
        label: "Comisiones Alden",
        value: formatArs(adminMetrics.comisionCobrada),
        hint: "10% sobre lo facturado",
      },
      {
        label: "Por liquidar",
        value: formatArs(adminMetrics.facturacionMes - adminMetrics.comisionCobrada),
        hint: "58 operadores · hoy 18 h",
        warn: true,
      },
    ],
    []
  );

  return (
    <div className="flex min-h-dvh bg-[#EEF2F7]">
      <aside className="hidden w-56 shrink-0 flex-col bg-alden-sidebar text-indigo-100 lg:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-sm font-bold text-white">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-white">alden</p>
              <p className="text-[10px] text-indigo-300">Panel de administración</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm ${
                  item.active
                    ? "bg-white/10 font-semibold text-white"
                    : "text-indigo-200 hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4 text-[10px] leading-relaxed text-indigo-300">
          Rosario · ciudad activa
          <br />
          Etapa de validación (MVP)
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-slate-200 bg-white px-4 py-4 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Buen día, Marcos</h1>
              <p className="text-sm text-slate-500">
                Lunes 26 de octubre · resumen de la semana 19 – 25 oct
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 sm:flex">
                <Search size={16} />
                Buscar pedido, operador o cliente
              </label>
              <button type="button" className="rounded-xl border border-slate-200 p-2">
                <Bell size={18} />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-alden-accent text-xs font-bold text-white">
                MA
              </div>
              <Link href="/" className="text-xs font-semibold text-alden-primary lg:hidden">
                Salir
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-5 p-4 md:p-8">
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">{m.label}</p>
                <p className="mt-1 text-xl font-bold text-slate-900">{m.value}</p>
                <p
                  className={`mt-1 text-[11px] ${
                    m.up
                      ? "text-emerald-600"
                      : m.warn
                        ? "text-orange-600"
                        : "text-slate-400"
                  }`}
                >
                  {m.warn && "⏱ "}
                  {m.hint}
                </p>
              </div>
            ))}
          </section>

          <section className="grid gap-4 xl:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm xl:col-span-1">
              <h2 className="text-sm font-bold text-slate-900">Pedidos por día</h2>
              <div className="mt-4 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={adminOrdersByDay}>
                    <XAxis dataKey="dia" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} width={28} />
                    <Bar dataKey="pedidos" fill="#3730A3" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900">Tiempos de servicio</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  { label: "Aceptación del pedido", value: "2 min 40 s", w: "25%", c: "#6366F1" },
                  { label: "Llegada al domicilio", value: "18 min", w: "55%", c: "#8B5CF6" },
                  { label: "Duración del servicio", value: "54 min", w: "85%", c: "#F97316" },
                  { label: "Pedidos cancelados", value: "3,1%", w: "12%", c: "#EF4444" },
                ].map((row) => (
                  <li key={row.label}>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">{row.label}</span>
                      <span className="font-semibold">{row.value}</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full"
                        style={{ width: row.w, backgroundColor: row.c }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900">Operadores en el mapa</h2>
              <div className="relative mt-3 h-44 overflow-hidden rounded-xl bg-slate-100">
                <div className="absolute inset-0 bg-[linear-gradient(#cbd5e1_1px,transparent_1px),linear-gradient(90deg,#cbd5e1_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
                <span className="absolute left-3 top-3 text-[10px] font-semibold text-slate-500">
                  Av. Oroño
                </span>
                <span className="absolute bottom-3 right-3 text-[10px] font-semibold text-slate-500">
                  Av. Pellegrini
                </span>
                {[
                  { t: 20, l: 30, c: "#22C55E" },
                  { t: 50, l: 55, c: "#F97316" },
                  { t: 35, l: 70, c: "#22C55E" },
                  { t: 65, l: 25, c: "#22C55E" },
                ].map((dot, i) => (
                  <span
                    key={i}
                    className="absolute h-3 w-3 rounded-full border-2 border-white shadow"
                    style={{ top: `${dot.t}%`, left: `${dot.l}%`, backgroundColor: dot.c }}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-5">
            <div className="rounded-2xl bg-white p-4 shadow-sm xl:col-span-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-slate-900">
                  Liquidaciones pendientes · semana 19 – 25 oct
                </h2>
                <button
                  type="button"
                  className="rounded-xl bg-alden-accent px-3 py-2 text-xs font-bold text-white"
                >
                  Aprobar todas ({pending.length || 58})
                </button>
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-xs">
                  <thead className="text-slate-400">
                    <tr className="border-b">
                      <th className="py-2">Operador</th>
                      <th className="py-2">Servicios</th>
                      <th className="py-2">Bruto</th>
                      <th className="py-2">Comisión</th>
                      <th className="py-2">Neto</th>
                      <th className="py-2">Estado</th>
                      <th className="py-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {pending.map((op, i) => (
                      <tr key={op.id} className="border-b border-slate-50">
                        <td className="py-2">
                          <span className="inline-flex items-center gap-2">
                            <span
                              className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
                              style={{ backgroundColor: avatarColor(op.id) }}
                            >
                              {getInitials(op.nombre)}
                            </span>
                            {op.nombre}
                          </span>
                        </td>
                        <td>{3 + i}</td>
                        <td>{formatArs(15000)}</td>
                        <td className="text-red-500">{formatArs(1500)}</td>
                        <td className="font-bold">{formatArs(13500)}</td>
                        <td>
                          <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-700">
                            Pendiente
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="font-semibold text-alden-primary"
                            onClick={() =>
                              setPending((list) => list.filter((x) => x.id !== op.id))
                            }
                          >
                            Aprobar
                          </button>
                        </td>
                      </tr>
                    ))}
                    {pending.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-slate-500">
                          No hay liquidaciones pendientes
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm xl:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">
                  Calificaciones bajas a revisar
                </h2>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
                  4 nuevas
                </span>
              </div>
              <ul className="mt-3 space-y-3">
                {LOW_REVIEWS.map((r) => (
                  <li key={r.id} className="rounded-xl border border-slate-100 p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold">{r.name}</p>
                      <p className="text-sm font-bold text-red-500">★ {r.rating.toFixed(1)}</p>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">&quot;{r.text}&quot;</p>
                    <button type="button" className="mt-2 text-xs font-bold text-alden-primary">
                      Revisar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900">Pedidos recientes</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead className="text-slate-400">
                  <tr className="border-b">
                    <th className="py-2">ID</th>
                    <th className="py-2">Cliente</th>
                    <th className="py-2">Operador</th>
                    <th className="py-2">Estado</th>
                    <th className="py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleOrders.map((o) => (
                    <tr key={o.id} className="border-b border-slate-50">
                      <td className="py-2 font-mono">{o.id}</td>
                      <td>{o.cliente}</td>
                      <td>{o.operadorNombre}</td>
                      <td className="capitalize">{o.estado.replace("_", " ")}</td>
                      <td className="font-semibold">{formatArs(o.montoTotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-200 bg-white px-8 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Demo · datos ficticios
        </footer>
      </div>
    </div>
  );
}
