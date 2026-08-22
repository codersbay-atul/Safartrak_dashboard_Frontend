import React from "react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";
import { FLEET_OPTIONS, SEVERITY_OPTIONS } from "./alertsData";

export default function AlertsHeader({
  searchQuery = "",
  onSearchChange,
  fleetFilter = "all",
  onFleetChange,
  severityFilter = "all",
  onSeverityChange,
  onConfigClick,
}) {
  const handleFilterChange = (filters) => {
    if (filters.region !== undefined) {
      onFleetChange?.(filters.region);
    }
    if (filters.status !== undefined) {
      onSeverityChange?.(filters.status);
    }
  };

  return (
    <MainLayoutHeader
      title="Alerts"
      subtitle="Monitor fleet alerts, review severity, and manage configurations."
      searchPlaceholder="Search Vehicle..."
      searchIconPosition="left"
      showExport={false}
      regionOptions={FLEET_OPTIONS}
      statusLabel="All Severity"
      statusOptions={SEVERITY_OPTIONS}
      dateRangeOptions={null}
      onFilterChange={handleFilterChange}
      onSearch={onSearchChange}
      actionButtonLabel="Configurations"
      onActionClick={onConfigClick}
      actionButtonClassName="w-full sm:w-auto min-w-0 sm:min-w-[130px]"
      className="gap-2.5"
    />
  );
}