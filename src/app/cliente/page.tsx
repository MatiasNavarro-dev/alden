import { AppHeader } from "@/components/AppHeader";
import ClienteView from "@/components/ClienteView";

export default function ClientePage() {
  return (
    <>
      <AppHeader title="Mapa de operadores" backHref="/" />
      <ClienteView />
    </>
  );
}
