import React from "react";
import { Download, Upload, Plus } from "lucide-react";
import Button from "../../components/Ui/Button";
import PageHeader from "../../components/Ui/PageHeader";

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
      showFilter={false}
      showExport={false}
    >
      {/* 1. Import Data Button (Secondary) */}
      <Button
        variant="secondary"
        size="sm"
        icon={Download}
        iconPosition="left"
        onClick={onImportClick}
        className="px-3 py-1.5 text-[10.5px]"
      >
        Import Data
      </Button>

      {/* 2. Export Data Button (Secondary) */}
      <Button
        variant="secondary"
        size="sm"
        icon={Upload}
        iconPosition="left"
        onClick={onExportClick}
        className="px-3 py-1.5 text-[10.5px]"
      >
        Export Data
      </Button>

      {/* 3. Add Vehicle Button (Primary Peela) */}
      <Button
        variant="primary"
        size="sm"
        icon={Plus}
        iconPosition="right"
        onClick={onAddVehicleClick}
        className="font-bold whitespace-nowrap px-3 py-1.5 text-[10.5px]"
      >
        Add Vehicle
      </Button>
    </PageHeader>
  );
}