import React from "react";
import { ChevronRight } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

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
    <MainLayoutColor
      as="div"
      background="surface"
      border="cardBorder"
      className="w-full h-auto lg:h-full min-h-0 border rounded-2xl p-3 flex flex-col select-none overflow-hidden shadow-2xl font-sans"
    >
      {/* 14px Title */}
      <MainLayoutColor
        as={MainLayoutTextSize}
        color="title"
        size="sectionTitle"
        className="font-semibold mb-2 shrink-0 block"
      >
        Vehicle List
      </MainLayoutColor>

      <div className="flex items-center gap-1.5 pb-1.5 mb-2 shrink-0 overflow-x-auto no-scrollbar">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-150 cursor-pointer shrink-0 ${
              activeFilter === filter.value
                ? "bg-[#27272a] text-white border border-[#3f3f46]"
                : "bg-[#18181b]/60 text-[#a1a1aa] border border-[#27272a] hover:border-[#3f3f46] hover:text-white"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-[2px] ${filter.color}`} />
            <MainLayoutTextSize size="badgeText" className="font-medium">
              {filter.label}
            </MainLayoutTextSize>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 overflow-y-visible lg:overflow-y-auto pr-1 flex-none lg:flex-1 custom-scrollbar min-h-0">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => {
            const action = ACTION_STYLES[vehicle.status] || ACTION_STYLES.offline;
            const isOffline = vehicle.status === "offline";
            const isSelected = selectedVehicle?.id === vehicle.id;

            return (
              <MainLayoutColor
                key={vehicle.id}
                as="div"
                background="surface"
                border="cardBorder"
                borderHover="cardBorderHover"
                onClick={() => onSelectVehicle?.(vehicle)}
                className={`group flex items-center justify-between py-2 px-3 rounded-xl border transition-all duration-150 w-full gap-2 shrink-0 cursor-pointer ${
                  isSelected ? "bg-[#18181b] shadow-md" : "hover:bg-[#18181b]/80"
                }`}
              >
                <div className="min-w-0 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                  <div className="leading-tight min-w-0">
                    {/* 14px Plate Number */}
                    <div className="flex items-center gap-1.5 truncate">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="title"
                        size="sectionTitle"
                        className="font-bold tracking-wide truncate inline text-[13px]"
                      >
                        {vehicle.plate}
                      </MainLayoutColor>

                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="subtitle"
                        className="font-normal truncate inline text-[12px]"
                      >
                        {vehicle.city}
                      </MainLayoutColor>
                    </div>

                    {/* 12px Subtitle & Unknown/Info */}
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                      className="mt-0.5 truncate block text-[11px] font-medium"
                    >
                      {vehicle.driver || "Unknown"}
                      {vehicle.info ? ` • ${vehicle.info}` : ""}
                    </MainLayoutColor>
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
                    className={`h-7 px-3 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                      action.className
                    }`}
                  >
                    <MainLayoutTextSize size="badgeText" className="font-medium text-[11px]">
                      {action.label}
                    </MainLayoutTextSize>
                  </button>

                  <ChevronRight
                    size={15}
                    className="text-[#71717a] group-hover:text-white transition-colors"
                  />
                </div>
              </MainLayoutColor>
            );
          })
        ) : (
          <MainLayoutColor
            as="div"
            background="surface"
            border="cardBorder"
            className="flex flex-1 items-center justify-center rounded-xl border border-dashed p-6 text-center"
          >
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subtitle"
              className="font-medium"
            >
              No vehicles found
            </MainLayoutColor>
          </MainLayoutColor>
        )}
      </div>
    </MainLayoutColor>
  );
}