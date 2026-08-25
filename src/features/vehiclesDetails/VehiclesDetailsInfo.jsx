import React, { useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutFilterButton from "../../components/Ui/MainLayoutUI/MainLayoutFilterButton";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";

const FILTERS = [
  { label: "All Vehicles", value: "All" },
  { label: "Inactive", value: "Inactive", dotBg: "filterDotMoving" },
  { label: "Maint.", value: "Maint.", dotBg: "yellow" },
  { label: "Idle", value: "Idle", dotBg: "filterDotIdle" },
  { label: "Offline", value: "Offline", dotBg: "filterDotOffline" },
];

export default function VehiclesDetailsInfo({
  selectedVehicle,
  onSelectVehicle,
  vehicles: apiVehicles = [],
  isLoading,
  isError,
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const vehicles =
    apiVehicles.length > 0
      ? apiVehicles.map((item) => ({
          id: item.id || item.plate || item.vehicleNumber,
          uniqueId: item.raw?.unique_id || item.uniqueId || item.id,
          type: item.type || item.model || item.raw?.vehicle_type || "Unknown",
          driver: item.driver || item.raw?.driver_name || "Unassigned",
          fleet:
            item.fleetGroup ||
            item.location ||
            item.raw?.fleet_group ||
            item.raw?.fleetGroup ||
            "Unknown",
          status:
            item.status ||
            item.raw?.status ||
            item.raw?.tracking_status ||
            item.raw?.device_status ||
            "Unknown",
        }))
      : [
          { id: "MH14ZZ8765", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Inactive" },
          { id: "MH14ZZ8766", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Inactive" },
          { id: "MH14ZZ8767", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Maint." },
          { id: "MH14ZZ8768", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Idle" },
          { id: "MH14ZZ8769", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Offline" },
        ];

  const getStatusBadgeConfig = (status) => {
    switch (status) {
      case "Inactive":
        return { color: "greenStatusBadge", background: "greenStatusBadgeBg", border: "greenStatusBadgeBorder" };
      case "Maint.":
        return { color: "yellow", background: "pendingStatusBadgeBg", border: "pendingStatusBadgeBorder" };
      case "Idle":
        return { color: "kycNoStatusBadge", background: "kycNoStatusBadgeBg", border: "kycNoStatusBadgeBorder" };
      default:
        return { color: "inactiveStatusBadge", background: "inactiveStatusBadgeBg", border: "inactiveStatusBadgeBorder" };
    }
  };

  const filteredVehicles = vehicles.filter((v) => {
    const matchesFilter = activeFilter === "All" || v.status === activeFilter;
    const matchesSearch =
      (v.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.driver || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.fleet || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <MainLayoutColor
      as="aside"
      background="surface"
      className="w-full h-auto lg:h-full flex flex-col p-2.5 rounded-xl min-h-0 overflow-hidden select-none font-sans"
    >
      {/* Header Title & Count */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <MainLayoutColor
          as={MainLayoutTextSize}
          color="title"
          size="sectionTitle"
          className="font-medium tracking-tight block"
        >
          Vehicles
        </MainLayoutColor>
        <MainLayoutColor
          as="span"
          background="filterActiveBg"
          border="cardBorder"
          color="subtitle"
          className="px-2 py-0.5 rounded-md"
        >
          <MainLayoutTextSize size="captionText" className="font-medium">
            {filteredVehicles.length}
          </MainLayoutTextSize>
        </MainLayoutColor>
      </div>

      {/* Centralized Search Input */}
      <div className="mb-2 shrink-0">
        <MainSearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search vehicle, driver..."
          iconPosition="right"
          className="w-full rounded-lg"
        />
      </div>

      {/* Filter Tabs using MainLayoutFilterButton */}
      <div className="flex items-center gap-1.5 mb-2 overflow-x-auto no-scrollbar shrink-0 pb-0.5">
        {FILTERS.map((filter) => {
          const isSelected = activeFilter === filter.value;
          return (
            <MainLayoutFilterButton
              key={filter.value}
              isActive={isSelected}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.dotBg && (
                <MainLayoutColor
                  as="span"
                  background={filter.dotBg}
                  className="w-1.5 h-1.5 rounded-full shrink-0 inline-block"
                />
              )}
              <MainLayoutTextSize size="filterText">
                {filter.label}
              </MainLayoutTextSize>
            </MainLayoutFilterButton>
          );
        })}
      </div>

      {/* Vehicle List */}
      <div className="flex-none lg:flex-1 overflow-y-visible lg:overflow-y-auto space-y-1.5 pr-0.5 custom-scrollbar min-h-0">
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-2.5">
            <MainLayoutColor as={Loader2} color="yellow" size={24} className="animate-spin" />
            <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium">
              Loading vehicles...
            </MainLayoutColor>
          </div>
        ) : isError ? (
          <div className="py-16 text-center">
            <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium">
              Failed to load vehicles list.
            </MainLayoutColor>
          </div>
        ) : filteredVehicles.length > 0 ? (
          filteredVehicles.map((v) => {
            const isSelected = selectedVehicle === v.uniqueId;
            const isMaint = v.status === "Maint.";
            const badgeConfig = getStatusBadgeConfig(v.status);

            return (
              <MainLayoutColor
                key={v.id}
                as="div"
                background={isSelected ? "filterActiveBg" : "surface"}
                border="cardBorder"
                borderHover="cardBorderHover"
                onClick={() => onSelectVehicle?.(v.uniqueId)}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer group ${
                  isSelected ? "shadow-md" : "hover:opacity-90"
                }`}
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="title"
                      size="plateText"
                      className="font-medium tracking-tight truncate block"
                    >
                      {v.id}
                    </MainLayoutColor>

                    {/* Status Badge */}
                    <MainLayoutColor
                      as="span"
                      color={badgeConfig.color}
                      background={badgeConfig.background}
                      border={badgeConfig.border}
                      className="px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0"
                    >
                      <MainLayoutColor
                        as="span"
                        background={isMaint ? "yellow" : badgeConfig.color}
                        className="w-1 h-1 rounded-full shrink-0"
                      />
                      <MainLayoutTextSize size="badgeText" className="font-medium">
                        {v.status}
                      </MainLayoutTextSize>
                    </MainLayoutColor>
                  </div>

                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="subInfoText"
                    className="font-medium leading-tight truncate block"
                  >
                    {v.type}
                  </MainLayoutColor>

                  <div className="flex items-center gap-1 min-w-0">
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                      className="font-medium leading-tight truncate"
                    >
                      {v.driver}
                    </MainLayoutColor>
                    <MainLayoutColor as="span" color="subtitle" className="shrink-0">
                      •
                    </MainLayoutColor>
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="muted"
                      size="subInfoText"
                      className="font-medium leading-tight truncate"
                    >
                      {v.fleet}
                    </MainLayoutColor>
                  </div>
                </div>

                <MainLayoutColor
                  as="button"
                  type="button"
                  background="filterBg"
                  border="filterBorder"
                  color={isSelected ? "yellow" : "subtitle"}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0 ml-2 cursor-pointer hover:text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </MainLayoutColor>
              </MainLayoutColor>
            );
          })
        ) : (
          <div className="h-full flex items-center justify-center p-4 text-center">
            <MainLayoutColor as={MainLayoutTextSize} color="subtitle" size="subInfoText" className="font-medium">
              No vehicles found
            </MainLayoutColor>
          </div>
        )}
      </div>
    </MainLayoutColor>
  );
}