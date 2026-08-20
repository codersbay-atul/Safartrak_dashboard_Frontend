import React, { useState, useEffect, useMemo } from "react";
import { useVehiclesList } from "../../hooks/useVehiclesList";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize, {
  formatDisplayValue,
  formatVehicleLocation,
} from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutButton from "../../components/Ui/MainLayoutUI/MainLayoutButton";

const FILTER_DEFS = [
  { label: "All", dotBg: "filterDotAll" },
  { label: "Moving", dotBg: "filterDotMoving" },
  { label: "Idle", dotBg: "filterDotIdle" },
  { label: "Critical", dotBg: "filterDotCritical" },
  { label: "Offline", dotBg: "filterDotOffline" },
];

const STATUS_BADGE_CONFIG = {
  Running: {
    dot: "bg-[#10b981]",
    badge: "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/25",
  },
  Idle: {
    dot: "bg-[#f59e0b]",
    badge: "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/25",
  },
  Critical: {
    dot: "bg-[#f97316]",
    badge: "bg-[#f97316]/10 text-[#f97316] border-[#f97316]/25",
  },
  Offline: {
    dot: "bg-[#ef4444]",
    badge: "bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/25",
  },
};

const DEFAULT_STATUS_BADGE = {
  dot: "bg-zinc-500",
  badge: "bg-zinc-800/60 text-zinc-400 border-zinc-700/50",
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

function getVehicleSortPriority(vehicle) {
  const rawStatus = String(vehicle?.raw?.status ?? vehicle?.status ?? "").toLowerCase();
  const speed = Number(vehicle?.raw?.speed_kmh ?? vehicle?.raw?.speedKmh ?? vehicle?.speed ?? 0);
  const isRunning = rawStatus === "moving" || rawStatus === "running" || speed > 0;
  return isRunning ? 0 : 1;
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
      vehicles
        .filter((vehicle) => matchesVehicleFilter(vehicle, activeFilter))
        .slice()
        .sort((a, b) => getVehicleSortPriority(a) - getVehicleSortPriority(b)),
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
  }, [vehicles, selectedVehicle]);

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-full border border-[#232428] rounded-xl py-3 xl:py-4 flex flex-col select-none overflow-hidden text-white min-w-0"
    >
      {/* Header */}
      <div className="mb-2.5 xl:mb-3 px-3 xl:px-4 shrink-0">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="block tracking-tight"
        >
          Vehicle List
        </MainLayoutColor>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 xl:gap-2 overflow-x-auto pb-2 mb-2 px-3 xl:px-4 shrink-0 no-scrollbar flex-nowrap">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.label;
          return (
            <MainLayoutColor
              key={filter.label}
              as="button"
              background={isActive ? "filterActiveBg" : "filterInactiveBg"}
              color={isActive ? "filterTextActive" : "filterTextInactive"}
              onClick={() => setActiveFilter(filter.label)}
              className="flex items-center gap-2 px-3 py-1 rounded-full transition-colors shrink-0 cursor-pointer hover:text-white"
            >
              <MainLayoutColor
                as="span"
                background={filter.dotBg}
                className="w-2 h-2 rounded-[2px] shrink-0"
              />
              <MainLayoutTextSize size="filterText">
                {filter.label}
              </MainLayoutTextSize>
              {filter.count !== null && (
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="filterCount"
                  size="filterText"
                >
                  ({filter.count})
                </MainLayoutColor>
              )}
            </MainLayoutColor>
          );
        })}
      </div>

      {/* Vehicle List Items with Clean Fixed Sections */}
      <div className="flex flex-col overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent divide-y divide-[#232428]/40">
        {filteredVehicles.map((vehicle) => {
          const isSelected = selectedId === vehicle.id;

          const plateDisplay = formatDisplayValue(
            vehicle.plate || vehicle.registrationNumber
          );
          const driverDisplay = formatDisplayValue(vehicle.driver);
          const speedDisplay = formatDisplayValue(vehicle.speed);
          const locationDisplay = formatVehicleLocation(vehicle, "");

          const statusConfig =
            STATUS_BADGE_CONFIG[vehicle.status] || DEFAULT_STATUS_BADGE;

          return (
            <div
              key={vehicle.id}
              onClick={() => handleSelectVehicle(vehicle)}
              className={`flex items-center justify-between py-2.5 xl:py-3 px-3 xl:px-4 w-full transition-colors duration-150 gap-2 cursor-pointer min-w-0 ${
                isSelected
                  ? "bg-[#07080a]"
                  : "bg-transparent hover:bg-[#1f2025]"
              }`}
            >
              {/* Left Section: Vehicle Plate & Driver / Info */}
              <div className="min-w-0 flex-1 flex flex-col gap-1 overflow-hidden pr-1">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="vehiclePlate"
                  size="plateText"
                  className="tracking-tight truncate block"
                >
                  {plateDisplay}
                </MainLayoutColor>

                <div className="flex items-center gap-1.5 text-zinc-400 min-w-0 text-[11px] xl:text-[12px] leading-tight">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="vehicleSubtext"
                    size="subInfoText"
                    className="truncate font-normal shrink-0 max-w-[85px]"
                  >
                    {driverDisplay}
                  </MainLayoutColor>

                  <span className="shrink-0 text-[#52525b]">•</span>

                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="vehicleSubtext"
                    size="subInfoText"
                    className="truncate font-normal min-w-0 flex-1"
                  >
                    {vehicle.info || "—"}
                  </MainLayoutColor>
                </div>
              </div>

              <div className="flex items-center gap-2 xl:gap-2.5 shrink-0 ml-auto">
                <div className="w-[62px] xl:w-[68px] flex items-center justify-center shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[9px] xl:text-[12px] font-semibold leading-none shrink-0 ${statusConfig.badge}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusConfig.dot}`}
                    />
                    <span className="truncate">{vehicle.status || "Unknown"}</span>
                  </span>
                </div>

                <div className="text-right leading-tight w-[48px] xl:w-[54px] shrink-0 flex flex-col items-end justify-center">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="vehicleSpeed"
                    size="speedText"
                    className="block font-bold tracking-tight whitespace-nowrap text-right"
                  >
                    {speedDisplay}
                  </MainLayoutColor>

                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="vehicleLocation"
                    size="locationText"
                    className="mt-0.5 truncate block text-right font-normal text-zinc-400 max-w-full"
                  >
                    {locationDisplay}
                  </MainLayoutColor>
                </div>

                {/* 3. Button */}
                <div className="shrink-0">
                  <MainLayoutButton
                    variant="outlineYellow"
                    size="xs"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleSelectVehicle(vehicle);
                    }}
                  >
                    View Details
                  </MainLayoutButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </MainLayoutColor>
  );
}