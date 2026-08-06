import React, { useState, useEffect, useMemo } from "react";
import { useVehiclesList } from "../../hooks/useVehiclesList";

const FILTER_DEFS = [
  { label: "All", color: "bg-[#8e8e93]" },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicles, selectedVehicle]);

  return (
    <div className="w-full h-full bg-[#16171a] border border-[#232428] rounded-xl py-4 flex flex-col select-none overflow-hidden text-white">
      {/* Title with Padding */}
      <h3 className="text-[14px] font-bold text-white tracking-tight mb-3 px-4 shrink-0">
        Vehicle List
      </h3>

      {/* Filter Pills with Padding */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 px-4 shrink-0 no-scrollbar flex-nowrap">
        {filters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
              activeFilter === filter.label
                ? "bg-[#292a30] text-white"
                : "bg-[#0d0e10] text-[#8e8e93] hover:text-white"
            }`}
          >
            <span className={`w-2 h-2 rounded-[2px] shrink-0 ${filter.color}`} />
            <span>{filter.label}</span>
            {filter.count !== null && (
              <span className="text-[#8e8e93]">({filter.count})</span>
            )}
          </button>
        ))}
      </div>

      {/* Vehicle Rows - Full 100% Width Highlight */}
      <div className="flex flex-col overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {filteredVehicles.map((vehicle) => {
          const isSelected = selectedId === vehicle.id;
          const plateDisplay = vehicle.plate || vehicle.registrationNumber || "N/A";

          return (
            <div
              key={vehicle.id}
              onClick={() => handleSelectVehicle(vehicle)}
              className={`flex items-center justify-between py-3 px-4 w-full transition-colors duration-150 gap-3 cursor-pointer ${
                isSelected
                  ? "bg-[#07080a]"
                  : "bg-transparent hover:bg-[#1f2025]"
              }`}
            >
              {/* Left Side Info */}
              <div className="min-w-0 flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-2 leading-none min-w-0">
                  <span className="text-[13px] font-bold text-white tracking-tight shrink-0">
                    {plateDisplay}
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

                <div className="flex items-center gap-1.5 text-[11px] text-[#8e8e93] truncate">
                  <span className="truncate">{vehicle.driver || "-"}</span>
                  <span className="shrink-0 text-[#52525b]">•</span>
                  <span className="truncate">{vehicle.info}</span>
                </div>
              </div>

              {/* Right Side Info */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right leading-tight">
                  <p className="text-[13px] font-bold text-white">
                    {vehicle.speed}
                  </p>
                  <p className="text-[10px] text-[#8e8e93] mt-0.5 truncate text-right">
                    {vehicle.location || "-"}
                  </p>
                </div>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSelectVehicle(vehicle);
                  }}
                  className="h-7 px-3 rounded-md text-[11px] font-semibold transition-colors shrink-0 cursor-pointer flex items-center justify-center whitespace-nowrap text-[#eab308] border border-[#eab308]/70 bg-transparent hover:bg-[#eab308]/10"
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