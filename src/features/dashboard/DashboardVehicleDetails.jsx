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
} from "lucide-react";

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

function displayValue(value) {
  if (value == null) return "-";
  if (typeof value === "string" && value.trim() === "") return "-";
  return String(value);
}

/**
 * Status badge label from selected vehicle API data only.
 * Prefer raw GET /v1/vehicles fields over any stale mapped/localStorage values.
 */
function resolveStatusLabel(vehicle) {
  const raw = vehicle?.raw ?? {};
  const inMaintenance = raw.in_maintenance ?? raw.inMaintenance;
  if (inMaintenance === true) return "Maintenance";

  const status = String(raw.status ?? "").toLowerCase().trim();

  if (status === "moving") return "Running";
  if (status === "idle") return "Idle";
  if (status === "offline") return "Offline";

  // Mapped list label (already normalized) when raw.status is absent.
  const mapped = vehicle?.status;
  if (mapped != null && String(mapped).trim() !== "") {
    return String(mapped);
  }

  return "-";
}

/**
 * Build detail rows from the selected Vehicles API object only.
 * Fields not present in the API always render "-".
 */
function getVehicleMetrics(vehicle) {
  return [
    {
      key: "speed",
      label: "Speed",
      value: displayValue(vehicle?.speed),
      icon: Gauge,
    },
    {
      key: "fuel",
      label: "Fuel Level",
      value: "-",
      icon: Fuel,
    },
    {
      key: "battery",
      label: "Battery",
      value: "-",
      icon: Battery,
    },
    {
      key: "engineHealth",
      label: "Engine Health",
      value: "-",
      icon: ShieldCheck,
      valueColor: "text-zinc-200",
    },
    {
      key: "odometer",
      label: "Odometer",
      value: "-",
      icon: Milestone,
    },
    {
      key: "tripProgress",
      label: "Trip Progress",
      value: "-",
      icon: Waypoints,
    },
    {
      key: "eta",
      label: "ETA",
      value: "-",
      icon: Clock,
    },
    {
      key: "vehicleType",
      label: "Vehicle Type",
      value: displayValue(vehicle?.type),
      icon: Milestone,
    },
    {
      key: "model",
      label: "Model",
      value: displayValue(vehicle?.model),
      icon: ShieldCheck,
    },
    {
      key: "fleetGroup",
      label: "Fleet Group",
      value: displayValue(vehicle?.fleetGroup ?? vehicle?.location),
      icon: MapPin,
      valueClassName: "text-right truncate pl-4 max-w-[150px]",
    },
    {
      key: "deviceStatus",
      label: "Connection Status",
      value: displayValue(vehicle?.deviceStatus),
      icon: Radio,
    },
    {
      key: "inMaintenance",
      label: "Maintenance Status",
      value: displayValue(vehicle?.inMaintenance),
      icon: Key,
    },
    {
      key: "uniqueId",
      label: "Unique ID",
      value: displayValue(vehicle?.uniqueId),
      icon: Key,
      valueClassName: "text-right truncate pl-4 max-w-[150px]",
    },
    {
      key: "lat",
      label: "Latitude",
      value: displayValue(vehicle?.latDisplay ?? vehicle?.lat),
      icon: MapPin,
    },
    {
      key: "lng",
      label: "Longitude",
      value: displayValue(vehicle?.lngDisplay ?? vehicle?.lng),
      icon: MapPin,
    },
    {
      key: "lastUpdated",
      label: "Last Updated",
      value: displayValue(vehicle?.lastUpdated ?? vehicle?.info),
      icon: Calendar,
      valueColor: "text-zinc-200",
    },
  ];
}

export default function DashboardVehicleDetails({ vehicle, onViewRoute }) {
  const metrics = getVehicleMetrics(vehicle);
  const statusLabel = resolveStatusLabel(vehicle);
  const badge = STATUS_BADGE[statusLabel] || {
    text: "text-zinc-300",
    bg: "bg-zinc-500/10",
    dot: "bg-zinc-400",
  };

  return (
    <div className="w-full h-full bg-[#16161a] border border-[#1f1f23] rounded-xl p-3.5 flex flex-col justify-between select-none overflow-hidden font-sans text-zinc-100">
      {/* 1. Header */}
      <div className="flex items-center justify-between pb-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-[15px] font-bold text-white tracking-tight">
            Vehicle Details
          </h3>
          <span
            className={`text-[15px] font-bold ${badge.text} ${badge.bg} px-2 py-0.5 rounded-sm flex items-center gap-1.5 shrink-0`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />{" "}
            {statusLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {}}
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <RefreshCw size={15} className="stroke-[2.5]" />
        </button>
      </div>

      {/* 2. Vehicle Summary */}
      <div className="flex items-center justify-between my-2 shrink-0 gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 bg-[#d9d9d9] rounded-md shrink-0" />
          <div className="leading-tight min-w-0">
            <h4 className="text-[15px] font-bold text-white tracking-tight truncate">
              {displayValue(vehicle?.plate)}
            </h4>
            <p className="text-[15px] text-zinc-500 font-medium truncate mt-0.5">
              {displayValue(vehicle?.driver)}
            </p>
          </div>
        </div>
        <div className="text-right leading-tight shrink-0">
          <p className="text-[15px] font-bold text-white">-</p>
          <p className="text-[15px] text-zinc-500 font-medium mt-0.5">
            Remaining Distance
          </p>
        </div>
      </div>

      {/* 3. Trip Progress — no API field; never show fake % */}
      <div className="mb-3 mt-1.5 px-1 shrink-0">
        <div className="relative w-full h-4 flex items-center">
          <div className="absolute left-0 right-0 h-[2.5px] bg-[#2e2e36] rounded-full" />
          <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-[#16161a] border-2 border-[#2e2e36] transform -translate-x-1/2 z-10" />
          <div className="absolute right-0 w-2.5 h-2.5 rounded-full bg-[#16161a] border-2 border-[#2e2e36] transform translate-x-1/2 z-10" />
        </div>
        <p className="text-[15px] font-bold text-[#FDBB24] tracking-wide mt-1.5">
          -
        </p>
      </div>

      <div className="border-b border-dashed border-[#232329] w-full shrink-0 mb-3" />

      {/* 4. Vehicle Information List */}
      <div className="flex flex-col flex-1 py-0.5 text-[15px] gap-y-3 overflow-y-auto pr-0.5 mb-3 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {metrics.map(
          ({
            key,
            label,
            value,
            icon: Icon,
            valueColor = "text-white",
            valueClassName,
          }) => (
            <div
              key={key}
              className="flex items-center justify-between shrink-0 gap-2"
            >
              <div className="flex items-center gap-2 text-zinc-500 font-medium min-w-0">
                <Icon size={15} className="text-zinc-100 shrink-0" />
                <span className="truncate">{label}</span>
              </div>
              <span
                className={`font-bold ${valueColor} ${
                  valueClassName || "shrink-0"
                }`}
              >
                {value}
              </span>
            </div>
          )
        )}
      </div>

      <div className="border-b border-dashed border-[#232329] w-full shrink-0 mb-3" />

      {/* 5. Bottom Action */}
      <div className="shrink-0">
        <button
          type="button"
          onClick={onViewRoute}
          className="w-full h-10 rounded-lg text-[15px] font-bold text-[#ffff] border border-[#FDBB24]/30 bg-transparent hover:bg-[#FDBB24]/5 transition-all text-center flex items-center justify-center tracking-wide cursor-pointer"
        >
          View Route
        </button>
      </div>
    </div>
  );
}
