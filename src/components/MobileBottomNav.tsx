"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Home,
  LayoutGrid,
  ListOrdered,
  MessageCircle,
  User,
  Wallet,
} from "lucide-react";

type Variant = "cliente" | "operador";

const clienteItems = [
  { href: "/cliente", label: "Inicio", icon: Home },
  { href: "/seguimiento", label: "Pedidos", icon: ListOrdered },
  { href: "/cliente", label: "Mensajes", icon: MessageCircle },
  { href: "/", label: "Perfil", icon: User },
];

const operadorItems = [
  { href: "/operador", label: "Panel", icon: LayoutGrid, tab: "pedidos" as const },
  { href: "/operador?tab=agenda", label: "Agenda", icon: Calendar },
  { href: "/operador?tab=ganancias", label: "Ganancias", icon: Wallet, tab: "ganancias" as const },
  { href: "/", label: "Perfil", icon: User },
];

export function MobileBottomNav({ variant }: { variant: Variant }) {
  const pathname = usePathname();
  const items = variant === "cliente" ? clienteItems : operadorItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto flex max-w-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            variant === "cliente"
              ? (item.label === "Inicio" && pathname === "/cliente") ||
                (item.label === "Pedidos" && pathname === "/seguimiento")
              : item.label === "Panel" && pathname === "/operador";

          return (
            <li key={item.label} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${
                  isActive ? "text-alden-primary" : "text-slate-400"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
