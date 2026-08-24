import React, { useState } from "react";
import { Search, ChevronRight, Loader2 } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

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
          { id: "MH14ZZ8765", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Active" },
          { id: "MH14ZZ8766", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Active" },
          { id: "MH14ZZ8767", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Maint." },
          { id: "MH14ZZ8768", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Idle" },
          { id: "MH14ZZ8769", type: "Heavy Truck", driver: "Ashoke Sharma", fleet: "West Fleet", status: "Offline" },
        ];

  const filters = [
    { label: "All Vehicles", value: "All", isYellowDot: false },
    { label: "Active", value: "Active", color: "bg-emerald-500", isYellowDot: false },
    { label: "Maint.", value: "Maint.", color: "", isYellowDot: true },
    { label: "Idle", value: "Idle", color: "bg-amber-500", isYellowDot: false },
    { label: "Offline", value: "Offline", color: "bg-zinc-500", isYellowDot: false },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Maint.":
        return "bg-[#ffd60a]/10 border-[#ffd60a]/20";
      case "Idle":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
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
      {/* 14px Header Title */}
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
          background="filterInactiveBg"
          className="text-[#a1a1aa] border border-[#232329] px-2 py-0.5 rounded-md"
        >
          <MainLayoutTextSize size="captionText" className="font-medium">
            {filteredVehicles.length}
          </MainLayoutTextSize>
        </MainLayoutColor>
      </div>

      {/* Search Input */}
      <div className="relative mb-2 shrink-0">
        <MainLayoutColor
          as="input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search vehicle, driver..."
          className="w-full bg-[#18181b]/80 border border-[#27272a] focus:border-[#FDB914] text-[12px] text-white rounded-lg pl-2.5 pr-8 py-1.5 focus:outline-none transition-all placeholder-[#52525b]"
        />
        <Search className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 mb-2 overflow-x-auto no-scrollbar shrink-0 pb-0.5">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? "bg-[#27272a] text-white"
                  : "bg-[#18181b]/60 text-[#a1a1aa] hover:text-white"
              }`}
            >
              {filter.isYellowDot ? (
                <MainLayoutColor
                  as="span"
                  background="yellow"
                  className="w-1.5 h-1.5 rounded-full"
                />
              ) : filter.color ? (
                <span className={`w-1.5 h-1.5 rounded-full ${filter.color}`} />
              ) : null}
              <MainLayoutTextSize size="badgeText" className="font-medium">
                {filter.label}
              </MainLayoutTextSize>
            </button>
          );
        })}
      </div>

      {/* Vehicle List */}
      <div className="flex-none lg:flex-1 overflow-y-visible lg:overflow-y-auto space-y-1.5 pr-0.5 custom-scrollbar min-h-0">
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center text-[#71717a] gap-2.5">
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

            return (
              <MainLayoutColor
                key={v.id}
                as="div"
                border="cardBorder"
                borderHover="cardBorderHover"
                onClick={() => onSelectVehicle?.(v.uniqueId)}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer group ${
                  isSelected
                    ? "bg-[#18181b]"
                    : "bg-[#18181b]/50 hover:bg-[#18181b]/80"
                }`}
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {/* 14px Plate Text */}
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="title"
                      size="plateText"
                      className="font-medium tracking-tight truncate block"
                    >
                      {v.id}
                    </MainLayoutColor>

                    {/* Status Badge */}
                    {isMaint ? (
                      <span className={`px-2 py-0.5 rounded-full border flex items-center gap-1 shrink-0 ${getStatusBadge(v.status)}`}>
                        <MainLayoutColor as="span" background="yellow" className="w-1 h-1 rounded-full" />
                        <MainLayoutColor as={MainLayoutTextSize} color="yellow" size="badgeText" className="font-medium">
                          {v.status}
                        </MainLayoutColor>
                      </span>
                    ) : (
                      <span className={`px-2 py-0.5 rounded-full border flex items-center gap-1 shrink-0 ${getStatusBadge(v.status)}`}>
                        <span className="w-1 h-1 rounded-full bg-current" />
                        <MainLayoutTextSize size="badgeText" className="font-medium">
                          {v.status}
                        </MainLayoutTextSize>
                      </span>
                    )}
                  </div>

                  {/* 12px Sub Info Line 1 */}
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="subInfoText"
                    className="font-medium leading-tight truncate block"
                  >
                    {v.type}
                  </MainLayoutColor>

                  {/* 12px Sub Info Line 2 */}
                  <MainLayoutColor
                    as={MainLayoutTextSize}
                    color="subtitle"
                    size="subInfoText"
                    className="font-medium leading-tight truncate block text-[#71717a]"
                  >
                    {v.driver} • <span className="text-[#a1a1aa]">{v.fleet}</span>
                  </MainLayoutColor>
                </div>

                {/* Unified Chevron Button Style */}
                <button
                  type="button"
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0 ml-2 cursor-pointer ${
                    isSelected
                      ? "bg-[#27272a] text-[#FDB914]"
                      : "bg-[#27272a]/60 text-[#a1a1aa] group-hover:bg-[#27272a] group-hover:text-white"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
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