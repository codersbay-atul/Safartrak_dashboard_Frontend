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
import { Layers, LocateFixed, Maximize2, Plus, Minus } from "lucide-react";

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

const createCenterIcon = (color) =>
  L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="width:16px;height:16px;border-radius:9999px;background:${color};border:2px solid #111115;box-shadow:0 0 10px ${color}88;"></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

export default function AoiMap({ aois = [], selectedAoi }) {
  const mapRef = useRef(null);
  const focusCenter = selectedAoi?.center || [20.5937, 78.9629];
  const focusZoom = selectedAoi ? 11 : 5;

  return (
    <div className="relative h-full w-full bg-[#0c0c0e] rounded-xl overflow-hidden border border-[#1f1f23]">
      <MapContainer
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
        <MapFocus center={focusCenter} zoom={focusZoom} />

        {aois.map((aoi) => (
          <React.Fragment key={aoi.id}>
            <Circle
              center={aoi.center}
              radius={aoi.radiusMeters}
              pathOptions={{
                color: aoi.color,
                fillColor: aoi.color,
                fillOpacity: selectedAoi?.id === aoi.id ? 0.28 : 0.14,
                weight: selectedAoi?.id === aoi.id ? 2.5 : 1.5,
                opacity: aoi.status === "active" ? 0.9 : 0.45,
              }}
            />
            <Marker
              position={aoi.center}
              icon={createCenterIcon(aoi.color)}
            />
          </React.Fragment>
        ))}
      </MapContainer>

      <div className="absolute right-2.5 top-2.5 z-[1000]">
        <button
          type="button"
          className="w-7.5 h-7.5 rounded-lg bg-[#17171C] border border-[#2A2A2F] text-zinc-400 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
        >
          <Layers size={12} />
        </button>
      </div>

      <div className="absolute right-2.5 bottom-2.5 z-[1000] flex flex-col bg-[#17171C] border border-[#2A2A2F] rounded-lg shadow-xl overflow-hidden">
        <button
          type="button"
          onClick={() => mapRef.current?.invalidateSize()}
          className="w-7.5 h-7.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Maximize2 size={11} />
        </button>
        <button
          type="button"
          onClick={() =>
            mapRef.current?.locate({ setView: true, maxZoom: 12 })
          }
          className="w-7.5 h-7.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer"
        >
          <LocateFixed size={11} />
        </button>
        <button
          type="button"
          onClick={() => mapRef.current?.zoomIn()}
          className="w-7.5 h-7.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Plus size={11} />
        </button>
        <button
          type="button"
          onClick={() => mapRef.current?.zoomOut()}
          className="w-7.5 h-7.5 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <Minus size={11} />
        </button>
      </div>
    </div>
  );
}
