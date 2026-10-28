export type Rubro = "Plomería" | "Electricidad" | "Cerrajería";

export type Barrio = "Centro" | "Pichincha" | "Fisherton";

export type OrderStatus =
  | "enviado"
  | "aceptado"
  | "en_camino"
  | "finalizado"
  | "rechazado";

export interface Operator {
  id: string;
  nombre: string;
  rubro: Rubro;
  barrio: Barrio;
  avatar: string;
  calificacion: number;
  reseñas: number;
  precioReferencia: number;
  matriculaVerificada: boolean;
  lat: number;
  lng: number;
  pendienteAprobacion?: boolean;
}

export interface Review {
  id: string;
  autor: string;
  estrellas: number;
  comentario: string;
  fecha: string;
}

export interface SampleOrder {
  id: string;
  cliente: string;
  operadorId: string;
  operadorNombre: string;
  rubro: Rubro;
  direccion: string;
  descripcion: string;
  estado: OrderStatus;
  montoTotal: number;
  montoNetoOperador: number;
  comisionAlden: number;
  fecha: string;
}

export const ALDEN_COMMISSION_RATE = 0.1;
export const SERVICE_FEE = 15000;
export const CLIENT_LOCATION = { lat: -32.9442, lng: -60.6505 };

export const operators: Operator[] = [
  {
    id: "op-1",
    nombre: "Martín Acosta",
    rubro: "Plomería",
    barrio: "Centro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MartinAcosta",
    calificacion: 4.9,
    reseñas: 128,
    precioReferencia: 14000,
    matriculaVerificada: true,
    lat: -32.9465,
    lng: -60.6398,
  },
  {
    id: "op-2",
    nombre: "Laura Méndez",
    rubro: "Electricidad",
    barrio: "Pichincha",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LauraMendez",
    calificacion: 4.8,
    reseñas: 94,
    precioReferencia: 16000,
    matriculaVerificada: true,
    lat: -32.9512,
    lng: -60.6551,
  },
  {
    id: "op-3",
    nombre: "Diego Romero",
    rubro: "Cerrajería",
    barrio: "Fisherton",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DiegoRomero",
    calificacion: 4.7,
    reseñas: 76,
    precioReferencia: 12000,
    matriculaVerificada: true,
    lat: -32.9588,
    lng: -60.6782,
  },
  {
    id: "op-4",
    nombre: "Carolina Vega",
    rubro: "Plomería",
    barrio: "Pichincha",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarolinaVega",
    calificacion: 4.6,
    reseñas: 61,
    precioReferencia: 13500,
    matriculaVerificada: true,
    lat: -32.9498,
    lng: -60.662,
  },
  {
    id: "op-5",
    nombre: "Facundo Ríos",
    rubro: "Electricidad",
    barrio: "Centro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FacundoRios",
    calificacion: 4.9,
    reseñas: 142,
    precioReferencia: 15500,
    matriculaVerificada: true,
    lat: -32.9421,
    lng: -60.6455,
  },
  {
    id: "op-6",
    nombre: "Valentina Sosa",
    rubro: "Cerrajería",
    barrio: "Centro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ValentinaSosa",
    calificacion: 4.8,
    reseñas: 88,
    precioReferencia: 11000,
    matriculaVerificada: true,
    lat: -32.9455,
    lng: -60.638,
  },
  {
    id: "op-7",
    nombre: "Gonzalo Pérez",
    rubro: "Plomería",
    barrio: "Fisherton",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GonzaloPerez",
    calificacion: 4.5,
    reseñas: 52,
    precioReferencia: 13000,
    matriculaVerificada: false,
    lat: -32.961,
    lng: -60.671,
    pendienteAprobacion: true,
  },
  {
    id: "op-8",
    nombre: "Lucía Ferraro",
    rubro: "Electricidad",
    barrio: "Fisherton",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LuciaFerraro",
    calificacion: 4.7,
    reseñas: 67,
    precioReferencia: 15000,
    matriculaVerificada: true,
    lat: -32.9565,
    lng: -60.6845,
  },
];

export const operatorReviews: Record<string, Review[]> = {
  "op-1": [
    {
      id: "r1",
      autor: "María G.",
      estrellas: 5,
      comentario: "Solucionó una pérdida en minutos. Muy prolijo.",
      fecha: "2026-10-20",
    },
    {
      id: "r2",
      autor: "Julián T.",
      estrellas: 5,
      comentario: "Llegó puntual y explicó todo con claridad.",
      fecha: "2026-10-12",
    },
    {
      id: "r3",
      autor: "Ana L.",
      estrellas: 4,
      comentario: "Buen trabajo, solo demoró un poco en conseguir repuesto.",
      fecha: "2026-10-05",
    },
  ],
};

