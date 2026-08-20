import React from "react";
import {
  RefreshCw,
  Gauge,
  Fuel,
  Battery,
  ShieldCheck,
  Milestone,
  Waypoints,
  Clock,
  MapPin,
  Radio,
  Key,
  Calendar,
  MapPin as TrackIcon,
  RotateCcw,
  Share2,
} from "lucide-react";
import {
  displayOrDash,
  getTripField,
  resolveRouteStatusLabel,
  shouldShowNoActiveTrip,
} from "./routeVehicleDisplay";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";

const STATUS_BADGE = {
  Running: {
    text: "text-[#10b981]",
    bg: "bg-[#10b981]/10",
    dot: "bg-[#10b981]",
  },
  Idle: {
    text: "text-[#f59e0b]",
    bg: "bg-[#f59e0b]/10",
    dot: "bg-[#f59e0b]",
  },
  Critical: {
    text: "text-[#f97316]",
    bg: "bg-[#f97316]/10",
    dot: "bg-[#f97316]",
  },
  Maintenance: {
    text: "text-[#f97316]",
    bg: "bg-[#f97316]/10",
    dot: "bg-[#f97316]",
  },
  Offline: {
    text: "text-[#ef4444]",
    bg: "bg-[#ef4444]/10",
    dot: "bg-[#ef4444]",
  },
};

function formatKm(value) {
  if (value == null || value === "" || value === "-") return "Not Available";
  const n = Number(value);
  if (!Number.isFinite(n)) return displayOrDash(value);
  return `${n.toLocaleString("en-US", { maximumFractionDigits: 1 })} km`;
}

function formatPct(value) {
  if (value == null || value === "" || value === "-") return "Not Available";
  const raw = String(value).trim();
  if (raw.endsWith("%")) return raw;
  const n = Number(value);
  if (!Number.isFinite(n)) return "Not Available";
  return `${n}%`;
}

