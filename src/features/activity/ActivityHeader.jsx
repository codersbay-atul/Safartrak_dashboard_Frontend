import React from "react";
import { Plus } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";
import {
  VEHICLE_OPTIONS,
  EVENT_OPTIONS,
  DRIVER_OPTIONS,
} from "./activityData";

export default function ActivityHeader({
  vehicleFilter = "",
  onVehicleChange,
  eventFilter = "",
  onEventChange,
  driverFilter = "",
  onDriverChange,
  searchQuery = "",
  onSearchChange,
  onExportClick,
}) {
  const handleFilterChange = (filters) => {
    if (filters.dateRange !== undefined) {
      onVehicleChange?.(filters.dateRange);
    }
    if (filters.region !== undefined) {
      onEventChange?.(filters.region);
    }
    if (filters.status !== undefined) {
      onDriverChange?.(filters.status);
    }
  };

  return (
    <MainLayoutHeader
      title="Activity"
      subtitle="Review historical trips, movement timeline, and vehicle events."
      searchPlaceholder="Search Vehicle..."
      searchIconPosition="left"
      showExport={false}
      dateRangeLabel="Select Vehicle"
      dateRangeOptions={VEHICLE_OPTIONS}
      regionLabel="Select Event"
      regionOptions={EVENT_OPTIONS}
      statusLabel="Select Driver"
      statusOptions={DRIVER_OPTIONS}
      onFilterChange={handleFilterChange}
      onSearch={onSearchChange}
      actionButtonLabel="Export"
      actionButtonIcon={Plus}
      onActionClick={onExportClick}
    />
  );
}