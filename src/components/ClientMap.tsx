"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CLIENT_LOCATION, type Operator } from "@/lib/data";
import Link from "next/link";
import { useEffect } from "react";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function ClientMap({ operators }: { operators: Operator[] }) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
      ._getIconUrl;
  }, []);

  return (
    <MapContainer
      center={[CLIENT_LOCATION.lat, CLIENT_LOCATION.lng]}
      zoom={13}
      className="h-full w-full z-0"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[CLIENT_LOCATION.lat, CLIENT_LOCATION.lng]}
        icon={L.divIcon({
          className: "",
          html: `<div style="background:#F97316;width:14px;height:14px;border-radius:9999px;border:2px solid white;box-shadow:0 0 0 2px #3730A3"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        })}
      >
        <Popup>Tu ubicación (demo)</Popup>
      </Marker>
      {operators.map((op) => (
        <Marker key={op.id} position={[op.lat, op.lng]} icon={icon}>
          <Popup>
            <strong>{op.nombre}</strong>
            <br />
            {op.rubro}
            <br />
            <Link href={`/operador/${op.id}`} className="text-alden-primary underline">
              Ver perfil
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
