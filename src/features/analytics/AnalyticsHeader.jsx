import React from "react";
import { ChevronDown, Download } from "lucide-react";
import PageHeader from "../../components/Ui/PageHeader";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";

export default function AnalyticsHeader({
  title = "Analytics",
  subtitle = "Understand fleet usage, movement and operational performance.",
  searchPlaceholder = "Search Vehicle...",
  onSearch,
  onExportClick,
  selectedVehicleText = "All Vehicles (59)",
  onVehicleSelectClick,
}) {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      searchPlaceholder={searchPlaceholder}
      onSearch={onSearch}
      showFilter={false}
      showExport={false}
    >
      <div className="relative flex-1 sm:flex-initial min-w-[180px]">
        <button
          type="button"
          onClick={onVehicleSelectClick}
          className="w-full sm:w-auto h-8 sm:h-9 px-3 flex items-center justify-between gap-2 text-[11px] sm:text-[12px] rounded-full bg-[#05070B] border border-[#22252B] text-[#d4d4d8] hover:border-[#FDBB24]/40 hover:text-white transition-colors cursor-pointer"
        >
          <span className="truncate">{selectedVehicleText}</span>
          <ChevronDown size={12} className="text-[#8B8D97] shrink-0" />
        </button>
      </div>

      <HeaderActionButton icon={Download} iconPosition="right" onClick={onExportClick} className="min-w-[120px]">
        Export Data
      </HeaderActionButton>
    </PageHeader>
  );
}
