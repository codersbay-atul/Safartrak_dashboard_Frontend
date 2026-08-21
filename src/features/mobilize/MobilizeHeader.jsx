import React from "react";
import { Plus } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

const FLEET_OPTIONS = [
  { label: "All Fleets", value: "all" },
  { label: "Mumbai Fleet", value: "mumbai" },
  { label: "Pune Fleet", value: "pune" },
  { label: "Nashik Fleet", value: "nashik" },
];

export default function MobilizeHeader({
  onSearch,
  fleetFilter = "all",
  onFleetChange,
  onHistoryClick,
}) {
  return (
    <MainLayoutHeader
      title="Mobilize / Immobilize"
      subtitle="Remotely control supported vehicles and monitor command execution."
      searchPlaceholder="Search Vehicle..."
      searchIconPosition="left"
      showExport={false}
      statusLabel="All Fleets"
      statusOptions={FLEET_OPTIONS}
      dateRangeOptions={null}
      regionOptions={null}
      onFilterChange={(filters) => onFleetChange?.(filters.status)}
      onSearch={onSearch}
      actionButtonLabel="Command History"
      actionButtonIcon={Plus}
      onActionClick={onHistoryClick}
    />
  );
}