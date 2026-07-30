import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Layers, LocateFixed, Maximize2, Plus, Minus } from "lucide-react";
import {
  displayOrDash,
  getTripField,
  shouldShowNoActiveTrip,
} from "../route-details/routeVehicleDisplay";


const activeTruckIcon = L.divIcon({
  className: "custom-leaflet-marker",
  html: `
    <div class="relative flex items-center justify-center" style="width: 48px; height: 48px;">
      <div class="absolute w-12 h-12 rounded-full bg-[#FDBB24]/10 animate-ping" style="animation-duration: 2.5s;"></div>
      <div class="absolute w-10 h-10 rounded-full bg-[#FDBB24]/15 animate-pulse"></div>
      <div class="relative w-9 h-9 bg-[#111115] border-2 border-[#FDBB24] rounded-lg flex items-center justify-center shadow-[0_4px_16px_rgba(253,187,36,0.6)]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FDBB24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="w-5.5 h-5.5">
          <path d="M14 17H3a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 3 5h11v12z" fill="#FDBB24" fill-opacity="0.12" />
          <path d="M14 8.5h3.5l3.5 3.5v5H14v-8.5z" fill="#FDBB24" fill-opacity="0.2" />
          <path d="M17.5 8.5v3.5h3z" />
          <circle cx="5" cy="17.5" r="1.8" fill="#111115" stroke="#FDBB24" stroke-width="2" />
          <circle cx="9.5" cy="17.5" r="1.8" fill="#111115" stroke="#FDBB24" stroke-width="2" />
          <circle cx="16.5" cy="17.5" r="1.8" fill="#111115" stroke="#FDBB24" stroke-width="2" />
        </svg>
      </div>
    </div>
  `,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

const ambientMovingIcon = L.divIcon({
  className: "custom-leaflet-marker",
  html: `
    <div class="relative flex items-center justify-center" style="width: 40px; height: 40px;">
      <div class="absolute w-9 h-9 rounded-full bg-[#10b981]/10 animate-pulse"></div>
      <div class="relative w-7.5 h-7.5 bg-[#111115] border border-[#10b981] rounded-md flex items-center justify-center shadow-[0_2px_10px_rgba(16,185,129,0.4)]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" class="w-4.5 h-4.5">
          <path d="M14 17H3a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 3 5h11v12z" fill="#10b981" fill-opacity="0.08" />
          <path d="M14 8.5h3.5l3.5 3.5v5H14v-8.5z" />
          <circle cx="5" cy="17.5" r="1.5" fill="#111115" stroke="#10b981" stroke-width="1.8" />
          <circle cx="16.5" cy="17.5" r="1.5" fill="#111115" stroke="#10b981" stroke-width="1.8" />
        </svg>
      </div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

const ambientIdleIcon = L.divIcon({
  className: "custom-leaflet-marker",
  html: `
    <div class="relative flex items-center justify-center" style="width: 40px; height: 40px;">
      <div class="relative w-7.5 h-7.5 bg-[#111115] border border-zinc-600 rounded-md flex items-center justify-center shadow-lg opacity-75">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8b8b93" stroke-width="2" class="w-4.5 h-4.5">
          <path d="M14 17H3a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 3 5h11v12z" />
          <path d="M14 8.5h3.5l3.5 3.5v5H14v-8.5z" />
          <circle cx="5" cy="17.5" r="1.5" fill="#111115" stroke="#8b8b93" stroke-width="1.8" />
          <circle cx="16.5" cy="17.5" r="1.5" fill="#111115" stroke="#8b8b93" stroke-width="1.8" />
        </svg>
      </div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

const FALLBACK_CENTER = [20.5937, 78.9629];

const ambientVehicles = [
  { id: "amb-1", position: [28.6250, 77.2210], plate: "MH09-1120", type: "moving" },
  { id: "amb-2", position: [28.6050, 77.1890], plate: "MH12-9021", type: "idle" },
  { id: "amb-3", position: [28.5910, 77.2310], plate: "DL03-4581", type: "moving" },
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
  const vehicle = selectedVehicle ?? null;
  const position = resolvePosition(vehicle);
  const mapCenter =
    position ?? (showRoutePath ? FALLBACK_CENTER : [28.6139, 77.209]);
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

  return (
    <div className="relative h-full w-full bg-[#0c0c0e]">
      
      {/* 1. LEAFLET MAP CONTAINER */}
      <MapContainer
        center={mapCenter}
        zoom={showRoutePath ? 13 : 12}
        zoomControl={false}
        className="h-full w-full z-0"
        style={{ background: "#0B0F19" }}
      >
        <TileLayer 
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap'
        />
        
        {position ? (
          <Marker position={position} icon={activeTruckIcon} />
        ) : null}

        {/* Ambient markers only on dashboard (non-route) view */}
        {!showRoutePath
          ? ambientVehicles.map((amb) => (
              <Marker
                key={amb.id}
                position={amb.position}
                icon={
                  amb.type === "moving" ? ambientMovingIcon : ambientIdleIcon
                }
              />
            ))
          : null}
      </MapContainer>

     
      {showRoutePath ? (
        <>
          {/* Top Right Mini HUD */}
          <div className="absolute top-2.5 right-2.5 w-[calc(100%-20px)] sm:w-35 bg-[#17171C] border border-[#2A2A2F] rounded-lg p-2.5 shadow-2xl z-[1000] animate-in fade-in duration-300">
            {noActiveTrip ? (
              <p className="text-[9.5px] text-zinc-400 font-medium text-center py-1">
                No active trip available
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-1 border-b border-zinc-800/50 pb-1 mb-1">
                  <div>
                    <p className="text-[7.5px] text-zinc-400 font-bold uppercase tracking-wider">Started</p>
                    <p className="text-[9.5px] text-white font-extrabold mt-0.5">
                      {displayOrDash(startedAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[7.5px] text-zinc-400 font-bold uppercase tracking-wider">ETA</p>
                    <p className="text-[9.5px] text-white font-extrabold mt-0.5">
                      {displayOrDash(eta)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[7.5px] text-zinc-400 font-bold uppercase tracking-wider">Destination</p>
                  <p className="text-[9.5px] text-white font-bold truncate mt-0.5">
                    {displayOrDash(destination)}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Bottom Left Main HUD */}
          <div className="absolute bottom-2.5 left-2.5 w-[calc(100%-20px)] sm:w-[185px] bg-[#17171C] border border-[#2A2A2F] rounded-lg p-2.5 shadow-2xl z-[1000] animate-in fade-in duration-300">
            {noActiveTrip ? (
              <p className="text-[9px] text-zinc-400 font-medium text-center py-1">
                No active trip available
              </p>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-1 border-b border-zinc-800/50 pb-1 mb-1">
                  <div>
                    <p className="text-[7px] text-zinc-400 font-bold uppercase tracking-wider">Trip ID</p>
                    <p className="text-[9px] text-[#FDBB24] font-extrabold mt-0.5">
                      {displayOrDash(tripId)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[7px] text-zinc-400 font-bold uppercase tracking-wider">ETA</p>
                    <p className="text-[9px] text-white font-extrabold mt-0.5">
                      {displayOrDash(eta)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[7px] text-zinc-400 font-bold uppercase tracking-wider">Started</p>
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
          {/* Ambient Map City Labels (Kept completely safe for Page 1) */}
          <span className="absolute top-16 left-[62%] text-[10px] font-bold text-zinc-500/40 uppercase tracking-widest pointer-events-none z-[1000]">Delhi</span>
          <span className="absolute top-[36%] left-[50%] text-[11px] font-extrabold text-zinc-500/20 uppercase tracking-widest pointer-events-none z-[1000]">New Delhi</span>
          <span className="absolute top-[52%] left-[12%] text-[8px] font-semibold text-zinc-500/20 uppercase tracking-tight pointer-events-none z-[1000]">Dhaula Kuan</span>
          <span className="absolute top-[54%] left-[34%] text-[8px] font-semibold text-zinc-500/20 uppercase tracking-tight pointer-events-none z-[1000]">Chanakyapuri</span>

          {/* HUD Status tags floating cleanly */}
          <div className="absolute top-[15%] left-[54%] z-[1000] pointer-events-none bg-[#111115]/95 px-2 py-0.5 rounded border border-[#10b981]/30">
            <span className="text-[7.5px] font-bold text-[#10b981] tracking-wider">MH09-1120</span>
          </div>
          <div className="absolute top-[34%] right-[22%] z-[1000] pointer-events-none bg-[#111115]/95 px-2 py-0.5 rounded border border-zinc-700/40">
            <span className="text-[7.5px] font-bold text-zinc-400 tracking-wider">MH12-9021</span>
          </div>
          <div className="absolute bottom-[24%] left-[23%] z-[1000] pointer-events-none bg-[#111115]/95 px-2 py-0.5 rounded border border-[#10b981]/30">
            <span className="text-[7.5px] font-bold text-[#10b981] tracking-wider">DL03-4581</span>
          </div>

          {/* Active Tooltip Map Bubble — selected vehicle only */}
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

      {/* 4. CONTROLLER BUTTONS UTILITY SYSTEM */}
      <div className="absolute right-2.5 top-2.5 z-[1000]">
        <button className="w-7.5 h-7.5 rounded-lg bg-[#17171C] border border-[#2A2A2F] text-zinc-400 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer">
          <Layers size={12} />
        </button>
      </div>

      <div className="absolute right-2.5 bottom-2.5 z-[1000] flex flex-col bg-[#17171C] border border-[#2A2A2F] rounded-lg shadow-xl overflow-hidden">
        <button className="w-7.5 h-7.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer"><Maximize2 size={11} /></button>
        <button className="w-7.5 h-7.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer"><LocateFixed size={11} /></button>
        <button className="w-7.5 h-7.5 text-zinc-400 hover:text-white border-b border-[#2A2A2F]/60 flex items-center justify-center transition-colors cursor-pointer"><Plus size={11} /></button>
        <button className="w-7.5 h-7.5 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"><Minus size={11} /></button>
      </div>

    </div>
  );
}
