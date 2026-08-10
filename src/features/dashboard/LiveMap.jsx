import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layers, LocateFixed, Maximize2, Minimize2, Plus, Minus } from "lucide-react";
import {
  displayOrDash,
  getTripField,
  shouldShowNoActiveTrip,
} from "../route-details/routeVehicleDisplay";
import useLiveTrackLocations from "../../hooks/useLiveTrackLocations";

const FALLBACK_CENTER = [20.5937, 78.9629];

const ambientVehicles = [
  { id: "amb-1", position: [28.625, 77.221], plate: "MH09-1120", type: "moving" },
  { id: "amb-2", position: [28.605, 77.189], plate: "MH12-9021", type: "idle" },
  { id: "amb-3", position: [28.591, 77.231], plate: "DL03-4581", type: "moving" },
];

function resolvePosition(vehicle) {
  if (Array.isArray(vehicle?.position) && vehicle.position.length === 2) {
    const [lat, lng] = vehicle.position;
    if (Number.isFinite(lat) && Number.isFinite(lng)) return [lat, lng];
  }
  if (
    vehicle?.lat != null &&
    vehicle?.lng != null &&
    Number.isFinite(Number(vehicle.lat)) &&
    Number.isFinite(Number(vehicle.lng))
  ) {
    return [Number(vehicle.lat), Number(vehicle.lng)];
  }
  return null;
}

