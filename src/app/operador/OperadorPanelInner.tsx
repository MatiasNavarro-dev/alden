"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Bell,
  Calendar,
  Clock,
  LayoutGrid,
  User,
  Wallet,
} from "lucide-react";
import {
  incomingOperatorOrder,
  operatorDayOrders,
  operatorWeeklyEarnings,
} from "@/lib/data";
import { formatArs } from "@/lib/utils";
import { DemoFooter } from "@/components/DemoFooter";
import { OperatorAvatar } from "@/components/OperatorAvatar";

export default function OperadorPanelInner() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [tab, setTab] = useState<"pedidos" | "ganancias">(
    tabParam === "ganancias" ? "ganancias" : "pedidos"
  );
  const [incoming, setIncoming] = useState(incomingOperatorOrder);
  const [available, setAvailable] = useState(true);
  const timer = "0:45";

  useEffect(() => {
    if (tabParam === "ganancias") setTab("ganancias");
    else if (tabParam === "agenda") setTab("pedidos");
  }, [tabParam]);

  const maxBar = Math.max(...operatorWeeklyEarnings.porDia.map((d) => d.neto), 1);

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-slate-100 pb-24">
      {tab === "pedidos" ? (
        <>
          <header className="flex items-center justify-between px-4 pb-2 pt-5">
            <div className="flex items-center gap-3">
              <OperatorAvatar id="op-2" name="Laura Méndez" size="md" />
              <div>
                <p className="text-xs text-slate-500">Lunes 26 de octubre</p>
                <p className="text-lg font-bold text-slate-900">Hola, Lucía</p>
              </div>
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm"
            >
              <Bell size={18} />
            </button>
          </header>

          <div className="mx-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Disponible
                </p>
                <p className="text-xs text-emerald-700">
                  Recibís pedidos en un radio de 5 km
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAvailable((v) => !v)}
                className={`relative h-8 w-14 rounded-full transition ${
                  available ? "bg-emerald-500" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
                    available ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {incoming.estado === "enviado" && (
            <section className="mx-4 mt-4 rounded-3xl border-2 border-alden-accent bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-xs font-bold text-alden-accent">
                  <span className="h-2 w-2 rounded-full bg-alden-accent" />
                  NUEVO PEDIDO
                </p>
                <p className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                  <Clock size={12} /> {timer}
                </p>
              </div>
              <div className="mt-3 flex gap-3">
                <OperatorAvatar id="client-jp" name="Juan P." size="md" />
                <div>
                  <p className="font-bold text-slate-900">
                    Juan P. · Servicio a domicilio
                  </p>
                  <p className="text-xs text-slate-500">
                    ★ 4.6 cliente · Pichincha · a 1,2 km
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <p className="text-slate-400">Horario</p>
                  <p className="font-bold">Hoy 17:30</p>
                </div>
                <div>
                  <p className="text-slate-400">Duración</p>
                  <p className="font-bold">1 h</p>
                </div>
                <div>
                  <p className="text-slate-400">Ganás (neto)</p>
                  <p className="font-bold text-emerald-600">
                    {formatArs(incoming.montoNetoOperador)}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIncoming((o) => ({ ...o, estado: "rechazado" }))}
                  className="flex-1 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700"
                >
                  Rechazar
                </button>
                <button
                  type="button"
                  onClick={() => setIncoming((o) => ({ ...o, estado: "aceptado" }))}
                  className="flex-1 rounded-2xl bg-alden-primary py-3 text-sm font-bold text-white"
                >
                  Aceptar
                </button>
              </div>
            </section>
          )}

          <div className="mx-4 mt-4 grid grid-cols-3 gap-2">
            {[
              { label: "Pedidos hoy", value: "3" },
              { label: "Ganado hoy", value: formatArs(22050) },
              { label: "Calificación", value: "★ 4.9" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white p-3 text-center shadow-sm">
                <p className="text-[10px] text-slate-500">{s.label}</p>
                <p className="mt-1 text-sm font-bold text-slate-900">{s.value}</p>
              </div>
            ))}
          </div>

          <section className="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Pedidos del día</h2>
              <span className="text-xs font-semibold text-alden-primary">Ver agenda</span>
            </div>
            <ul className="mt-3 divide-y divide-slate-100">
              {operatorDayOrders.map((o, i) => (
                <li key={o.id} className="flex items-center gap-3 py-3">
                  <span className="w-12 text-sm font-semibold text-slate-500">
                    {i === 0 ? "10:00" : i === 1 ? "14:00" : "17:30"}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{o.cliente.split(" ")[0]} M.</p>
                    <p className="text-xs text-slate-500">
                      A domicilio · {o.direccion.split(",")[1]?.trim() ?? "Centro"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{formatArs(o.montoNetoOperador)}</p>
                    <span
                      className={`text-[10px] font-bold ${
                        o.estado === "finalizado"
                          ? "text-emerald-600"
                          : "text-alden-primary"
                      }`}
                    >
                      {o.estado === "finalizado" ? "Finalizado" : "Agendado"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        <GananciasView maxBar={maxBar} />
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)]">
        <ul className="mx-auto flex max-w-md">
          {[
            { href: "/operador", label: "Panel", icon: LayoutGrid, active: tab === "pedidos" },
            { href: "/operador?tab=agenda", label: "Agenda", icon: Calendar, active: false },
            {
              href: "/operador?tab=ganancias",
              label: "Ganancias",
              icon: Wallet,
              active: tab === "ganancias",
            },
            { href: "/", label: "Perfil", icon: User, active: false },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="flex-1">
                <Link
                  href={item.href}
                  onClick={() =>
                    setTab(item.label === "Ganancias" ? "ganancias" : "pedidos")
                  }
                  className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${
                    item.active ? "text-alden-primary" : "text-slate-400"
                  }`}
                >
                  <Icon size={20} strokeWidth={item.active ? 2.5 : 2} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <DemoFooter className="fixed bottom-16 left-0 right-0 bg-slate-100" />
    </div>
  );
}

