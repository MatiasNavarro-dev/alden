"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  SERVICE_FEE,
  calcCommission,
  calcNetForOperator,
  getOperatorById,
  type Rubro,
} from "./data";

export interface PendingServiceRequest {
  operadorId: string;
  operadorNombre: string;
  rubro: Rubro;
  direccion: string;
  descripcion: string;
  horario: string;
  fotosSimuladas: number;
}

export interface ActiveOrder extends PendingServiceRequest {
  montoTotal: number;
  comisionAlden: number;
  montoNetoOperador: number;
  pagado: boolean;
}

interface OrderContextValue {
  request: PendingServiceRequest | null;
  order: ActiveOrder | null;
  setRequest: (req: PendingServiceRequest) => void;
  confirmPayment: () => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [request, setRequestState] = useState<PendingServiceRequest | null>(
    null
  );
  const [order, setOrder] = useState<ActiveOrder | null>(null);

  const setRequest = useCallback((req: PendingServiceRequest) => {
    setRequestState(req);
  }, []);

  const confirmPayment = useCallback(() => {
    setRequestState((req) => {
      if (!req) return req;
      const op = getOperatorById(req.operadorId);
      const montoTotal = SERVICE_FEE;
      setOrder({
        ...req,
        operadorNombre: op?.nombre ?? req.operadorNombre,
        montoTotal,
        comisionAlden: calcCommission(montoTotal),
        montoNetoOperador: calcNetForOperator(montoTotal),
        pagado: true,
      });
      return req;
    });
  }, []);

  const clearOrder = useCallback(() => {
    setRequestState(null);
    setOrder(null);
  }, []);

  const value = useMemo(
    () => ({ request, order, setRequest, confirmPayment, clearOrder }),
    [request, order, setRequest, confirmPayment, clearOrder]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder debe usarse dentro de OrderProvider");
  return ctx;
}
