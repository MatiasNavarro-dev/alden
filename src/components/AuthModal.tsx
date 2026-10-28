"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Role = "cliente" | "operador";

interface AuthModalProps {
  role: Role;
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ role, open, onClose }: AuthModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");

  if (!open) return null;

  const destination = role === "cliente" ? "/cliente" : "/operador";

  const complete = (method: string) => {
    sessionStorage.setItem("alden-auth", JSON.stringify({ role, method, email }));
    onClose();
    router.push(destination);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <h2 className="text-lg font-semibold text-slate-900">
          Registro simulado — {role === "cliente" ? "Cliente" : "Operador"}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Ingresá un email o continuá con Google (demo).
        </p>
        <label className="mt-4 block text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-alden-primary focus:ring-2"
          />
        </label>
        <button
          type="button"
          onClick={() => complete("email")}
          className="mt-4 w-full rounded-xl bg-alden-primary py-3 text-sm font-semibold text-white"
        >
          Continuar con email
        </button>
        <button
          type="button"
          onClick={() => complete("google")}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-800"
        >
          <span className="text-lg">G</span> Continuar con Google
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full py-2 text-sm text-slate-500"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
