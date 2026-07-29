import React, { useState } from "react";
import { Search, ChevronRight, Loader2 } from "lucide-react";

export default function VehiclesDetailsInfo({ selectedVehicle, onSelectVehicle, vehicles: apiVehicles = [], isLoading, isError }) {
  const [activeFilter, setActiveFilter] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");

  const vehicles = apiVehicles.length > 0
    ? apiVehicles.map((item) => ({
        id: item.id,
        uniqueId: item.raw?.unique_id,
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
    { label: "All Vehicles", value: "All" },
    { label: "Active", value: "Active", color: "bg-emerald-500" },
    { label: "Maint.", value: "Maint.", color: "bg-[#ffd60a]" },
    { label: "Idle", value: "Idle", color: "bg-amber-500" },
    { label: "Offline", value: "Offline", color: "bg-zinc-500" },
  ];

  // Helper for Status Badge Styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 dot-emerald";
      case "Maint.":
        return "bg-[#ffd60a]/10 text-[#ffd60a] border-[#ffd60a]/20 dot-yellow";
      case "Idle":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20 dot-amber";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20 dot-zinc";
    }
  };

  // Filter Logic
  const filteredVehicles = vehicles.filter((v) => {
    const matchesFilter = activeFilter === "All" || v.status === activeFilter;
    const matchesSearch =
      v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.fleet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <aside className="w-full h-full bg-[#121214] border border-[#27272a] flex flex-col p-2.5 rounded-xl min-h-0 overflow-hidden select-none">
      
      {/* Title */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <h2 className="text-[12px] font-bold text-white tracking-tight">
          Vehicles
        </h2>
        <span className="text-[10px] font-semibold text-[#a1a1aa] bg-[#18181b] border border-[#27272a] px-1.5 py-0.5 rounded-md">
          {filteredVehicles.length}
        </span>
      </div>

      {/* Search Input */}
      <div className="relative mb-2 shrink-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search vehicle, driver..."
          className="w-full bg-[#18181b]/80 border border-[#27272a] focus:border-[#ffd60a] text-[10.5px] text-white rounded-lg pl-2.5 pr-8 py-1.5 focus:outline-none transition-all placeholder-[#52525b]"
        />
        <Search className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none" />
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1 mb-2 overflow-x-auto no-scrollbar shrink-0 pb-0.5">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-2 py-1 rounded-lg text-[9.5px] font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer border ${
                isActive
                  ? "bg-[#27272a] text-white border-[#ffd60a]"
                  : "bg-[#18181b]/60 text-[#a1a1aa] border-[#27272a] hover:border-[#3f3f46] hover:text-white"
              }`}
            >
              {filter.color && (
                <span className={`w-1.5 h-1.5 rounded-full ${filter.color}`} />
              )}
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Vehicle List */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5 custom-scrollbar min-h-0">
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center text-[#71717a] gap-2.5">
            <Loader2 size={24} className="animate-spin text-[#ffd60a]" />
            <p className="text-[11px] tracking-wide">Loading vehicles...</p>
          </div>
        ) : isError ? (
          <div className="py-16 text-center text-[#71717a] text-[11px]">
            Failed to load vehicles list.
          </div>
        ) : filteredVehicles.length > 0 ? (
          filteredVehicles.map((v) => {
            const isSelected = selectedVehicle === v.uniqueId;
            return (
              <div
                key={v.id}
                onClick={() => onSelectVehicle?.(v.uniqueId)}
                className={`p-2 rounded-xl border transition-all flex items-center justify-between cursor-pointer group ${
                  isSelected
                    ? "bg-[#18181b] border-[#ffd60a] shadow-md shadow-[#ffd60a]/5"
                    : "bg-[#18181b]/50 border-[#27272a] hover:border-[#3f3f46] hover:bg-[#18181b]/80"
                }`}
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[11px] text-white tracking-tight truncate">
                      {v.id}
                    </span>
                    <span
                      className={`text-[8.5px] px-1.5 py-0.2 rounded-full font-semibold border flex items-center gap-1 ${getStatusBadge(
                        v.status
                      )}`}
                    >
                      <span className="w-1 h-1 rounded-full bg-current" />
                      {v.status}
                    </span>
                  </div>
                  <p className="text-[9.5px] text-[#a1a1aa] font-medium leading-tight truncate">
                    {v.type}
                  </p>
                  <p className="text-[8.5px] text-[#71717a] leading-tight truncate">
                    {v.driver} • <span className="text-[#a1a1aa]">{v.fleet}</span>
                  </p>
                </div>

                <button
                  type="button"
                  className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all shrink-0 ml-2 ${
                    isSelected
                      ? "bg-[#ffd60a] text-black"
                      : "bg-[#27272a]/60 text-[#a1a1aa] group-hover:bg-[#ffd60a] group-hover:text-black"
                  }`}
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            );
          })
        ) : (
          <div className="h-full flex items-center justify-center text-[10.5px] text-[#71717a] p-4 text-center">
            No vehicles found
          </div>
        )}
      </div>
    </aside>
  );
}