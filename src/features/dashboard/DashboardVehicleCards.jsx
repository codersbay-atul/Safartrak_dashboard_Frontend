import React, { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { useVehiclesList } from "../../hooks/useVehiclesList";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutFilterButton from "../../components/Ui/MainLayoutUI/MainLayoutFilterButton";
import VehicleStarCard from "./VehicleStarCard";

const FILTER_DEFS = [
  { label: "All", match: "All" },
  { label: "Running", match: "Running" },
  { label: "Stopped", match: "Stopped" },
  { label: "No Signal", match: "No Signal" },
  { label: "Scheduled", match: "Scheduled" },
];

function matchesVehicleFilter(vehicle, filterLabel) {
  if (filterLabel === "All") return true;

  const status = String(
    vehicle?.liveStatus ?? vehicle?.statusLabel ?? "",
  ).toLowerCase();
  const speed = Number(vehicle?.speed ?? 0);

  switch (filterLabel) {
    case "Running":
      return (
        status === "moving" ||
        status === "running" ||
        (!Number.isNaN(speed) && speed > 0)
      );
    case "Stopped":
      return (
        status === "idle" ||
        status === "stopped" ||
        (speed === 0 && status !== "offline" && status !== "no gps")
      );
    case "No Signal":
      return status === "offline" || status === "no gps" || status === "no_gps";
    case "Scheduled":
      return false;
    default:
      return true;
  }
}

function getVehicleSortPriority(vehicle) {
  const status = String(
    vehicle?.liveStatus ?? vehicle?.statusLabel ?? "",
  ).toLowerCase();
  const speed = Number(vehicle?.speed ?? 0);
  const isRunning =
    status === "moving" || status === "running" || speed > 0;
  return isRunning ? 0 : 1;
}

export default function DashboardVehicleCards({
  search = "",
  selectedVehicle,
  onSelectVehicle,
  onOpenVehicle,
  onSavePlace,
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortRunningFirst, setSortRunningFirst] = useState(true);

  const { vehicles, filterCounts, isLoading } = useVehiclesList({
    search,
    page: 1,
    limit: 100,
    status: "all",
  });

  const filteredVehicles = useMemo(() => {
    const next = vehicles
      .filter((vehicle) => matchesVehicleFilter(vehicle, activeFilter))
      .slice();

    next.sort((a, b) => {
      const priority = getVehicleSortPriority(a) - getVehicleSortPriority(b);
      return sortRunningFirst ? priority : -priority;
    });

    return next;
  }, [vehicles, activeFilter, sortRunningFirst]);

  return (
    <MainLayoutColor
      as="div"
      background="surface"
      border="cardBorder"
      className="w-full h-full rounded-xl py-3 flex flex-col select-none overflow-hidden min-w-0"
    >
      <div className="flex items-center gap-2 overflow-x-auto pb-3 px-3 shrink-0 no-scrollbar flex-nowrap">
        {FILTER_DEFS.map((filter) => {
          const isSelected = activeFilter === filter.label;
          const count = filterCounts?.[filter.label] ?? null;
          return (
            <MainLayoutFilterButton
              key={filter.label}
              isActive={isSelected}
              onClick={() => setActiveFilter(filter.label)}
            >
              <MainLayoutTextSize size="filterText">
                {filter.label}
              </MainLayoutTextSize>
              {count !== null && (
                <MainLayoutColor
                  as={MainLayoutTextSize}
                  color="filterCount"
                  size="filterText"
                >
                  ({count})
                </MainLayoutColor>
              )}
            </MainLayoutFilterButton>
          );
        })}

        {/* <MainLayoutFilterButton
          isActive={!sortRunningFirst}
          onClick={() => setSortRunningFirst((current) => !current)}
        >
          <ArrowUpDown size={12} className="text-[#FDB914]" />
          <MainLayoutTextSize size="filterText">Sort</MainLayoutTextSize>
        </MainLayoutFilterButton> */}
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0 px-3 pb-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {isLoading && filteredVehicles.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
            >
              Loading vehicles...
            </MainLayoutColor>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
            >
              No vehicles found
            </MainLayoutColor>
          </div>
        ) : (
          filteredVehicles.map((vehicle, index) => (
            <VehicleStarCard
              key={vehicle.id}
              vehicle={vehicle}
              index={index}
              isSelected={selectedVehicle?.id === vehicle.id}
              onSelect={onSelectVehicle}
              onOpenVehicle={onOpenVehicle}
              onSavePlace={onSavePlace}
            />
          ))
        )}
      </div>
    </MainLayoutColor>
  );
}
