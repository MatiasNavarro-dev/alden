"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Check,
  MapPin,
  Search,
  Wrench,
} from "lucide-react";
import { DemoFooter } from "@/components/DemoFooter";

type Role = "cliente" | "operador";

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("cliente");

  const complete = (method: string) => {
    sessionStorage.setItem(
      "alden-auth",
      JSON.stringify({ role, method, email: "demo@alden.app" })
    );
    router.push(role === "cliente" ? "/cliente" : "/operador");
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-white">
      <section className="alden-hero-gradient relative overflow-hidden rounded-b-[2rem] px-6 pb-10 pt-8 text-white">
        <div className="pointer-events-none absolute -right-8 top-6 h-32 w-32 rounded-full bg-orange-400/30 blur-2xl" />
        <div className="pointer-events-none absolute -left-6 bottom-0 h-28 w-28 rounded-full bg-indigo-300/20 blur-2xl" />

        <div className="relative flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-sm font-bold">
            A
          </div>
          <span className="text-lg font-semibold tracking-tight">alden</span>
        </div>

        <h1 className="relative mt-8 text-[1.65rem] font-bold leading-tight">
          Servicios cerca tuyo,
          <br />
          cuando los necesitás.
        </h1>
        <p className="relative mt-3 text-sm leading-relaxed text-indigo-100">
          Conectamos clientes con operadores independientes de Rosario. Pagás seguro y
          seguís tu pedido en tiempo real.
        </p>

        <div className="relative mt-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs">
            <MapPin size={12} /> Rosario, Santa Fe
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs">
            <BadgeCheck size={12} /> Operadores verificados
          </span>
        </div>
      </section>

      <main className="flex flex-1 flex-col px-5 pb-4 pt-6">
        <h2 className="text-base font-bold text-slate-900">¿Cómo querés usar Alden?</h2>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("cliente")}
            className={`relative rounded-2xl border-2 p-4 text-left transition ${
              role === "cliente"
                ? "border-alden-primary bg-white shadow-card"
                : "border-transparent bg-slate-50 shadow-sm"
            }`}
          >
            {role === "cliente" && (
              <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-alden-primary text-white">
                <Check size={12} />
              </span>
            )}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-alden-primary">
              <Search size={18} />
            </span>
            <p className="mt-3 text-sm font-bold text-slate-900">Soy cliente</p>
            <p className="mt-0.5 text-xs text-slate-500">Busco y contrato un servicio</p>
          </button>

          <button
            type="button"
            onClick={() => setRole("operador")}
            className={`relative rounded-2xl border-2 p-4 text-left transition ${
              role === "operador"
                ? "border-alden-primary bg-white shadow-card"
                : "border-transparent bg-slate-50 shadow-sm"
            }`}
          >
            {role === "operador" && (
              <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-alden-primary text-white">
                <Check size={12} />
              </span>
            )}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-alden-accent">
              <Wrench size={18} />
            </span>
            <p className="mt-3 text-sm font-bold text-slate-900">Soy operador</p>
            <p className="mt-0.5 text-xs text-slate-500">Ofrezco mis servicios y cobro</p>
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => complete("google")}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-800 shadow-sm"
          >
            <span className="text-base font-bold text-[#4285F4]">G</span>
            Continuar con Google
          </button>
          <button
            type="button"
            onClick={() => complete("email")}
            className="w-full rounded-2xl bg-alden-dark py-3.5 text-sm font-semibold text-white"
          >
            Continuar con email
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-slate-600">
          ¿Ya tenés cuenta?{" "}
          <button
            type="button"
            onClick={() => complete("email")}
            className="font-semibold text-alden-primary"
          >
            Ingresá
          </button>
        </p>
        <p className="mt-2 text-center text-[11px] leading-relaxed text-slate-400">
          Al continuar aceptás los Términos y la Política de privacidad
        </p>
        <p className="mt-3 text-center text-xs text-slate-400">
          <Link href="/admin" className="text-alden-primary underline">
            Panel admin
          </Link>
        </p>
      </main>

      <DemoFooter />
    </div>
  );
}
