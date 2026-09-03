import React, { useEffect, useMemo, useRef, useState } from "react";
import { Marker, Polyline, Circle } from "@react-google-maps/api";
import { Layers, LocateFixed, Maximize2, Minimize2, Plus, Minus } from "lucide-react";
import {
  displayOrDash,
  getTripField,
} from "../route-details/routeVehicleDisplay";
import useLiveTrackLocations from "../../hooks/useLiveTrackLocations";
import {
  DUMMY_MAP_ROUTE,
  getDummyMapStops,
} from "./routeHistoryData";
import GoogleMapView from "../../components/Ui/GoogleMapView";
import { toLatLng } from "../../components/Ui/googleMapTheme";

const FALLBACK_CENTER = { lat: 20.5937, lng: 78.9629 };
const DELHI_CENTER = { lat: 28.6139, lng: 77.209 };

const ambientVehicles = [
  { id: "amb-1", lat: 28.625, lng: 77.221, plate: "MH09-1120", type: "moving" },
  { id: "amb-2", lat: 28.605, lng: 77.189, plate: "MH12-9021", type: "idle" },
  { id: "amb-3", lat: 28.591, lng: 77.231, plate: "DL03-4581", type: "moving" },
];

function resolvePosition(vehicle) {
  return toLatLng(vehicle?.position) || toLatLng(vehicle);
}

const markerIcon = (color) => ({
  path: "M3 17V7a2 2 0 0 1 2-2h7v12H3zm11-8h3l3 4v4h-6V9z",
  fillColor: color,
  fillOpacity: 1,
  strokeColor: "#141416",
  strokeWeight: 1.4,
  scale: 1.15,
  anchor: { x: 12, y: 12 },
});

