import React from "react";
import PageHeader from "../../components/Ui/PageHeader";

export default function TripReportHeader({
  onExportClick,
  onFilterChange,
}) {
  return (
    <PageHeader
      title="Trip Report"
      subtitle="Generate and review trip activity for selected vehicles and date ranges."
      showSearch={false}
      showFilters={false}
      showExport={false}
    />
  );
}