function GananciasView({ maxBar }: { maxBar: number }) {
  const bruto = operatorWeeklyEarnings.porDia.reduce((a, d) => a + d.bruto, 0);

  return (
    <div className="px-4 pt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ganancias</h1>
        <button
          type="button"
          className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold"
        >
          <Calendar size={14} /> 19 – 25 oct
        </button>
      </div>

      <section className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-alden-primary to-alden-sidebar p-5 text-white shadow-lg">
        <p className="text-sm text-indigo-200">Ganancia neta de la semana</p>
        <p className="mt-1 text-3xl font-bold">
          {formatArs(operatorWeeklyEarnings.totalNeto)}
        </p>
        <p className="mt-1 text-xs text-emerald-300">
          9 servicios · +12% vs semana anterior
        </p>
        <div className="mt-5 flex items-end justify-between gap-1">
          {operatorWeeklyEarnings.porDia.map((d) => (
            <div key={d.dia} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`w-full max-w-[1.75rem] rounded-t-md ${
                  d.dia === "Sáb" ? "bg-alden-accent" : "bg-white/25"
                }`}
                style={{ height: `${Math.max(8, (d.neto / maxBar) * 56)}px` }}
              />
              <span className="text-[10px] opacity-80">{d.dia.charAt(0)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <Row label="Cobrado a clientes" value={formatArs(bruto)} />
        <Row
          label="Comisión Alden (10%)"
          value={`– ${formatArs(operatorWeeklyEarnings.comisionDescontada)}`}
          valueClass="text-red-500"
        />
        <div className="my-3 border-t border-slate-100" />
        <Row
          label="Neto a liquidar"
          value={formatArs(operatorWeeklyEarnings.totalNeto)}
          bold
        />
      </section>

      <div className="mt-4 flex gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-alden-accent text-white">
          <Wallet size={18} />
        </div>
        <div>
          <p className="text-sm font-bold text-orange-900">Próxima liquidación: hoy</p>
          <p className="text-xs text-orange-800/80">
            Lun 26 oct · se acredita en tu cuenta de Mercado Pago antes de las 18 h
          </p>
        </div>
      </div>

      <h2 className="mt-6 text-base font-bold">Historial</h2>
      <ul className="mt-2 space-y-2">
        {[
          { date: "12 oct", services: 7, amount: 94500 },
          { date: "5 oct", services: 5, amount: 67500 },
        ].map((h) => (
          <li
            key={h.date}
            className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              ✓
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold">Liquidación {h.date}</p>
              <p className="text-xs text-slate-500">
                {h.services} servicios · a Mercado Pago
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">{formatArs(h.amount)}</p>
              <span className="text-[10px] font-bold text-emerald-600">Pagada</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Row({
  label,
  value,
  valueClass = "",
  bold,
}: {
  label: string;
  value: string;
  valueClass?: string;
  bold?: boolean;
}) {
  return (
    <div className={`flex justify-between py-1 text-sm ${bold ? "font-bold" : ""}`}>
      <span className={bold ? "text-slate-900" : "text-slate-600"}>{label}</span>
      <span className={valueClass || (bold ? "text-slate-900" : "text-slate-800")}>
        {value}
      </span>
    </div>
  );
}
