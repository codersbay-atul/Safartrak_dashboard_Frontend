import React from "react";
import SearchInput from "../../components/Ui/SearchInput";

const AOI_FILTERS = [
  { label: "All", value: "all", color: "bg-[#71717a]" },
  { label: "Active", value: "active", color: "bg-[#10b981]" },
  { label: "Inactive", value: "inactive", color: "bg-[#FDBB24]" },
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
    <div className="w-full h-full bg-[#121214] border border-[#1f1f23] rounded-xl p-3 flex flex-col select-none overflow-hidden">
      <SearchInput
        placeholder="Search AOI..."
        value={searchQuery}
        onChange={onSearchChange}
        iconPosition="left"
        containerClassName="w-full min-w-0 mb-2"
        className="w-full sm:w-full rounded-xl bg-[#18181b] py-1.5"
      />

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 mb-2 shrink-0 no-scrollbar flex-nowrap">
        {AOI_FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-medium transition-all duration-200 bg-[#18181b] border border-[#27272a] text-[#d4d4d8] hover:border-zinc-600 cursor-pointer shrink-0
              ${
                statusFilter === filter.value
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
        {aois.length > 0 ? (
          aois.map((aoi) => {
            const isSelected = selectedId === aoi.id;
            const isActive = aoi.status === "active";

            return (
              <button
                key={aoi.id}
                type="button"
                onClick={() => onSelect(aoi)}
                className={`w-full text-left rounded-lg border px-2.5 py-2 transition-all cursor-pointer shrink-0
                  ${
                    isSelected
                      ? "bg-[#0c0c0e] border-[#a16207]/50 shadow-inner"
                      : "bg-[#161619]/40 border-[#1f1f23]/60 hover:border-zinc-800"
                  }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-white tracking-tight truncate">
                      {aoi.name}
                    </p>
                    <p className="text-[9px] text-zinc-500 mt-0.5 truncate">
                      {aoi.type} • {aoi.size}
                    </p>
                    <p className="text-[9px] text-zinc-500 mt-0.5">
                      {aoi.vehicles} vehicles
                    </p>
                  </div>

                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-[8.5px] font-bold border
                      ${
                        isActive
                          ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30"
                          : "bg-[#FDBB24]/15 text-[#FDBB24] border-[#FDBB24]/30"
                      }`}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-[#27272a] px-4 py-10">
            <p className="text-[11px] text-[#71717a]">No AOIs found</p>
          </div>
        )}
      </div>
    </div>
  );
}
