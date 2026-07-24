import React from "react";
import { ChevronRight } from "lucide-react";
import { STATUS_FILTERS } from "./mobilizeData";

const ACTION_STYLES = {
  mobilized: {
    label: "Immobilize",
    className:
      "bg-[#FDBB24]/15 border border-[#FDBB24]/40 text-[#FDBB24] hover:bg-[#FDBB24]/25",
  },
  immobilized: {
    label: "Mobilize",
    className:
      "bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] hover:bg-[#10b981]/25",
  },
  offline: {
    label: "Offline",
    className:
      "bg-[#ef4444]/15 border border-[#ef4444]/40 text-[#ef4444] cursor-default",
  },
};

export default function MobilizeVehicleList({
  vehicles = [],
  activeFilter,
  onFilterChange,
  onAction,
}) {
  return (
    <div className="w-full flex-1 min-h-0 bg-[#121214] border border-[#1f1f23] rounded-xl p-3 flex flex-col select-none overflow-hidden">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 mb-2 shrink-0 no-scrollbar flex-nowrap">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-medium transition-all duration-200 bg-[#18181b] border border-[#27272a] text-[#d4d4d8] hover:border-zinc-600 cursor-pointer shrink-0
              ${
                activeFilter === filter.value
                  ? "border-zinc-500 bg-zinc-800 text-white"
                  : ""
              }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${filter.color}`} />
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1.5 overflow-y-auto pr-0.5 flex-1 custom-scrollbar">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => {
            const action = ACTION_STYLES[vehicle.status] || ACTION_STYLES.offline;
            const isOffline = vehicle.status === "offline";

            return (
              <div
                key={vehicle.id}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg border bg-[#161619]/40 border-[#1f1f23]/60 hover:border-zinc-800 transition-all duration-200 w-full gap-3 shrink-0"
              >
                <div className="min-w-0 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
                  <div className="leading-tight min-w-0">
                    <p className="text-[11px] font-bold text-white tracking-tight truncate">
                      {vehicle.plate}
                    </p>
                    <p className="text-[9px] text-zinc-500 mt-0.5 truncate">
                      {vehicle.city}
                    </p>
                  </div>

                  <div className="leading-tight min-w-0">
                    <p className="text-[11px] font-semibold text-[#d4d4d8] truncate">
                      {vehicle.driver}
                    </p>
                    <p className="text-[9px] text-zinc-500 mt-0.5 truncate">
                      {vehicle.info}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isOffline}
                  onClick={() => !isOffline && onAction?.(vehicle)}
                  className={`flex items-center gap-1 h-7 px-3 rounded-full text-[10px] font-bold transition-all shrink-0 ${action.className} ${
                    isOffline ? "" : "cursor-pointer"
                  }`}
                >
                  {action.label}
                  <ChevronRight size={12} strokeWidth={2.5} />
                </button>
              </div>
            );
          })
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-[#27272a] bg-[#121214]/60 px-4 py-12">
            <p className="text-[11px] text-[#71717a]">No vehicles found</p>
          </div>
        )}
      </div>
    </div>
  );
}
