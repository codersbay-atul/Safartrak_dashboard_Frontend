import React from "react";
import { Plus } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

export default function ReportsHeader({
  searchQuery = "",
  onSearchChange,
  onCreateClick,
}) {
  return (
    <MainLayoutHeader
      title="Reports"
      subtitle="Generate, review and export fleet operational reports."
      searchPlaceholder="Search Report"
      searchIconPosition="left"
      showFilters={false}
      showExport={false}
      onSearch={(val) => onSearchChange?.({ target: { value: val } })}
      actionButtonLabel="Create Custom Report"
      actionButtonIcon={Plus}
      onActionClick={onCreateClick}
    />
  );
}