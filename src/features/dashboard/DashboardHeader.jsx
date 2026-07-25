import React from "react";
import { Plus } from "lucide-react";
import PageHeader from "../../components/Ui/PageHeader";
import Button from "../../components/Ui/Button";



export default function DashboardHeader({
  userName = "Atul",
  onSearch,
  onFilterClick,
  onExportClick,
  onAddVehicleClick,
}) {
  return (
    <PageHeader
      title={`Good Morning, ${userName}`}
      subtitle="Monitor vehicle locations, movement and fleet status in real time."
      searchPlaceholder="Search"
      onSearch={onSearch}
      onFilterClick={onFilterClick}
      onExportClick={onExportClick}
    >
      {/* Primary Action Button passed as children */}
      <Button
        variant="primary"
        size="sm"
        onClick={onAddVehicleClick}
        className="font-bold whitespace-nowrap flex-nowrap !text-[15px] !h-7 !px-4 !py-0 min-w-fit"
      >
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap flex-nowrap">
          <Plus size={15} className="shrink-0" />
          <span className="whitespace-nowrap">Add Vehicle</span>
        </span>
      </Button>
    </PageHeader>
  );
}
