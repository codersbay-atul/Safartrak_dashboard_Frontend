import React from "react";
import { Download } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

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
    <MainLayoutHeader
      title={title}
      subtitle={subtitle}
      searchPlaceholder={searchPlaceholder}
      searchIconPosition="left"
      showExport={false}
      actionButtonLabel="Export Data"
      actionButtonIcon={Download}
      onActionClick={onExportClick}
      onSearch={onSearch}
      onFilterChange={(filters) => onVehicleSelectClick?.(filters.status)}
      statusLabel={selectedVehicleText}
      statusOptions={[{ label: selectedVehicleText, value: selectedVehicleText }]}
      dateRangeOptions={null}
      regionOptions={null}
    />
  );
}