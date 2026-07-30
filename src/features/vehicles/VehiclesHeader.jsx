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
      
      <Button
        variant="secondary"
        size="sm"
        icon={Upload}
        iconPosition="left"
        onClick={onExportClick}
 className="!w-[120px] min-w-[130px] !h-[35px] !rounded-[8px] !bg-[#FFC107] hover:!bg-[#e6ac00] active:scale-[0.98] !text-black !font-normal !text-[16px] !px-[18px] !py-0 gap-2 whitespace-nowrap flex-nowrap flex-shrink-0 [&_svg]:size-[15px] [&_span]:!overflow-visible [&_span]:!max-w-none"
      >
        Export Data
      </Button>

      <Button
        variant="primary"
        size="sm"
        icon={Plus}
        iconPosition="right"
        onClick={onAddVehicleClick}
       className="!w-[120px] min-w-[130px] !h-[35px] !rounded-[8px] !bg-[#FFC107] hover:!bg-[#e6ac00] active:scale-[0.98] !text-black !font-normal !text-[16px] !px-[18px] !py-0 gap-2 whitespace-nowrap flex-nowrap flex-shrink-0 [&_svg]:size-[15px] [&_span]:!overflow-visible [&_span]:!max-w-none"
      >
        Add Vehicle
      </Button>
    </PageHeader>
  );
}