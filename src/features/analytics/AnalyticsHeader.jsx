import React from "react";
import { ChevronDown, Download } from "lucide-react";
import Button from "../../components/Ui/Button";
import PageHeader from "../../components/Ui/PageHeader";


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
      {/* 1. Vehicle Dropdown Button */}
      <div className="relative flex-1 sm:flex-initial">
        <button
          type="button"
          onClick={onVehicleSelectClick}
          className="w-full sm:w-auto flex items-center justify-between gap-4 px-3 py-1 text-[10.5px] rounded-2xl bg-[#18181b]/40 border border-[#27272a] text-[#d4d4d8] hover:border-zinc-600 transition-colors cursor-pointer"
        >
          <span>{selectedVehicleText}</span>
          <ChevronDown size={12} className="text-[#71717a]" />
        </button>
      </div>

      {/* 2. Main Action Button: Export Data */}
     <Button
  variant="primary"
  size="sm"
  icon={Download}
  iconPosition="right"
  onClick={onExportClick}
  className="font-bold whitespace-nowrap"
>
  Export Data
</Button>
    </PageHeader>
  );
}