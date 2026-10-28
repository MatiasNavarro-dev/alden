"use client";

import { useState } from "react";
import { AuthModal } from "@/components/AuthModal";
import Link from "next/link";

export default function HomePage() {
  const [authRole, setAuthRole] = useState<"cliente" | "operador" | null>(null);

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-28px)] max-w-lg flex-col px-5 pb-8 pt-10">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-alden-primary text-3xl font-bold text-white shadow-lg shadow-indigo-200">
          A
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-alden-primary">Alden</h1>
        <p className="mt-3 max-w-xs text-base text-slate-600">
          Servicios para tu hogar, cuando los necesitás
        </p>
        <p className="mt-2 text-sm text-slate-500">Rosario · Plomería · Electricidad · Cerrajería</p>

        <div className="mt-10 w-full space-y-3">
          <button
            type="button"
            onClick={() => setAuthRole("cliente")}
            className="w-full rounded-2xl bg-alden-primary py-4 text-base font-semibold text-white shadow-md"
          >
            Soy cliente
          </button>
          <button
            type="button"
            onClick={() => setAuthRole("operador")}
            className="w-full rounded-2xl border-2 border-alden-accent bg-white py-4 text-base font-semibold text-alden-accent"
          >
            Soy operador
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400">
        ¿Administrás la plataforma?{" "}
        <Link href="/admin" className="font-medium text-alden-primary underline">
          Panel admin
        </Link>
      </p>

      <AuthModal
        role={authRole ?? "cliente"}
        open={authRole !== null}
        onClose={() => setAuthRole(null)}
      />
    </main>
  );
}
