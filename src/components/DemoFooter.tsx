export function DemoFooter({ className = "" }: { className?: string }) {
  return (
    <p
      className={`py-3 text-center text-[10px] font-medium uppercase tracking-wider text-slate-400 ${className}`}
    >
      Alden · Fase 1 (PWA) · Demo con datos ficticios
    </p>
  );
}
