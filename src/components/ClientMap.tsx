"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CLIENT_LOCATION, SERVICE_FEE, type Operator } from "@/lib/data";
import { avatarColor, getInitials } from "@/lib/ui";
import { formatArs } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";

function markerIcon(op: Operator, highlighted?: boolean) {
  const bg = avatarColor(op.id);
  const size = highlighted ? 44 : 38;
  return L.divIcon({
    className: "",
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:9999px;
      background:${bg};color:white;font-weight:700;font-size:11px;
      display:flex;align-items:center;justify-content:center;
      border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,.25);
    ">${getInitials(op.nombre)}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function ClientMap({ operators }: { operators: Operator[] }) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
      ._getIconUrl;
  }, []);

  const featured = operators[0];

  return (
    <MapContainer
      center={[CLIENT_LOCATION.lat, CLIENT_LOCATION.lng]}
      zoom={13}
      className="h-full w-full"
      zoomControl={false}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[CLIENT_LOCATION.lat, CLIENT_LOCATION.lng]}
        icon={L.divIcon({
          className: "",
          html: `<div style="width:16px;height:16px;border-radius:9999px;background:#2563EB;border:3px solid white;box-shadow:0 0 0 6px rgba(37,99,235,.25)"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        })}
      />
      {operators.map((op) => (
        <Marker
          key={op.id}
          position={[op.lat, op.lng]}
          icon={markerIcon(op, op.id === featured?.id)}
        >
          <Popup>
            <strong>{op.nombre}</strong>
            <br />
            {formatArs(op.precioReferencia)}
            <br />
            <Link href={`/operador/${op.id}`}>Ver perfil</Link>
          </Popup>
        </Marker>
      ))}
      {featured && (
        <Marker
          position={[featured.lat + 0.002, featured.lng + 0.003]}
          icon={L.divIcon({
            className: "",
            html: `<div style="background:#0f172a;color:white;padding:4px 8px;border-radius:8px;font-size:11px;font-weight:700;white-space:nowrap">${formatArs(SERVICE_FEE)}</div>`,
            iconSize: [70, 24],
            iconAnchor: [35, 30],
          })}
        />
      )}
    </MapContainer>
  );
}
