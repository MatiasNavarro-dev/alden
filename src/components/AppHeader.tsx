"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function AppHeader({
  title,
  backHref,
}: {
  title?: string;
  backHref?: string;
}) {
  const pathname = usePathname();
  const showBack = backHref && pathname !== "/";

  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
      {showBack ? (
        <Link
          href={backHref}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-alden-primary"
          aria-label="Volver"
        >
          <ArrowLeft size={18} />
        </Link>
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-alden-primary text-sm font-bold text-white">
          A
        </div>
      )}
      {title ? (
        <h1 className="truncate text-base font-semibold text-slate-900">{title}</h1>
      ) : (
        <span className="text-base font-bold text-alden-primary">Alden</span>
      )}
    </header>
  );
}
