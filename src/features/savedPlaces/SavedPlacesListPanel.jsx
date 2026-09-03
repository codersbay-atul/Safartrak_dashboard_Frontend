import React from "react";
import MainLayoutColor from "../../components/Ui/MainLayoutUI/MainLayoutColor";
import MainLayoutTextSize from "../../components/Ui/MainLayoutUI/MainLayoutTextSize";
import MainLayoutFilterButton from "../../components/Ui/MainLayoutUI/MainLayoutFilterButton";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainStatusBadge from "../../components/Ui/MainLayoutUI/MainStatusBadge";

const PLACE_FILTERS = [
  { label: "All", value: "all", dotBg: "filterDotAll" },
  { label: "Active", value: "active", dotBg: "filterDotMoving" },
  { label: "Inactive", value: "inactive", dotBg: "filterDotIdle" },
];

export default function SavedPlacesListPanel({
  places = [],
  selectedId,
  onSelect,
  searchQuery = "",
  onSearchChange,
  statusFilter = "all",
  onFilterChange,
  isLoading = false,
  isError = false,
  errorMessage = "",
}) {
  return (
    <MainLayoutColor
      as="div"
      background="surface"
      border="cardBorder"
      className="w-full h-full rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col select-none overflow-hidden font-sans min-w-0"
    >
      {/* 14px Header Title */}
      <MainLayoutColor
        as={MainLayoutTextSize}
        color="title"
        size="sectionTitle"
        className="font-semibold mb-3 tracking-tight block shrink-0"
      >
        All Saved Places
      </MainLayoutColor>

      {/* Full Width Search Box with Custom Sizing */}
      <div className="w-full mb-3 shrink-0">
        <MainSearchInput
          placeholder="Search places..."
          value={searchQuery}
          onChange={onSearchChange}
          iconPosition="right"
          containerClassName="!w-full min-w-full"
          className="!w-full !h-9 !py-2 !pl-4 !pr-10"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 shrink-0 no-scrollbar flex-nowrap w-full">
        {PLACE_FILTERS.map((filter) => {
          const isSelected = statusFilter === filter.value;
          return (
            <MainLayoutFilterButton
              key={filter.value}
              isActive={isSelected}
              onClick={() => onFilterChange(filter.value)}
            >
              {filter.dotBg && (
                <MainLayoutColor
                  as="span"
                  background={filter.dotBg}
                  className="w-2 h-2 rounded-[2px] shrink-0 inline-block"
                />
              )}
              <MainLayoutTextSize size="filterText">
                {filter.label}
              </MainLayoutTextSize>
            </MainLayoutFilterButton>
          );
        })}
      </div>

      {/* Places List */}
      <div className="flex flex-col overflow-y-auto flex-1 custom-scrollbar min-h-0 space-y-2">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#27272a] px-4 py-8 my-2 min-h-[140px]">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
            >
              Loading saved places...
            </MainLayoutColor>
          </div>
        ) : isError ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#27272a] px-4 py-8 my-2 min-h-[140px]">
            <MainLayoutColor
              as={MainLayoutTextSize}
              color="subtitle"
              size="subInfoText"
            >
              {errorMessage || "Failed to load saved places"}
            </MainLayoutColor>
          </div>
        ) : places.length > 0 ? (
          places.map((place) => {
            const isSelected = selectedId === place.id;
            const currentStatus = place.status || "Inactive";

            return (
              <MainLayoutColor
                key={place.id}
                as="button"
                type="button"
                onClick={() => onSelect(place)}
                className={`w-full text-left py-3 px-3 sm:px-3.5 transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-[#07080a] border-l-2 border-l-[#ffd60a]"
                    : "hover:bg-[#1f2025]"
                }`}
              >
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="title"
                        size="sectionTitle"
                        className="font-semibold truncate inline max-w-full"
                      >
                        {place.name}
                      </MainLayoutColor>

                      <MainLayoutColor
                        as={MainLayoutTextSize}
                        color="subtitle"
                        size="subInfoText"
                        className="shrink-0 font-normal inline"
                      >
                        {place.assignedVehiclesCount ?? place.vehicles ?? 0}{" "}
                        Assigned Vehicles
                      </MainLayoutColor>
                    </div>

                    <MainLayoutColor
                      as={MainLayoutTextSize}
                      color="subtitle"
                      size="subInfoText"
                      className="mt-0.5 truncate block"
                    >
                      {place.type} • {place.size}
                      <span className="mx-1.5">•</span>
                      {place.alertsText ?? "No recent alerts"}
                    </MainLayoutColor>
                  </div>

                  <div className="shrink-0">
                    <MainStatusBadge status={currentStatus} showDot={false} />
                  </div>
                </div>
              </MainLayoutColor>
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
