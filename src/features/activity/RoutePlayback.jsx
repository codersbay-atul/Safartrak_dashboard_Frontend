import React, { useMemo, useRef, useState } from "react";
import { Marker, Polyline } from "@react-google-maps/api";
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
import GoogleMapView from "../../components/Ui/GoogleMapView";
import { toLatLng } from "../../components/Ui/googleMapTheme";

const SPEED_OPTIONS = [1, 2, 4];

const toPath = (points) => points.map((point) => toLatLng(point)).filter(Boolean);

const dotIcon = (color, scale = 5) => ({
  path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
  scale,
  fillColor: color,
  fillOpacity: 1,
  strokeColor: "#111115",
  strokeWeight: 1.5,
});

export default function RoutePlayback() {
  const mapRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(42);

  const path = useMemo(() => toPath(ROUTE_COORDINATES), []);
  const truckPosition = path[
    Math.min(path.length - 1, Math.floor((progress / 100) * (path.length - 1)))
  ];
  const center = path[Math.floor(path.length / 2)] || { lat: 28.6139, lng: 77.209 };

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-full border border-[#1f1f23] rounded-xl flex flex-col overflow-hidden select-none font-sans"
    >
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
        <GoogleMapView center={center} zoom={13} mapRef={mapRef}>
          <Polyline
            path={path}
            options={{
              strokeColor: "#FDBB24",
              strokeWeight: 4,
              strokeOpacity: 0.9,
            }}
          />
          {path[0] ? <Marker position={path[0]} icon={dotIcon("#22c55e", 6)} /> : null}
          {path.at(-1) ? <Marker position={path.at(-1)} icon={dotIcon("#ef4444", 6)} /> : null}
          {path.slice(1, -1).map((pos, i) => (
            <Marker key={`wp-${i}`} position={pos} icon={dotIcon("#ffffff", 4)} />
          ))}
          {truckPosition ? <Marker position={truckPosition} title="Vehicle" /> : null}
        </GoogleMapView>

        <button
          type="button"
          className="absolute top-3 right-3 z-[500] p-1.5 rounded-md bg-[#121214]/90 border border-[#27272a] text-[#a1a1aa] hover:text-white cursor-pointer"
          aria-label="Layers"
        >
          <Layers size={13} />
        </button>

        <div className="absolute right-3 bottom-16 z-[500] flex flex-col gap-1">
          <button
            type="button"
            className="p-1.5 rounded-md bg-[#121214]/90 border border-[#27272a] text-[#a1a1aa] hover:text-white cursor-pointer"
            aria-label="Fullscreen"
          >
            <Maximize2 size={13} />
          </button>
          <button
            type="button"
            onClick={() => truckPosition && mapRef.current?.panTo(truckPosition)}
            className="p-1.5 rounded-md bg-[#121214]/90 border border-[#27272a] text-[#a1a1aa] hover:text-white cursor-pointer"
            aria-label="Locate"
          >
            <LocateFixed size={13} />
          </button>
          <button
            type="button"
            onClick={() => mapRef.current?.setZoom((mapRef.current.getZoom() || 13) + 1)}
            className="p-1.5 rounded-md bg-[#121214]/90 border border-[#27272a] text-[#a1a1aa] hover:text-white cursor-pointer"
            aria-label="Zoom in"
          >
            <Plus size={13} />
          </button>
          <button
            type="button"
            onClick={() => mapRef.current?.setZoom((mapRef.current.getZoom() || 13) - 1)}
            className="p-1.5 rounded-md bg-[#121214]/90 border border-[#27272a] text-[#a1a1aa] hover:text-white cursor-pointer"
            aria-label="Zoom out"
          >
            <Minus size={13} />
          </button>
        </div>

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
