import React from "react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

export default function CommandHistoryHeader({
  title = "Command History",
  subtitle = "Remotely control supported vehicles and monitor command execution.",
  commandOptions = [],
  selectedCommand = "All commands",
  onCommandChange,
  statusOptions = [],
  selectedStatus = "All Status",
  onStatusChange,
  searchTerm = "",
  onSearchChange,
}) {
  const handleFilterChange = (filters) => {
    if (filters.region !== undefined) {
      onCommandChange?.(filters.region);
    }
    if (filters.status !== undefined) {
      onStatusChange?.(filters.status);
    }
  };

  return (
    <MainLayoutHeader
      title={title}
      subtitle={subtitle}
      searchPlaceholder="Search Vehicle..."
      searchIconPosition="left"
      showExport={false}
      regionLabel="All commands"
      regionOptions={commandOptions}
      statusLabel="All Status"
      statusOptions={statusOptions}
      dateRangeOptions={null}
      onFilterChange={handleFilterChange}
      onSearch={onSearchChange}
    />
  );
}