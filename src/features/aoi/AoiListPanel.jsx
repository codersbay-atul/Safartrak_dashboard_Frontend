import React from "react";
import { Search } from "lucide-react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";

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
    <MainLayoutColor
      as="div"
      background="surface"
      className="w-full h-auto lg:h-full border border-[#1f1f23] rounded-2xl p-4 flex flex-col select-none overflow-hidden font-sans"
    >
      {/* 14px Header Title */}
      <MainLayoutColor
        as={MainLayoutTextSize}
        color="title"
        size="sectionTitle"
        className="font-semibold mb-3 tracking-tight block"
      >
        All Saved Places
      </MainLayoutColor>

      <div className="relative w-full mb-3 shrink-0">
        <input
          type="text"
          placeholder="Search vehicles..."
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full rounded-full bg-[#09090b] border border-[#27272a] focus:border-[#3f3f46] text-[12px] py-2 pl-4 pr-10 text-white placeholder-[#52525b] outline-none transition-all"
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
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? "bg-[#27272a] text-white"
                  : "bg-[#18181b] text-[#8e8e93] hover:text-white"
              }`}
            >
              {filter.color && (
                <span className={`w-2 h-2 rounded-[2px] ${filter.color}`} />
              )}
              <MainLayoutTextSize size="badgeText" className="font-medium">
                {filter.label}
              </MainLayoutTextSize>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col overflow-y-visible lg:overflow-y-auto flex-none lg:flex-1 custom-scrollbar min-h-0 divide-y divide-[#1f1f23]/70">
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
                      {/* 14px Place Name */}
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="title"
                        size="sectionTitle"
                        className={`font-semibold truncate inline ${
                          isSelected ? "text-white" : "text-[#e4e4e7]"
                        }`}
                      >
                        {aoi.name}
                      </MainLayoutColor>

                      {/* 12px Sub Info */}
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="subInfoText"
                        className="shrink-0 font-normal inline"
                      >
                        {aoi.assignedVehiclesCount ?? aoi.vehicles ?? 0} Assigned Vehicles
                      </MainLayoutColor>
                    </div>

                    {/* 12px Sub Info Line */}
                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                      className="mt-0.5 truncate block"
                    >
                      {aoi.type} • {aoi.size}
                      <span className="mx-1.5">•</span>
                      {aoi.alertsText ?? "No recent alerts"}
                    </MainLayoutColor>
                  </div>

                  {/* Badge */}
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full transition-colors ${
                      isActive
                        ? "bg-[#042814] text-[#10b981]"
                        : "bg-[#2e1d05] text-[#d97706]"
                    }`}
                  >
                    <MainLayoutTextSize size="badgeText" className="font-medium">
                      {isActive ? "Active" : "Inactive"}
                    </MainLayoutTextSize>
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#27272a] px-4 py-8 my-2 min-h-[140px]">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
            >
              No Saved Places found
            </MainLayoutColor>
          </div>
        )}
      </div>
    </MainLayoutColor>
  );
}