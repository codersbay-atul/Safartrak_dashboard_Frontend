import React, { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Layers,
  LocateFixed,
  Maximize2,
  Plus,
  Minus,
  SkipBack,
  SkipForward,
  Play,
  Pause,
} from "lucide-react";
import { ROUTE_COORDINATES } from "./activityData";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

const truckIcon = L.divIcon({
  className: "custom-leaflet-marker",
  html: `
    <div class="relative flex items-center justify-center" style="width: 44px; height: 44px;">
      <div class="absolute w-10 h-10 rounded-full bg-[#FDBB24]/15 animate-pulse"></div>
      <div class="relative w-8 h-8 bg-[#111115] border-2 border-[#FDBB24] rounded-lg flex items-center justify-center shadow-[0_4px_14px_rgba(253,187,36,0.55)]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FDBB24" stroke-width="2.2" class="w-4.5 h-4.5">
          <path d="M14 17H3a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 3 5h11v12z" fill="#FDBB24" fill-opacity="0.12" />
          <path d="M14 8.5h3.5l3.5 3.5v5H14v-8.5z" />
          <circle cx="5" cy="17.5" r="1.6" fill="#111115" stroke="#FDBB24" stroke-width="1.8" />
          <circle cx="16.5" cy="17.5" r="1.6" fill="#111115" stroke="#FDBB24" stroke-width="1.8" />
        </svg>
      </div>
    </div>
  `,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

const pinIcon = L.divIcon({
  className: "custom-leaflet-marker",
  html: `
    <div style="width: 18px; height: 18px; display:flex; align-items:center; justify-content:center;">
      <div style="width:10px;height:10px;border-radius:9999px;background:#fff;border:2px solid #FDBB24;box-shadow:0 0 8px rgba(253,187,36,0.5);"></div>
    </div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const flagIcon = (color) =>
  L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="width:24px;height:28px;display:flex;align-items:flex-end;justify-content:center;">
        <svg width="16" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M5 22V3" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M5 4h10l-2 3 2 3H5" fill="${color}" fill-opacity="0.9"/>
        </svg>
      </div>
    `,
    iconSize: [24, 28],
    iconAnchor: [5, 26],
  });

function MapControls() {
  const map = useMap();

  return (
    <>
      <button
        type="button"
        onClick={() => {}}
        className="absolute top-3 right-3 z-[500] p-1.5 rounded-md bg-[#121214]/90 border border-[#27272a] text-[#a1a1aa] hover:text-white cursor-pointer"
        aria-label="Layers"
      >
        <Layers size={13} />
      </button>

      <div className="absolute right-3 bottom-16 z-[500] flex flex-col gap-1">
        <button
          type="button"
          onClick={() => {}}
          className="p-1.5 rounded-md bg-[#121214]/90 border border-[#27272a] text-[#a1a1aa] hover:text-white cursor-pointer"
          aria-label="Fullscreen"
        >
          <Maximize2 size={13} />
        </button>
        <button
          type="button"
          onClick={() => map.locate({ setView: true, maxZoom: 14 })}
          className="p-1.5 rounded-md bg-[#121214]/90 border border-[#27272a] text-[#a1a1aa] hover:text-white cursor-pointer"
          aria-label="Locate"
        >
          <LocateFixed size={13} />
        </button>
        <button
          type="button"
          onClick={() => map.zoomIn()}
          className="p-1.5 rounded-md bg-[#121214]/90 border border-[#27272a] text-[#a1a1aa] hover:text-white cursor-pointer"
          aria-label="Zoom in"
        >
          <Plus size={13} />
        </button>
        <button
          type="button"
          onClick={() => map.zoomOut()}
          className="p-1.5 rounded-md bg-[#121214]/90 border border-[#27272a] text-[#a1a1aa] hover:text-white cursor-pointer"
          aria-label="Zoom out"
        >
          <Minus size={13} />
        </button>
      </div>
    </>
  );
}

const SPEED_OPTIONS = [1, 2, 4];

export default function RoutePlayback() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(42);

  const truckPosition = useMemo(() => {
    const idx = Math.min(
      ROUTE_COORDINATES.length - 1,
      Math.floor((progress / 100) * (ROUTE_COORDINATES.length - 1))
    );
    return ROUTE_COORDINATES[idx];
  }, [progress]);

  const center = ROUTE_COORDINATES[Math.floor(ROUTE_COORDINATES.length / 2)];

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-full border border-[#1f1f23] rounded-xl flex flex-col overflow-hidden select-none font-sans"
    >
      {/* 14px Header Title */}
      <div className="shrink-0 px-3 py-2.5 border-b border-[#1f1f23]">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-bold tracking-tight block"
        >
          Route Playback
        </MainLayoutColor>
      </div>

      <div className="relative flex-1 min-h-0 bg-[#0c0c0e]">
        <MapContainer
          center={center}
          zoom={13}
          zoomControl={false}
          className="h-full w-full z-0"
          style={{ background: "#0B0F19" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <Polyline
            positions={ROUTE_COORDINATES}
            pathOptions={{
              color: "#FDBB24",
              weight: 4,
              opacity: 0.9,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
          <Marker position={ROUTE_COORDINATES[0]} icon={flagIcon("#22c55e")} />
          <Marker
            position={ROUTE_COORDINATES[ROUTE_COORDINATES.length - 1]}
            icon={flagIcon("#ef4444")}
          />
          {ROUTE_COORDINATES.slice(1, -1).map((pos, i) => (
            <Marker key={`wp-${i}`} position={pos} icon={pinIcon} />
          ))}
          <Marker position={truckPosition} icon={truckIcon} />
          <MapControls />
        </MapContainer>

        {/* Playback Control Bar */}
        <div className="absolute left-2 right-2 bottom-2 z-[500] rounded-xl bg-[#0f0f12]/92 border border-[#27272a] backdrop-blur-sm px-2.5 py-2 shadow-xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setProgress((p) => Math.max(0, p - 8))}
                className="p-1 rounded-md text-[#a1a1aa] hover:text-white hover:bg-[#18181b] cursor-pointer"
                aria-label="Previous"
              >
                <SkipBack size={14} />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="p-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-white hover:border-[#FDBB24]/40 cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                type="button"
                onClick={() => setProgress((p) => Math.min(100, p + 8))}
                className="p-1 rounded-md text-[#a1a1aa] hover:text-white hover:bg-[#18181b] cursor-pointer"
                aria-label="Next"
              >
                <SkipForward size={14} />
              </button>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {SPEED_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSpeed(opt)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                    speed === opt
                      ? "bg-[#FDBB24] text-black"
                      : "bg-[#18181b] text-[#a1a1aa] border border-[#27272a] hover:text-white"
                  }`}
                >
                  <MainLayoutTextSize size="captionText" className="font-bold">
                    {opt}x
                  </MainLayoutTextSize>
                </button>
              ))}
            </div>

            <div className="flex-1 min-w-[140px] flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="flex-1 h-1.5 accent-[#22c55e] cursor-pointer"
              />
              <MainLayoutColor
                as={MainLayoutTextSize}
                color="subtitle"
                size="subInfoText"
                className="whitespace-nowrap tabular-nums shrink-0"
              >
                10:42:36 AM / 06:28:54 PM
              </MainLayoutColor>
            </div>
          </div>
        </div>
      </div>
    </MainLayoutColor>
  );
}