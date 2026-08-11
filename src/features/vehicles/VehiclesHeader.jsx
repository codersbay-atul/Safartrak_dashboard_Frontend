import React from "react";
import { Download, Upload, Plus } from "lucide-react";
import PageHeader from "../../components/Ui/PageHeader";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";

export default function VehiclesHeader({
  title = "Vehicles",
  subtitle = "Manage fleet vehicles, GPS devices, assignments, and tracking status.",
  onImportClick,
  onExportClick,
  onAddVehicleClick,
}) {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      showSearch={false}
      showFilters={false}
      showExport={false}
    >
      {/* 1. Import Data Button (Secondary) */}
      <HeaderActionButton icon={Download} onClick={onImportClick} variant="secondary" className="min-w-[110px]">
        Import Data
      </HeaderActionButton>

      <HeaderActionButton icon={Upload} onClick={onExportClick} className="min-w-[110px]">
        Export Data
      </HeaderActionButton>

      <HeaderActionButton icon={Plus} iconPosition="right" onClick={onAddVehicleClick} className="min-w-[120px]">
        Add Vehicle
      </HeaderActionButton>
    </PageHeader>
  );
}