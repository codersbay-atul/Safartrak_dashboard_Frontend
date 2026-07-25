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
        icon={Plus}
        onClick={onAddVehicleClick}
        className="font-bold whitespace-nowrap text-[10px]"
      >
        <span>Add Vehicle</span>
      </Button>
    </PageHeader>
  );
}