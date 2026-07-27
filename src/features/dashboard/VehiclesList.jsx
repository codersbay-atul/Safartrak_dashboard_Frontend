import React, { useState, useEffect, useMemo } from "react";
import { useVehiclesList } from "../../hooks/useVehiclesList";

const FILTER_DEFS = [
  { label: "All", color: "bg-[#71717a]" },
  { label: "Moving", color: "bg-[#10b981]" },
  { label: "Idle", color: "bg-[#f59e0b]" },
  { label: "Critical", color: "bg-[#f97316]" },
  { label: "Offline", color: "bg-[#ef4444]" },
];

const statusDotClass = {
  Running: "bg-[#10b981]",
  Idle: "bg-[#f59e0b]",
  Critical: "bg-[#f97316]",
  Offline: "bg-[#ef4444]",
};

function matchesVehicleFilter(vehicle, filterLabel) {
  if (filterLabel === "All") return true;

  const raw = vehicle?.raw ?? {};
  const status = String(raw.status ?? "").toLowerCase();
  const deviceStatus = String(
    raw.device_status ?? raw.deviceStatus ?? ""
  ).toLowerCase();
  const speed = Number(raw.speed_kmh ?? raw.speedKmh ?? 0);
  const inMaintenance = raw.in_maintenance ?? raw.inMaintenance;

  switch (filterLabel) {
    case "Moving":
      return status === "moving" || (!Number.isNaN(speed) && speed > 0);
    case "Idle":
      return status === "idle";
    case "Offline":
      return status === "offline" || deviceStatus === "disconnected";
    case "Critical":
      return inMaintenance === true;
    default:
      return true;
  }
}

export default function VehiclesList({
  onSelectVehicle,
  selectedVehicle,
  search = "",
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(
    () => selectedVehicle?.id ?? null
  );

  const { vehicles, filterCounts } = useVehiclesList({
    search,
    page: 1,
    pageSize: 25,
  });

  const filteredVehicles = useMemo(
    () =>
      vehicles.filter((vehicle) => matchesVehicleFilter(vehicle, activeFilter)),
    [vehicles, activeFilter]
  );

  const filters = FILTER_DEFS.map((filter) => ({
    ...filter,
    count: filterCounts?.[filter.label] ?? null,
  }));

  useEffect(() => {
    if (selectedVehicle?.id != null) {
      setSelectedId(selectedVehicle.id);
    }
  }, [selectedVehicle?.id]);

  const handleSelectVehicle = (vehicle) => {
    setSelectedId(vehicle.id);
    if (onSelectVehicle) onSelectVehicle(vehicle);
  };

  useEffect(() => {
    if (selectedVehicle) return;
    if (vehicles.length === 0) return;
    handleSelectVehicle(vehicles[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- auto-select first row once data arrives
  }, [vehicles, selectedVehicle]);

  return (
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-xl p-3.5 flex flex-col select-none overflow-hidden">
      {/* Title */}
      <h3 className="text-[13px] font-bold text-white tracking-tight mb-2.5 shrink-0">
        Vehicle List
      </h3>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2.5 shrink-0 no-scrollbar flex-nowrap">
        {filters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-200 shrink-0 cursor-pointer
              ${
                activeFilter === filter.label
                  ? "bg-[#27272a] border border-[#3f3f46] text-white"
                  : "bg-[#18181b] border border-transparent text-[#a1a1aa] hover:text-[#d4d4d8]"
              }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${filter.color}`}
            />
            {filter.label} {filter.count !== null && `(${filter.count})`}
          </button>
        ))}
      </div>

      {/* Vehicle Rows - Smooth layout redistribution */}
      <div className="flex flex-col gap-2.5 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {filteredVehicles.map((vehicle) => {
          const isSelected = selectedId === vehicle.id;

          return (
            <div
              key={vehicle.id}
              onClick={() => handleSelectVehicle(vehicle)}
              className={`flex items-center justify-between py-2.5 px-3.5 rounded-lg border transition-all duration-200 w-full gap-3 shrink-0
                ${
                  isSelected
                    ? "bg-[#18181b] border-[#FDBB24]/70"
                    : "bg-[#161618] border-[#1f1f23] hover:border-[#27272a]"
                }`}
            >
              {/* Left Side Info */}
              <div className="min-w-0 flex-1 flex flex-col justify-center gap-1">
                <div className="flex items-center gap-1.5 leading-none min-w-0">
                  <span className="text-[12px] font-bold text-white tracking-tight shrink-0">
                    {vehicle.plate}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      statusDotClass[vehicle.status] || "bg-zinc-500"
                    }`}
                  />
                  <span
                    className={`text-[11px] font-semibold ${vehicle.statusColor} truncate`}
                  >
                    {vehicle.status}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-[#71717a] truncate max-w-[160px]">
                  <span className="truncate">{vehicle.driver}</span>
                  <span className="shrink-0 text-[#52525b]">•</span>
                  <span className="truncate">{vehicle.info}</span>
                </div>
              </div>

              {/* Right Side Info */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right leading-tight">
                  <p className="text-[12px] font-bold text-white">
                    {vehicle.speed}
                  </p>
                  <p className="text-[10px] text-[#71717a] mt-0.5 max-w-[60px] truncate">
                    {vehicle.location}
                  </p>
                </div>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSelectVehicle(vehicle);
                  }}
                  className={`h-7 px-2.5 rounded-md text-[10px] font-semibold transition-all shrink-0 cursor-pointer flex items-center justify-center whitespace-nowrap
                    ${
                      isSelected
                        ? "text-[#ffff] border border-[#FDBB24]"
                        : "text-[#ffff] border border-[#FDBB24]/40 bg-transparent hover:bg-[#ffff]/10"
                    }`}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
