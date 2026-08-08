
import React from "react";
import { ChevronRight } from "lucide-react";

const STATUS_FILTERS = [
  { label: "All", value: "all", color: "bg-[#71717a]" },
  { label: "Mobilized", value: "mobilized", color: "bg-[#10b981]" },
  { label: "Immobilized", value: "immobilized", color: "bg-[#FDBB24]" },
  { label: "Offline", value: "offline", color: "bg-[#ef4444]" },
];

const ACTION_STYLES = {
  mobilized: {
    label: "Mobilized",
    className: "bg-[#062d1b] text-[#10b981] hover:bg-[#0a3f27]",
  },
  immobilized: {
    label: "Immobilized",
    className: "bg-[#382400] text-[#f59e0b] hover:bg-[#4d3200]",
  },
  offline: {
    label: "Offline",
    className: "bg-[#3f0f15] text-[#ef4444] opacity-80 cursor-default",
  },
};

export default function MobilizeVehicleList({
  vehicles = [],
  activeFilter,
  onFilterChange,
  onAction,
  onSelectVehicle,
  selectedVehicle,
}) {
  return (
    <div className="w-full h-full min-h-0 bg-[#141416] border border-[#222226] rounded-2xl p-3 flex flex-col select-none overflow-hidden shadow-2xl">
      <h3 className="text-xs font-semibold text-white mb-2 shrink-0">
        Vehicle List
      </h3>

      <div className="flex items-center gap-1.5 pb-1.5 mb-2 shrink-0 overflow-x-auto no-scrollbar">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-150 cursor-pointer shrink-0 ${
              activeFilter === filter.value
                ? "bg-[#27272a] text-white border border-[#3f3f46]"
                : "bg-[#1c1c20] text-[#a1a1aa] border border-[#2a2a2e] hover:border-[#3f3f46]"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-[2px] ${filter.color}`} />
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto pr-1 flex-1 custom-scrollbar min-h-0">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => {
            const action = ACTION_STYLES[vehicle.status] || ACTION_STYLES.offline;
            const isOffline = vehicle.status === "offline";
            const isSelected = selectedVehicle?.id === vehicle.id;

            return (
              <div
                key={vehicle.id}
                onClick={() => onSelectVehicle?.(vehicle)}
                className={`flex items-center justify-between py-2 px-3 rounded-xl border transition-all duration-150 w-full gap-2 shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#1c1c20] border-[#3f3f46] shadow-md"
                    : "bg-[#18181b]/60 border-[#222226] hover:border-[#2a2a2e] hover:bg-[#18181b]"
                }`}
              >
                <div className="min-w-0 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                  <div className="leading-tight min-w-0">
                    <p className="text-xs font-bold text-white tracking-wide truncate">
                      {vehicle.plate}{" "}
                      <span className="text-[10px] font-normal text-[#71717a] ml-1">
                        {vehicle.city}
                      </span>
                    </p>
                    <p className="text-[10px] text-[#71717a] mt-0.5 truncate">
                      {vehicle.driver}{" "}
                      {vehicle.info && `• ${vehicle.info}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    disabled={isOffline}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isOffline) onAction?.(vehicle);
                    }}
                    className={`h-7 px-3 rounded-full text-[10px] font-medium transition-all flex items-center justify-center cursor-pointer ${
                      action.className
                    }`}
                  >
                    {action.label}
                  </button>

                  <ChevronRight
                    size={15}
                    className="text-[#71717a] group-hover:text-white transition-colors"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#27272a] bg-[#141416] p-6 text-center">
            <p className="text-[10px] text-[#71717a]">No vehicles found</p>
          </div>
        )}
      </div>
    </div>
  );
}