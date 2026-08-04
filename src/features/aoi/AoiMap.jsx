import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Layers, LocateFixed, Maximize2, Plus, Minus, Warehouse } from "lucide-react";
import ReactDOMServer from "react-dom/server";

const COLOR_PALETTE = [
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
  "#3b82f6",
  "#ef4444",
  "#ec4899",
  "#06b6d4",
];

const parseCenter = (center) => {
  if (!center || !Array.isArray(center) || center.length < 2) {
    return [20.5937, 78.9629];
  }

  const [a, b] = center.map(Number);

  if (Math.abs(a) > 50 && Math.abs(b) <= 50) {
    return [b, a];
  }

  return [a, b];
};

const parseRadiusMeters = (aoi) => {
  if (aoi.radiusMeters) return Number(aoi.radiusMeters);
  if (aoi.raw?.geometry?.radius_m) return Number(aoi.raw.geometry.radius_m);
  if (aoi.raw?.geometry?.radius_km) return Number(aoi.raw.geometry.radius_km) * 1000;
  if (aoi.radius) {
    const parsed = parseFloat(aoi.radius);
    return parsed < 100 ? parsed * 1000 : parsed;
  }
  return 3000;
};

function MapFocus({ center, zoom = 11 }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);

  return null;
}

function MapBinder({ mapRef }) {
  const map = useMap();

  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);

  return null;
}

const createCenterIcon = (color) => {
  const iconHtml = ReactDOMServer.renderToString(
    <div
      style={{
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}66`,
      }}
      className="w-8 h-8 rounded-xl flex items-center justify-center border border-black/30 text-black font-bold shadow-md"
    >
      <Warehouse size={18} strokeWidth={2.3} color="#0d0d11" />
    </div>
  );

  return L.divIcon({
    className: "custom-leaflet-marker",
    html: iconHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export default function AoiMap({ aois = [], selectedAoi }) {
  const mapRef = useRef(null);

  const parsedSelectedCenter = selectedAoi ? parseCenter(selectedAoi.center) : null;
  const focusCenter = parsedSelectedCenter || [20.5937, 78.9629];
  const focusZoom = selectedAoi ? 12 : 6;
  const mapKey = selectedAoi?.id || "default";

  return (
    <div className="relative h-full w-full bg-[#0c0c0e] rounded-xl overflow-hidden border border-[#1f1f23]">
      <MapContainer
        key={mapKey}
        center={focusCenter}
        zoom={focusZoom}
        zoomControl={false}
        className="h-full w-full z-0"
        style={{ background: "#0B0F19" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap"
        />

        <MapBinder mapRef={mapRef} />
        {parsedSelectedCenter && <MapFocus center={parsedSelectedCenter} zoom={focusZoom} />}

        {aois.map((aoi, index) => {
          const isSelected = selectedAoi?.id === aoi.id;
          const aoiCenter = parseCenter(aoi.center);
          const radiusMeters = parseRadiusMeters(aoi);

          const circleColor = COLOR_PALETTE[index % COLOR_PALETTE.length];

          return (
            <React.Fragment key={`${aoi.id || index}-${circleColor}`}>
              <Circle
                center={aoiCenter}
                radius={radiusMeters}
                pathOptions={{
                  color: circleColor,
                  fillColor: circleColor,
                  fillOpacity: isSelected ? 0.08 : 0.04,
                  weight: isSelected ? 1.5 : 1,
                  opacity: isSelected ? 0.65 : 0.45,
                }}
              />
              <Marker
                position={aoiCenter}
                icon={createCenterIcon(circleColor)}
              />
            </React.Fragment>
          );
        })}
      </MapContainer>

      <div className="absolute right-3 top-3 z-[1000]">
        <button
          type="button"
          className="w-8.5 h-8.5 rounded-lg bg-[#17171C] border border-[#2A2A2F] text-zinc-400 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
        >
          <Layers size={15} />
        </button>
      </div>

      <div className="absolute right-3 bottom-3 z-[1000] flex flex-col gap-2">
        <button
          type="button"
          onClick={() => mapRef.current?.invalidateSize()}
          className="w-8.5 h-8.5 rounded-lg bg-[#17171C] border border-[#2A2A2F] text-zinc-400 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
        >
          <Maximize2 size={14} />
        </button>

        <button
          type="button"
          onClick={() =>
            mapRef.current?.locate({ setView: true, maxZoom: 12 })
          }
          className="w-8.5 h-8.5 rounded-lg bg-[#17171C] border border-[#2A2A2F] text-zinc-400 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
        >
          <LocateFixed size={14} />
        </button>

        <div className="flex flex-col rounded-lg bg-[#17171C] border border-[#2A2A2F] shadow-xl overflow-hidden">
          <button
            type="button"
            onClick={() => mapRef.current?.zoomIn()}
            className="w-8.5 h-8.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer hover:bg-[#202026]"
          >
            <Plus size={14} />
          </button>
          <button
            type="button"
            onClick={() => mapRef.current?.zoomOut()}
            className="w-8.5 h-8.5 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer hover:bg-[#202026]"
          >
            <Minus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}