export const sampleOrders: SampleOrder[] = [
  {
    id: "ord-101",
    cliente: "Pedro Salinas",
    operadorId: "op-1",
    operadorNombre: "Martín Acosta",
    rubro: "Plomería",
    direccion: "San Martín 1450, Centro",
    descripcion: "Pérdida bajo el lavatorio",
    estado: "finalizado",
    montoTotal: 15000,
    montoNetoOperador: 13500,
    comisionAlden: 1500,
    fecha: "2026-10-28",
  },
  {
    id: "ord-102",
    cliente: "Sofía Blanco",
    operadorId: "op-2",
    operadorNombre: "Laura Méndez",
    rubro: "Electricidad",
    direccion: "Bv. Oroño 3200, Pichincha",
    descripcion: "Térmica que salta constantemente",
    estado: "en_camino",
    montoTotal: 15000,
    montoNetoOperador: 13500,
    comisionAlden: 1500,
    fecha: "2026-10-28",
  },
  {
    id: "ord-103",
    cliente: "Ricardo Núñez",
    operadorId: "op-3",
    operadorNombre: "Diego Romero",
    rubro: "Cerrajería",
    direccion: "Mendoza 5800, Fisherton",
    descripcion: "Cambio de cerradura por pérdida de llaves",
    estado: "aceptado",
    montoTotal: 15000,
    montoNetoOperador: 13500,
    comisionAlden: 1500,
    fecha: "2026-10-27",
  },
];

export const incomingOperatorOrder: SampleOrder = {
  id: "ord-incoming",
  cliente: "Camila Duarte",
  operadorId: "op-5",
  operadorNombre: "Facundo Ríos",
  rubro: "Electricidad",
  direccion: "Córdoba 2100, Centro",
  descripcion: "Instalación de luminaria en living",
  estado: "enviado",
  montoTotal: 15000,
  montoNetoOperador: 13500,
  comisionAlden: 1500,
  fecha: "2026-10-28",
};

export const operatorDayOrders: SampleOrder[] = [
  incomingOperatorOrder,
  sampleOrders[1],
  sampleOrders[2],
];

export const operatorWeeklyEarnings = {
  totalNeto: 121500,
  comisionDescontada: 13500,
  porDia: [
    { dia: "Lun", neto: 13500, bruto: 15000 },
    { dia: "Mar", neto: 27000, bruto: 30000 },
    { dia: "Mié", neto: 13500, bruto: 15000 },
    { dia: "Jue", neto: 40500, bruto: 45000 },
    { dia: "Vie", neto: 27000, bruto: 30000 },
    { dia: "Sáb", neto: 0, bruto: 0 },
    { dia: "Dom", neto: 0, bruto: 0 },
  ],
};

export const adminMetrics = {
  pedidosHoy: 24,
  facturacionMes: 360000,
  comisionCobrada: 36000,
  operadoresActivos: 7,
};

export const adminOrdersByDay = [
  { dia: "Lun", pedidos: 18 },
  { dia: "Mar", pedidos: 22 },
  { dia: "Mié", pedidos: 20 },
  { dia: "Jue", pedidos: 26 },
  { dia: "Vie", pedidos: 24 },
  { dia: "Sáb", pedidos: 14 },
  { dia: "Dom", pedidos: 9 },
];

export const pendingOperators = operators.filter((o) => o.pendienteAprobacion);

export function getOperatorById(id: string): Operator | undefined {
  return operators.find((o) => o.id === id);
}

export function getReviewsForOperator(id: string): Review[] {
  if (operatorReviews[id]) return operatorReviews[id];
  const op = getOperatorById(id);
  if (!op) return [];
  return [
    {
      id: "default-1",
      autor: "Cliente verificado",
      estrellas: 5,
      comentario: `Excelente ${op.rubro.toLowerCase()} en ${op.barrio}.`,
      fecha: "2026-10-15",
    },
    {
      id: "default-2",
      autor: "Mariana P.",
      estrellas: 4,
      comentario: "Muy profesional y amable.",
      fecha: "2026-10-08",
    },
    {
      id: "default-3",
      autor: "Lucas F.",
      estrellas: 5,
      comentario: "Recomendado, volvería a contratar.",
      fecha: "2026-09-30",
    },
  ];
}

export function calcCommission(total: number): number {
  return Math.round(total * ALDEN_COMMISSION_RATE);
}

export function calcNetForOperator(total: number): number {
  return total - calcCommission(total);
}