function parsePctWidth(value) {
  if (value == null || value === "") return 0;
  const n = Number(String(value).replace("%", ""));
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

export default function VehicleRouteDetails({ vehicle, onViewRoute, onClose }) {
  const noActiveTrip = shouldShowNoActiveTrip(vehicle);
  const statusLabel = resolveRouteStatusLabel(vehicle);
  const badge = STATUS_BADGE[statusLabel] || {
    text: "text-zinc-300",
    bg: "bg-zinc-500/10",
    dot: "bg-zinc-400",
  };

  const remaining = noActiveTrip
    ? null
    : getTripField(vehicle, [
        "remaining_distance_km",
        "remaining_km",
        "remainingDistanceKm",
        "remainingDistance",
      ]);
  const progress = noActiveTrip
    ? null
    : getTripField(vehicle, [
        "trip_progress_pct",
        "trip_progress",
        "tripProgress",
        "progress_pct",
      ]);
  const eta = noActiveTrip
    ? null
    : getTripField(vehicle, ["eta", "eta_text", "etaText"]);
  const origin = noActiveTrip
    ? null
    : getTripField(vehicle, ["origin", "route_origin", "start_location"]);
  const destination = noActiveTrip
    ? null
    : getTripField(vehicle, [
        "destination",
        "route_destination",
        "end_location",
      ]);
  const fuel = noActiveTrip
    ? null
    : getTripField(vehicle, ["fuel", "fuel_pct", "fuel_level", "fuelLevel"]);
  const battery = noActiveTrip
    ? null
    : getTripField(vehicle, ["battery", "battery_v", "battery_voltage"]);
  const engineHealth = noActiveTrip
    ? null
    : getTripField(vehicle, ["engine_health", "engineHealth"]);
  const odometer = noActiveTrip
    ? null
    : getTripField(vehicle, ["odometer", "odometer_km"]);
  const ignition = noActiveTrip
    ? null
    : getTripField(vehicle, ["ignition", "ignition_status"]);
  const gpsSignal = noActiveTrip
    ? null
    : getTripField(vehicle, ["gps_signal", "gpsSignal", "device_status"]);
  const address = noActiveTrip
    ? null
    : getTripField(vehicle, [
        "current_address",
        "address",
        "location_address",
      ]);

  const progressWidth = parsePctWidth(progress);
  const fuelWidth = parsePctWidth(fuel);
  const showRunningIndicator = !noActiveTrip && statusLabel === "Running";

  return (
    <MainLayoutColor as="div" background="surface" className="w-full h-full border border-[#1f1f23] rounded-xl p-3.5 flex flex-col justify-between select-none overflow-hidden font-sans text-zinc-100">
      
      {/* 1. Top Header Row (Reflects exact layout without X icon) */}
      <div className="flex items-center justify-between pb-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-[13px] font-bold text-white tracking-tight">
            Vehicle Details
          </h3>
          {showRunningIndicator ? (
            <span className="text-[9px] font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-sm flex items-center gap-1 shrink-0">
              <span className="w-1 h-1 rounded-full bg-[#10b981]"></span> Running
            </span>
          ) : (
            <span
              className={`text-[9px] font-bold ${badge.text} ${badge.bg} px-2 py-0.5 rounded-sm flex items-center gap-1 shrink-0`}
            >
              <span className={`w-1 h-1 rounded-full ${badge.dot}`} />{" "}
              {statusLabel}
            </span>
          )}
        </div>
        
        <button 
          type="button"
          onClick={() => {}}
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <RefreshCw size={13} className="stroke-[2.5]" />
        </button>
      </div>

      {/* 2. Profile Core Info Section */}
      <div className="flex items-center justify-between my-2 shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 bg-[#d9d9d9] rounded-md shrink-0" />
          <div className="leading-tight min-w-0">
            <h4 className="text-[12.5px] font-bold text-white tracking-tight truncate">
              {displayOrDash(vehicle?.plate)}
            </h4>
            <p className="text-[10px] text-zinc-500 font-medium truncate mt-0.5">
              {displayOrDash(vehicle?.driver)}
            </p>
          </div>
        </div>
        <div className="text-right leading-tight shrink-0">
          <p className="text-[12.5px] font-bold text-white">
            {formatKm(remaining)}
          </p>
          <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Remaining Distance</p>
        </div>
      </div>

      {/* 3. Timeline Tracker with Labels */}
      <div className="mb-3 mt-1.5 px-1 shrink-0">
        {noActiveTrip ? (
          <p className="text-[10px] text-zinc-500 font-medium text-center py-2">
            No active trip available
          </p>
        ) : (
          <>
            <div className="relative w-full h-3 flex items-center">
              <div className="absolute left-0 right-0 h-[2.5px] bg-[#2e2e36] rounded-full" />
              {progressWidth > 0 ? (
                <div
                  className="absolute left-0 h-[2.5px] bg-[#FDBB24] rounded-full"
                  style={{ width: `${progressWidth}%` }}
                />
              ) : null}

              <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-[#141414] border-2 border-[#FDBB24] transform -translate-x-1/2 z-10" />
              {progressWidth > 0 ? (
                <div
                  className="absolute text-[11px] transform -translate-x-1/2 z-20 select-none pb-0.5 pointer-events-none"
                  style={{ left: `${progressWidth}%` }}
                >
                  🚚
                </div>
              ) : null}
              <div className="absolute right-0 w-2.5 h-2.5 rounded-full bg-[#141414] border-2 border-[#2e2e36] transform translate-x-1/2 z-10" />
            </div>

            <div className="flex items-center justify-between mt-1 text-[9px] text-zinc-400 font-medium">
              <span>{displayOrDash(origin)}</span>
              <span>{displayOrDash(destination)}</span>
            </div>
          </>
        )}
      </div>

      <div className="border-b border-dashed border-[#232329] w-full shrink-0 mb-3" />

      {/* 4. Specifications Metric Stack */}
      <div className="flex flex-col flex-1 py-0.5 text-[10.5px] gap-y-3 overflow-y-auto pr-0.5 mb-3 scrollbar-none">
        
        {/* Speed */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Gauge size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Speed</span>
          </div>
          <span className="font-bold text-white shrink-0">
            {displayOrDash(vehicle?.speed)}
          </span>
        </div>

        {/* Fuel Level */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Fuel size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Fuel Level</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-white">{formatPct(fuel)}</span>
            <div className="w-12 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#22c55e] rounded-full"
                style={{ width: `${fuelWidth}%` }}
              />
            </div>
          </div>
        </div>

        {/* Battery */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Battery size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Battery</span>
          </div>
          <span className="font-bold text-white shrink-0">
            {displayOrDash(battery)}
          </span>
        </div>

        {/* Engine Health */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <ShieldCheck size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Engine Health</span>
          </div>
          <span className="font-bold text-zinc-200 shrink-0">
            {displayOrDash(engineHealth)}
          </span>
        </div>

        {/* Odometer */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Milestone size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Odometer</span>
          </div>
          <span className="font-bold text-white shrink-0">
            {odometer == null ? "Not Available" : formatKm(odometer)}
          </span>
        </div>

        {/* Trip Process */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Waypoints size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Trip Process</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-white">{formatPct(progress)}</span>
            <div className="w-12 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FDBB24] rounded-full"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>
        </div>

        {/* ETA */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Clock size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">ETA</span>
          </div>
          <span className="font-bold text-white shrink-0">
            {displayOrDash(eta)}
          </span>
        </div>

        {/* Current Address */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <MapPin size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Current Address</span>
          </div>
          <span className="font-bold text-white text-right truncate pl-4 max-w-[150px]">
            {displayOrDash(address)}
          </span>
        </div>

        {/* GPS Signal */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Radio size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Gps Signal</span>
          </div>
          <span className="font-bold text-white shrink-0">
            {displayOrDash(gpsSignal ?? vehicle?.deviceStatus)}
          </span>
        </div>

        {/* Ignition */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Key size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Ignition</span>
          </div>
          <span
            className={`font-bold shrink-0 ${
              String(ignition).toUpperCase() === "ON"
                ? "text-[#10b981]"
                : "text-white"
            }`}
          >
            {displayOrDash(ignition)}
          </span>
        </div>

        {/* Last Updated */}
        <div className="flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
            <Calendar size={12.5} className="text-zinc-500 shrink-0" /> <span className="truncate">Last Updated</span>
          </div>
          <span className="font-bold text-zinc-200 shrink-0">
            {displayOrDash(vehicle?.lastUpdated ?? vehicle?.info)}
          </span>
        </div>

      </div>

      <div className="border-b border-dashed border-[#232329] w-full shrink-0 mb-3" />

      {/* 5. Image Style Action Footer Buttons (3 Columns Layout) */}
      <div className="grid grid-cols-3 gap-2 shrink-0">
        
        {/* Track Live Card */}
        <button 
          type="button"
          onClick={onViewRoute}
          className="flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#232329] bg-transparent hover:bg-zinc-800/40 transition-colors text-center text-zinc-400 hover:text-white cursor-pointer"
        >
          <TrackIcon size={14} className="text-zinc-400" />
          <span className="text-[9.5px] font-semibold tracking-wide">Track Live</span>
        </button>

        {/* Replay Card */}
        <button 
          type="button"
          onClick={() => {}}
          className="flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#232329] bg-transparent hover:bg-zinc-800/40 transition-colors text-center text-zinc-400 hover:text-white cursor-pointer"
        >
          <div className="flex items-center justify-center rotate-180 scale-x-[-1]">
            <RotateCcw size={14} className="text-zinc-400" />
          </div>
          <span className="text-[9.5px] font-semibold tracking-wide">Replay</span>
        </button>

        {/* Share Card */}
        <button 
          type="button"
          onClick={() => {}}
          className="flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#232329] bg-transparent hover:bg-zinc-800/40 transition-colors text-center text-zinc-400 hover:text-white cursor-pointer"
        >
          <Share2 size={14} className="text-zinc-400" />
          <span className="text-[9.5px] font-semibold tracking-wide">Share</span>
        </button>
      </div>

    </MainLayoutColor>
  );
}