export default function LiveMap({ selectedVehicle, showRoutePath }) {
  const containerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersLayerRef = useRef(null);
  const markersMapRef = useRef(null);
  const lastBboxRef = useRef("");
  
  const [leafletLoaded, setLeafletLoaded] = useState(false);
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
      .filter(
        (vehicle) =>
          Number.isFinite(vehicle.lat) && Number.isFinite(vehicle.lng)
      );
  }, [locations]);

  const position = resolvePosition(vehicle);
  const mapCenter = position
    ? position
    : liveVehicles.length > 0
      ? [liveVehicles[0].lat, liveVehicles[0].lng]
      : showRoutePath
        ? FALLBACK_CENTER
        : [28.6139, 77.209];
  const noActiveTrip = shouldShowNoActiveTrip(vehicle);

  const startedAt = noActiveTrip
    ? null
    : getTripField(vehicle, ["started_at", "trip_started_at", "startedAt"]);
  const eta = noActiveTrip
    ? null
    : getTripField(vehicle, ["eta", "eta_text", "etaText"]);
  const destination = noActiveTrip
    ? null
    : getTripField(vehicle, [
        "destination",
        "route_destination",
        "end_location",
      ]);
  const origin = noActiveTrip
    ? null
    : getTripField(vehicle, ["origin", "route_origin", "start_location"]);
  const tripId = noActiveTrip
    ? null
    : getTripField(vehicle, ["trip_id", "tripId"]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsMaximized(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  const handleZoomIn = () => {
    const map = leafletMapRef.current;
    if (map) map.setZoom(map.getZoom() + 1);
  };

  const handleZoomOut = () => {
    const map = leafletMapRef.current;
    if (map) map.setZoom(map.getZoom() - 1);
  };

  useEffect(() => {
    if (leafletLoaded) return;

    const loadLeaflet = () => {
      if (window.L) {
        setLeafletLoaded(true);
        return;
      }

      const cssHref = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      const jsSrc = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssHref;
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = jsSrc;
      script.async = true;
      script.onload = () => {
        setLeafletLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load Leaflet from CDN");
      };
      document.body.appendChild(script);
    };

    loadLeaflet();
  }, [leafletLoaded]);

  useEffect(() => {
    if (!leafletLoaded) return;
    if (leafletMapRef.current) return;

    const container = document.getElementById("leaflet-map");
    if (!container) return;

    const L = window.L;
    if (!L) return;

    if (container._leaflet_id != null) {
      try {
        delete container._leaflet_id;
      } catch (e) {
        container._leaflet_id = null;
      }
      container.innerHTML = "";
    }

    const map = L.map(container, { zoomControl: false, preferCanvas: true }).setView(
      mapCenter,
      showRoutePath ? 13 : 12
    );

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      maxZoom: 19,
      subdomains: "abcd",
      detectRetina: true,
    }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);
    leafletMapRef.current = map;
    markersLayerRef.current = markersLayer;
    markersMapRef.current = new Map();

    let debounceTimer = null;

    const handleMapMove = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        try {
          const bounds = map.getBounds();
          if (!bounds) return;
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();

          const newBbox = `${sw.lat.toFixed(4)},${sw.lng.toFixed(4)},${ne.lat.toFixed(4)},${ne.lng.toFixed(4)}`;

          if (lastBboxRef.current !== newBbox) {
            lastBboxRef.current = newBbox;
            setBboxParams({ bbox: newBbox });
          }
        } catch (err) {}
      }, 400);
    };

    map.on("moveend", handleMapMove);
    handleMapMove();

    return () => {
      clearTimeout(debounceTimer);
      try {
        map.off("moveend", handleMapMove);
        map.remove();
      } catch (e) {}
      const cleanupContainer = document.getElementById("leaflet-map");
      if (cleanupContainer) {
        cleanupContainer.innerHTML = "";
      }
      leafletMapRef.current = null;
      markersLayerRef.current = null;
    };
  }, [leafletLoaded]);

  useEffect(() => {
    const L = window.L;
    const map = leafletMapRef.current;
    const layer = markersLayerRef.current;
    if (!L || !map || !layer) return;

    const markersMap = markersMapRef.current || new Map();

    const escapeHtml = (str) =>
      String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const makeTruckDivIcon = (color, isSelected, labelText) => {
      const boxSize = isSelected ? 48 : 42;
      const borderThemeColor = color;

      const truckSvg = encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
          <path d="M15 18H9"/>
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
          <circle cx="7" cy="18" r="2"/>
          <circle cx="17" cy="18" r="2"/>
        </svg>
      `);

      const labelHtml = labelText
        ? `<div style="margin-top:4px;background:rgba(23,23,28,0.9);color:#fff;padding:2px 6px;border-radius:6px;font-size:10px;font-weight:600;white-space:nowrap;border:1px solid #2a2a2f;box-shadow:0 4px 12px rgba(0,0,0,0.5);">${escapeHtml(labelText)}</div>`
        : "";

      const html = `
        <div style="display:flex;flex-direction:column;align-items:center;transform:translateY(-50%);">
          <div style="
            width:${boxSize}px;
            height:${boxSize}px;
            background:#141416;
            border:2px solid ${borderThemeColor};
            border-radius:12px;
            display:flex;
            align-items:center;
            justify-content:center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.6);
          ">
            <img src="data:image/svg+xml;charset=UTF-8,${truckSvg}" style="display:block;width:22px;height:18px;" />
          </div>
          ${labelHtml}
        </div>
      `;

      return L.divIcon({
        html,
        className: "",
        iconSize: [boxSize, boxSize + (labelText ? 22 : 0)],
        iconAnchor: [Math.round(boxSize / 2), Math.round(boxSize / 2)],
        _label: labelText,
      });
    };

    const upsertTruck = (id, lat, lng, color, isSelected, label) => {
      if (markersMap.has(id)) {
        const m = markersMap.get(id);
        try {
          m.setLatLng([lat, lng]);

          const curIcon = m.options && m.options.icon;
          const labelText = String(label || "");
          if (curIcon && curIcon.options && String(curIcon.options._label || "") !== labelText) {
            const newIcon = makeTruckDivIcon(color, isSelected, labelText);
            m.setIcon(newIcon);
            m.options.icon = newIcon;
          }
          const el = m.getElement && m.getElement();
          if (el) el.style.transition = "transform 0.6s linear";
        } catch (e) {}
      } else {
        const icon = makeTruckDivIcon(color, isSelected, String(label || ""));
        const marker = L.marker([lat, lng], { icon, keyboard: false, title: String(id) });
        marker.addTo(layer);

        const el = marker.getElement && marker.getElement();
        if (el) el.style.transition = "transform 0.6s linear";
        markersMap.set(id, marker);
      }
    };

    const seenIds = new Set();

    const selectedId = vehicle
      ? vehicle.unique_id ?? vehicle.reg_no ?? vehicle.vehicle_number ?? vehicle.id ?? "__selected__"
      : null;
    const selectedLabel = vehicle
      ? vehicle.reg_no ?? vehicle.vehicle_number ?? vehicle.plate ?? vehicle.id ?? ""
      : "";
    if (position) {
      const sid = selectedId || "__selected__";
      upsertTruck(sid, position[0], position[1], "#FDBB24", true, selectedLabel);
      seenIds.add(sid);
    }

    if (!showRoutePath && liveVehicles.length > 0) {
      liveVehicles
        .filter((lv) => {
          if (!bboxParams || !bboxParams.bbox) return true;
          const [south, west, north, east] = bboxParams.bbox.split(",").map(Number);
          return lv.lat >= south && lv.lat <= north && lv.lng >= west && lv.lng <= east;
        })
        .forEach((live) => {
          const color =
            live.status && String(live.status).toLowerCase().includes("idle")
              ? "#f59e0b"
              : live.status && String(live.status).toLowerCase().includes("offline")
              ? "#ef4444"
              : "#10b981";
          upsertTruck(
            live.id,
            live.lat,
            live.lng,
            color,
            position && live.id === (vehicle?.id ?? vehicle?.unique_id),
            live.reg_no ?? live.vehicle_number ?? live.plate ?? live.id
          );
          seenIds.add(live.id);
        });
    } else if (!showRoutePath && liveVehicles.length === 0) {
      ambientVehicles.forEach((amb) => {
        const color = amb.type === "moving" ? "#10b981" : "#8b8b93";
        upsertTruck(amb.id, amb.position[0], amb.position[1], color, false, amb.plate);
        seenIds.add(amb.id);
      });
    }

    Array.from(markersMap.keys()).forEach((id) => {
      if (!seenIds.has(id)) {
        const m = markersMap.get(id);
        try {
          layer.removeLayer(m);
        } catch (e) {}
        markersMap.delete(id);
      }
    });

    markersMapRef.current = markersMap;

    return () => {
      try {
        Array.from((markersMapRef.current || new Map()).values()).forEach((m) => {
          try {
            layer.removeLayer(m);
          } catch (e) {}
        });
        markersMapRef.current = new Map();
      } catch (e) {}
    };
  }, [leafletLoaded, liveVehicles, position, bboxParams, showRoutePath]);

  const handleToggleMaximize = async () => {
    const el = containerRef.current;
    if (!el) return;

    try {
      if (document.fullscreenElement === el) {
        await document.exitFullscreen?.();
      } else if (el.requestFullscreen) {
        await el.requestFullscreen();
      }
    } catch {}
  };

  const handleLocate = () => {
    const map = leafletMapRef.current;
    if (!map) return;
    if (position) {
      map.panTo([position[0], position[1]]);
      map.setZoom(Math.max(map.getZoom(), 14));
    }
  };

  return (
    <div ref={containerRef} className="relative h-full w-full bg-[#0c0c0e]">
      {!leafletLoaded && (
        <div className="h-full w-full flex items-center justify-center bg-[#0b0f19] text-white text-sm">
          Loading map...
        </div>
      )}

      <div
        id="leaflet-map"
        className="h-full w-full z-0"
        style={{ display: leafletLoaded ? "block" : "none" }}
      />

      {showRoutePath ? (
        <>
          <div className="absolute top-2.5 right-2.5 w-[calc(100%-20px)] sm:w-35 bg-[#17171C] border border-[#2A2A2F] rounded-lg p-2.5 shadow-2xl z-[1000] animate-in fade-in duration-300">
            {noActiveTrip ? (
              <p className="text-[9.5px] text-zinc-400 font-medium text-center py-1">
                No active trip available
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-1 border-b border-zinc-800/50 pb-1 mb-1">
                  <div>
                    <p className="text-[7.5px] text-zinc-400 font-bold uppercase tracking-wider">
                      Started
                    </p>
                    <p className="text-[9.5px] text-white font-extrabold mt-0.5">
                      {displayOrDash(startedAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[7.5px] text-zinc-400 font-bold uppercase tracking-wider">
                      ETA
                    </p>
                    <p className="text-[9.5px] text-white font-extrabold mt-0.5">
                      {displayOrDash(eta)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[7.5px] text-zinc-400 font-bold uppercase tracking-wider">
                    Destination
                  </p>
                  <p className="text-[9.5px] text-white font-bold truncate mt-0.5">
                    {displayOrDash(destination)}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="absolute bottom-2.5 left-2.5 w-[calc(100%-20px)] sm:w-[185px] bg-[#17171C] border border-[#2A2A2F] rounded-lg p-2.5 shadow-2xl z-[1000] animate-in fade-in duration-300">
            {noActiveTrip ? (
              <p className="text-[9px] text-zinc-400 font-medium text-center py-1">
                No active trip available
              </p>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-1 border-b border-zinc-800/50 pb-1 mb-1">
                  <div>
                    <p className="text-[7px] text-zinc-400 font-bold uppercase tracking-wider">
                      Trip ID
                    </p>
                    <p className="text-[9px] text-[#FDBB24] font-extrabold mt-0.5">
                      {displayOrDash(tripId)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[7px] text-zinc-400 font-bold uppercase tracking-wider">
                      ETA
                    </p>
                    <p className="text-[9px] text-white font-extrabold mt-0.5">
                      {displayOrDash(eta)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[7px] text-zinc-400 font-bold uppercase tracking-wider">
                      Started
                    </p>
                    <p className="text-[9px] text-white font-extrabold mt-0.5">
                      {displayOrDash(startedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 text-[8.5px]">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Origin</span>
                    <span className="text-white font-bold truncate max-w-[95px]">
                      {displayOrDash(origin)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Dest.</span>
                    <span className="text-white font-bold truncate max-w-[95px]">
                      {displayOrDash(destination)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <span className="absolute top-16 left-[62%] text-[10px] font-bold text-zinc-500/40 uppercase tracking-widest pointer-events-none z-[1000]">
            Delhi
          </span>
          <span className="absolute top-[36%] left-[50%] text-[11px] font-extrabold text-zinc-500/20 uppercase tracking-widest pointer-events-none z-[1000]">
            New Delhi
          </span>
          <span className="absolute top-[52%] left-[12%] text-[8px] font-semibold text-zinc-500/20 uppercase tracking-tight pointer-events-none z-[1000]">
            Dhaula Kuan
          </span>
          <span className="absolute top-[54%] left-[34%] text-[8px] font-semibold text-zinc-500/20 uppercase tracking-tight pointer-events-none z-[1000]">
            Chanakyapuri
          </span>

          {vehicle ? (
            <div className="absolute top-[56%] left-2.5 right-2.5 sm:left-[24%] sm:right-auto z-[1000] flex flex-col items-start pointer-events-auto">
              <div className="w-full sm:w-[160px] bg-[#17171C] border border-[#2A2A2F] rounded-lg p-2.5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-1.5 mb-1.5">
                  <span className="text-[9.5px] font-extrabold text-white tracking-tight">
                    {displayOrDash(vehicle.plate)}
                  </span>
                  <span className="text-[8px] text-[#FDBB24] font-semibold tracking-wide uppercase">
                    {displayOrDash(vehicle.type)}
                  </span>
                </div>
                <div className="flex justify-between text-[8.5px] leading-tight mb-1">
                  <span className="text-zinc-400 font-medium">Speed</span>
                  <span className="font-bold text-white">
                    {displayOrDash(vehicle.speed)}
                  </span>
                </div>
                <div className="flex justify-between text-[8.5px] leading-tight">
                  <span className="text-zinc-400 font-medium">Distance</span>
                  <span className="font-bold text-white">
                    {displayOrDash(
                      getTripField(vehicle, [
                        "distance_km",
                        "distance",
                        "remaining_distance_km",
                      ])
                    )}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}

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
          onClick={handleToggleMaximize}
          aria-label={isMaximized ? "Minimize map" : "Maximize map"}
          className="w-7.5 h-7.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer"
        >
          {isMaximized ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
        </button>
        <button
          type="button"
          onClick={handleLocate}
          aria-label="Locate vehicle"
          className="w-7.5 h-7.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer"
        >
          <LocateFixed size={11} />
        </button>
        <button
          type="button"
          onClick={handleZoomIn}
          aria-label="Zoom in"
          className="w-7.5 h-7.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Plus size={11} />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          aria-label="Zoom out"
          className="w-7.5 h-7.5 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <Minus size={11} />
        </button>
      </div>
    </div>
  );
}