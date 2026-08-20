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
      {/* Title */}
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

      {/* Vehicle List Items */}
      <div className="flex flex-col overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {filteredVehicles.map((vehicle) => {
          const isSelected = selectedId === vehicle.id;

          const plateDisplay = formatDisplayValue(
            vehicle.plate || vehicle.registrationNumber
          );
          const driverDisplay = formatDisplayValue(vehicle.driver);
          const speedDisplay = formatDisplayValue(vehicle.speed);
          const locationDisplay = formatVehicleLocation(vehicle, "Not Available");

          return (
            <div
              key={vehicle.id}
              onClick={() => handleSelectVehicle(vehicle)}
              className={`flex items-center justify-between py-2.5 xl:py-3 px-3 xl:px-4 w-full transition-colors duration-150 gap-2 xl:gap-3 cursor-pointer min-w-0 ${
                isSelected
                  ? "bg-[#07080a]"
                  : "bg-transparent hover:bg-[#1f2025]"
              }`}
            >
              {/* Left Side: Plate, Status, Driver, Info */}
              <div className="min-w-0 flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-2 leading-none min-w-0">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="vehiclePlate"
                    size="plateText"
                    className="tracking-tight shrink-0"
                  >
                    {plateDisplay}
                  </MainLayoutColor>

                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      statusDotClass[vehicle.status] || "bg-zinc-500"
                    }`}
                  />

                  <MainLayoutTextSize
                    size="subInfoText"
                    className={`font-semibold ${vehicle.statusColor || "text-zinc-400"} truncate`}
                  >
                    {vehicle.status}
                  </MainLayoutTextSize>
                </div>

                <div className="flex items-center gap-1.5 truncate">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="vehicleSubtext"
                    size="subInfoText"
                    className="truncate font-normal"
                  >
                    {driverDisplay}
                  </MainLayoutColor>

                  <MainLayoutColor
                    color="separator"
                    size="subInfoText"
                    className="shrink-0"
                  >
                    •
                  </MainLayoutColor>

                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="vehicleSubtext"
                    size="subInfoText"
                    className="truncate font-normal"
                  >
                    {vehicle.info || "—"}
                  </MainLayoutColor>
                </div>
              </div>

              {/* Right Side: Speed, Location & Reusable Button */}
              <div className="flex items-center gap-2 xl:gap-3 shrink-0">
                <div className="text-right leading-tight min-w-0 max-w-[72px] xl:max-w-none">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="vehicleSpeed"
                    size="speedText"
                    className="block"
                  >
                    {speedDisplay}
                  </MainLayoutColor>

                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="vehicleLocation"
                    size="locationText"
                    className="mt-0.5 truncate block text-right font-normal"
                  >
                    {locationDisplay}
                  </MainLayoutColor>
                </div>

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
          );
        })}
      </div>
    </MainLayoutColor>
  );
}