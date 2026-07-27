import React from "react";
import { Download, Upload, Plus } from "lucide-react";
import Button from "../../components/Ui/Button";
import PageHeader from "../../components/Ui/PageHeader";

export default function VehicleDetailsHeader({
  title = "Vehicles Details",
  subtitle = "View complete vehicle information, tracking device details, documents, trip history, and operational status.",
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