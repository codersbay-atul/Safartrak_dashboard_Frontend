import React from "react";
import { Search } from "lucide-react";

const AOI_FILTERS = [
  { label: "All", value: "all", color: "" },
  { label: "Mobilized", value: "mobilized", color: "bg-[#10b981]" },
  { label: "Immobilized", value: "immobilized", color: "bg-[#f59e0b]" },
  { label: "Offline", value: "offline", color: "bg-[#ef4444]" },
];

export default function AoiListPanel({
  aois = [],
  selectedId,
  onSelect,
  searchQuery = "",
  onSearchChange,
  statusFilter = "all",
  onFilterChange,
}) {
  return (
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-2xl p-4 flex flex-col select-none overflow-hidden text-white font-sans">
      <h2 className="text-sm font-semibold text-white mb-3 tracking-tight">
        All Saved Places
      </h2>

      
      <div className="relative w-full mb-3 shrink-0">
        <input
          type="text"
          placeholder="Search Places..."
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full rounded-full bg-[#09090b] border border-[#27272a] focus:border-[#3f3f46] text-xs py-2 pl-4 pr-10 text-white placeholder-[#52525b] outline-none transition-all"
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none flex items-center justify-center">
          <Search size={15} />
        </div>
      </div>

     
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 shrink-0 no-scrollbar flex-nowrap w-full">
        {AOI_FILTERS.map((filter) => {
          const isActive = statusFilter === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => onFilterChange(filter.value)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? "bg-[#27272a] text-white"
                  : "bg-[#18181b] text-[#8e8e93] hover:text-white"
              }`}
            >
              {filter.color && (
                <span className={`w-2 h-2 rounded-[2px] ${filter.color}`} />
              )}
              {filter.label}
            </button>
          );
        })}
      </div>

     
      <div className="flex flex-col overflow-y-auto flex-1 custom-scrollbar min-h-0 divide-y divide-[#1f1f23]/70">
        {aois.length > 0 ? (
          aois.map((aoi) => {
            const isSelected = selectedId === aoi.id;
            const isActive = aoi.status === "active";

            return (
              <button
                key={aoi.id}
                type="button"
                onClick={() => onSelect(aoi)}
                className={`w-full text-left py-3 px-2.5 transition-all cursor-pointer shrink-0 rounded-xl my-0.5 ${
                  isSelected
                    ? "bg-[#1d1d21] border border-[#2e2e35] shadow-sm"
                    : "hover:bg-[#18181c]/50 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 truncate">
                      <span className={`text-xs font-semibold truncate ${isSelected ? "text-white" : "text-[#e4e4e7]"}`}>
                        {aoi.name}
                      </span>
                      <span className="text-[11px] text-[#71717a] shrink-0 font-normal">
                        {aoi.assignedVehiclesCount ?? aoi.vehicles ?? 0} Assigned Vehicles
                      </span>
                    </div>

                    <p className="text-[11px] text-[#71717a] mt-0.5 truncate">
                      {aoi.type} • {aoi.size}
                      <span className="mx-1.5">•</span>
                      {aoi.alertsText ?? "No recent alerts"}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                      isActive
                        ? "bg-[#042814] text-[#10b981]"
                        : "bg-[#2e1d05] text-[#d97706]"
                    }`}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#27272a] px-4 py-8 my-2 min-h-[140px]">
            <p className="text-xs text-[#71717a]">No Saved Places found</p>
          </div>
        )}
      </div>
    </div>
  );
}