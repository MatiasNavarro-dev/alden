# Alden

App demo de servicios para el hogar en Rosario (Next.js 14, App Router, TypeScript, Tailwind). PWA instalable con datos ficticios en `src/lib/data.ts`.

## Pantallas

- `/` — Bienvenida y registro simulado (cliente / operador)
- `/cliente` — Mapa con operadores y listado
- `/operador/[id]` — Perfil, reseñas y solicitud de servicio
- `/pago` — Resumen y pago simulado Mercado Pago
- `/seguimiento` — Estados automáticos y calificación
- `/operador` — Panel del operador (pedidos y ganancias)
- `/admin` — Panel de administración (escritorio)

## Desarrollo

```bash
npm install
npm run icons
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000). Probá ancho **390px** en DevTools para mobile.

## PWA

- Manifest: `public/manifest.webmanifest`
- Íconos: `public/icons/` (`npm run icons`)

## Deploy en Vercel

1. Subí el repo a GitHub o conectá la carpeta en [vercel.com](https://vercel.com).
2. Framework preset: **Next.js** (detectado automáticamente).
3. Build command: `npm run build` · Output: default.
4. No requiere variables de entorno para la demo.

Alternativa CLI:

```bash
npx vercel
```

## Paleta

- Principal: `#3730A3`
- Acento: `#F97316`
- Fondo: `#F8FAFC`