export default function LiveMap({ selectedVehicle, showRoutePath, focusedStop = null }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const lastBboxRef = useRef("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [bboxParams, setBboxParams] = useState(null);
  const vehicle = selectedVehicle ?? null;

  const { locations } = useLiveTrackLocations({
    refetchInterval: 30_000,
    params: bboxParams ?? {},
  });

  const liveVehicles = useMemo(() => {
    if (!Array.isArray(locations?.vehicles)) return [];
    return locations.vehicles
      .map((item) => ({
        id: item.unique_id ?? item.reg_no ?? item.vehicle_number ?? item.id,
        plate: item.reg_no ?? item.vehicle_number ?? item.id,
        reg_no: item.reg_no,
        vehicle_number: item.vehicle_number,
        status: item.status,
        lat: Number(item.lat),
        lng: Number(item.lng),
        speed: item.speed_kmh,
        lastSeenSec: item.last_seen_sec,
      }))
      .filter((row) => Number.isFinite(row.lat) && Number.isFinite(row.lng));
  }, [locations]);

  const position = resolvePosition(vehicle);
  const mapCenter =
    position ||
    (liveVehicles[0] ? { lat: liveVehicles[0].lat, lng: liveVehicles[0].lng } : null) ||
    (showRoutePath ? FALLBACK_CENTER : DELHI_CENTER);

  const routePath = useMemo(
    () => (DUMMY_MAP_ROUTE || []).map((point) => toLatLng(point)).filter(Boolean),
    []
  );
  const dummyStops = useMemo(() => getDummyMapStops(), []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsMaximized(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const handleIdle = (map) => {
    try {
      const bounds = map.getBounds();
      if (!bounds) return;
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      const newBbox = `${sw.lat().toFixed(4)},${sw.lng().toFixed(4)},${ne.lat().toFixed(4)},${ne.lng().toFixed(4)}`;
      if (lastBboxRef.current !== newBbox) {
        lastBboxRef.current = newBbox;
        setBboxParams({ bbox: newBbox });
      }
    } catch {
      /* ignore */
    }
  };

  const handleToggleMaximize = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement === el) {
        await document.exitFullscreen?.();
      } else if (el.requestFullscreen) {
        await el.requestFullscreen();
      }
    } catch {
      /* ignore */
    }
  };

  const trucks = useMemo(() => {
    if (showRoutePath) {
      return position
        ? [
            {
              id: vehicle?.id || "__selected__",
              lat: position.lat,
              lng: position.lng,
              color: "#FDBB24",
              label: vehicle?.reg_no ?? vehicle?.vehicle_number ?? vehicle?.plate ?? "",
            },
          ]
        : [];
    }

    if (liveVehicles.length > 0) {
      return liveVehicles
        .filter((live) => {
          if (!bboxParams?.bbox) return true;
          const [south, west, north, east] = bboxParams.bbox.split(",").map(Number);
          return live.lat >= south && live.lat <= north && live.lng >= west && live.lng <= east;
        })
        .map((live) => ({
          id: live.id,
          lat: live.lat,
          lng: live.lng,
          color: String(live.status || "").toLowerCase().includes("idle")
            ? "#f59e0b"
            : String(live.status || "").toLowerCase().includes("offline")
              ? "#ef4444"
              : "#10b981",
          label: live.reg_no ?? live.vehicle_number ?? live.plate ?? live.id,
        }));
    }

    return ambientVehicles.map((amb) => ({
      id: amb.id,
      lat: amb.lat,
      lng: amb.lng,
      color: amb.type === "moving" ? "#10b981" : "#8b8b93",
      label: amb.plate,
    }));
  }, [showRoutePath, liveVehicles, bboxParams, position, vehicle]);

  return (
    <div ref={containerRef} className="relative h-full w-full bg-[#0c0c0e]">
      <GoogleMapView
        center={mapCenter}
        zoom={showRoutePath ? 13 : 12}
        mapRef={mapRef}
        onIdle={handleIdle}
      >
        {trucks.map((truck) => (
          <Marker
            key={truck.id}
            position={{ lat: truck.lat, lng: truck.lng }}
            title={String(truck.label || truck.id)}
            icon={markerIcon(truck.color)}
          />
        ))}

        {showRoutePath ? (
          <>
            <Polyline
              path={routePath}
              options={{ strokeColor: "#22c55e", strokeWeight: 4, strokeOpacity: 0.9 }}
            />
            {dummyStops.map((stop) => (
              <Circle
                key={stop.id}
                center={{ lat: Number(stop.lat), lng: Number(stop.lng) }}
                radius={focusedStop?.id === stop.id ? 40 : 24}
                options={{
                  strokeColor: "#ef4444",
                  fillColor: "#ef4444",
                  fillOpacity: 1,
                  strokeWeight: focusedStop?.id === stop.id ? 3 : 2,
                }}
              />
            ))}
          </>
        ) : null}
      </GoogleMapView>

      {!showRoutePath && vehicle ? (
        <div className="absolute top-[52%] left-2 z-[1000] flex flex-col items-start pointer-events-auto">
          <div className="w-[125px] sm:w-[135px] bg-[#17171C]/95 backdrop-blur-sm border border-[#2A2A2F] rounded-lg p-2 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-1 mb-1">
              <span className="text-[8.5px] font-extrabold text-white tracking-tight truncate max-w-[75px]">
                {displayOrDash(vehicle.plate)}
              </span>
              <span className="text-[7.5px] text-[#FDBB24] font-semibold tracking-wide uppercase shrink-0">
                {displayOrDash(vehicle.type)}
              </span>
            </div>
            <div className="flex justify-between text-[8px] leading-tight mb-0.5">
              <span className="text-zinc-400 font-medium">Speed</span>
              <span className="font-bold text-white">{displayOrDash(vehicle.speed)}</span>
            </div>
            <div className="flex justify-between text-[8px] leading-tight">
              <span className="text-zinc-400 font-medium">Dist.</span>
              <span className="font-bold text-white truncate max-w-[50px] text-right">
                {displayOrDash(
                  getTripField(vehicle, ["distance_km", "distance", "remaining_distance_km"])
                )}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      <div className="absolute right-2 top-2 z-[1000]">
        <button
          type="button"
          className="w-6.5 h-6.5 rounded-md bg-[#17171C]/90 backdrop-blur-sm border border-[#2A2A2F] text-zinc-400 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
        >
          <Layers size={11} />
        </button>
      </div>

      <div className="absolute right-2 bottom-2 z-[1000] flex flex-col bg-[#17171C]/90 backdrop-blur-sm border border-[#2A2A2F] rounded-md shadow-xl overflow-hidden">
        <button
          type="button"
          onClick={handleToggleMaximize}
          aria-label={isMaximized ? "Minimize map" : "Maximize map"}
          className="w-6.5 h-6.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer"
        >
          {isMaximized ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
        </button>
        <button
          type="button"
          onClick={() => {
            if (!position || !mapRef.current) return;
            mapRef.current.panTo(position);
            mapRef.current.setZoom(Math.max(mapRef.current.getZoom() || 12, 14));
          }}
          aria-label="Locate vehicle"
          className="w-6.5 h-6.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer"
        >
          <LocateFixed size={10} />
        </button>
        <button
          type="button"
          onClick={() => mapRef.current?.setZoom((mapRef.current.getZoom() || 12) + 1)}
          aria-label="Zoom in"
          className="w-6.5 h-6.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Plus size={10} />
        </button>
        <button
          type="button"
          onClick={() => mapRef.current?.setZoom((mapRef.current.getZoom() || 12) - 1)}
          aria-label="Zoom out"
          className="w-6.5 h-6.5 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <Minus size={10} />
        </button>
      </div>
    </div>
  );
}
