import React, { useState, useEffect, useMemo } from "react";
import { useVehiclesList } from "../../hooks/useVehiclesList";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize, {
  formatDisplayValue,
  formatVehicleLocation,
  formatLastSeen,
} from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutButton from "../../components/Ui/MainLayoutUI/MainLayoutButton";
import MainStatusBadge from "../../components/Ui/MainLayoutUI/MainStatusBadge";

const FILTER_DEFS = [
  { label: "All", dotBg: "filterDotAll" },
  { label: "Moving", dotBg: "filterDotMoving" },
  { label: "Idle", dotBg: "filterDotIdle" },
  { label: "Critical", dotBg: "filterDotCritical" },
  { label: "Offline", dotBg: "filterDotOffline" },
];

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
  const rawStatus = String(
    vehicle?.raw?.status ?? vehicle?.status ?? ""
  ).toLowerCase();
  const speed = Number(
    vehicle?.raw?.speed_kmh ?? vehicle?.raw?.speedKmh ?? vehicle?.speed ?? 0
  );
  const isRunning =
    rawStatus === "moving" || rawStatus === "running" || speed > 0;
  return isRunning ? 0 : 1;
}

export default function VehiclesList({
  onSelectVehicle,
  onViewDetails,
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
    setSelectedId(selectedVehicle?.id ?? null);
  }, [selectedVehicle?.id]);

  const handleSelectVehicle = (vehicle) => {
    setSelectedId(vehicle.id);
    if (onSelectVehicle) onSelectVehicle(vehicle);
  };

  const handleViewDetailsClick = (e, vehicle) => {
    e.stopPropagation();
    handleSelectVehicle(vehicle);
    if (onViewDetails) {
      onViewDetails(vehicle);
    }
  };

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-full border border-[#232428] rounded-xl py-3.5 flex flex-col select-none overflow-hidden text-white min-w-0"
    >
      {/* Header */}
      <div className="mb-2.5 px-4 shrink-0">
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
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-1 px-4 shrink-0 no-scrollbar flex-nowrap">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.label;
          return (
            <MainLayoutColor
              key={filter.label}
              as="button"
              background={isActive ? "filterActiveBg" : "filterInactiveBg"}
              color={isActive ? "filterTextActive" : "filterTextInactive"}
              onClick={() => setActiveFilter(filter.label)}
              className="flex items-center gap-2 px-3 py-1 rounded-full transition-colors shrink-0 cursor-pointer hover:text-white text-[11px]"
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
      <div className="flex flex-col overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent divide-y divide-[#232428]/40">
        {filteredVehicles.map((vehicle) => {
          const isSelected = selectedId === vehicle.id;

          const plateDisplay = formatDisplayValue(
            vehicle.plate || vehicle.registrationNumber
          );
          const driverDisplay = formatDisplayValue(vehicle.driver);
          const speedDisplay = formatDisplayValue(vehicle.speed);
          const locationDisplay = formatVehicleLocation(vehicle, "");
          const lastSeenDisplay = formatLastSeen(vehicle, "—");

          return (
            <div
              key={vehicle.id}
              onClick={() => handleSelectVehicle(vehicle)}
              className={`flex items-center justify-between py-2.5 px-4 w-full transition-colors duration-150 gap-3 cursor-pointer min-w-0 ${
                isSelected
                  ? "bg-[#07080a]"
                  : "bg-transparent hover:bg-[#1f2025]"
              }`}
            >
              {/* Left Section: Vehicle Plate & Driver / Info */}
              <div className="min-w-0 flex-1 flex flex-col gap-1 overflow-hidden pr-2">
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="vehiclePlate"
                  size="plateText"
                  className="tracking-tight truncate block whitespace-nowrap"
                >
                  {plateDisplay}
                </MainLayoutColor>

                <div className="flex items-center gap-1.5 text-zinc-400 min-w-0 text-[11px] xl:text-[12px] leading-tight">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="vehicleSubtext"
                    size="subInfoText"
                    className="whitespace-nowrap font-normal shrink-0"
                  >
                    {driverDisplay}
                  </MainLayoutColor>

                  {driverDisplay !== "Not Available" && vehicle.info && (
                    <>
                      <span className="shrink-0 text-[#52525b]">•</span>
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="vehicleSubtext"
                        size="subInfoText"
                        className="truncate font-normal min-w-0 flex-1"
                      >
                        {vehicle.info}
                      </MainLayoutColor>
                    </>
                  )}
                </div>
              </div>

              {/* Right Section: MainStatusBadge + Last Seen + Speed/Location + Reusable View Details Button */}
              <div className="flex items-center gap-3 shrink-0 ml-auto">
                {/* Reusable Status Badge + Last Seen */}
                <div className="w-[85px] xl:w-[95px] flex flex-col items-center justify-center shrink-0">
                  <MainStatusBadge status={vehicle.status} />

                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="vehicleLocation"
                    size="lastSeenText"
                    className="mt-1 truncate block text-center font-normal text-zinc-400 max-w-full text-[10.5px] xl:text-[11.5px]"
                  >
                    {lastSeenDisplay}
                  </MainLayoutColor>
                </div>

                {/* Speed & Location */}
                <div className="text-right leading-tight w-[55px] xl:w-[65px] shrink-0 flex flex-col items-end justify-center">
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="vehicleSpeed"
                    size="speedText"
                    className="block font-bold tracking-tight whitespace-nowrap text-right text-[13px] xl:text-[14px]"
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

                {/* Reusable View Details Button */}
                <div className="shrink-0">
                  <MainLayoutButton
                    variant="outlineYellow"
                    size="xs"
                    className="whitespace-nowrap px-2.5"
                    onClick={(event) => handleViewDetailsClick(event, vehicle)}
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