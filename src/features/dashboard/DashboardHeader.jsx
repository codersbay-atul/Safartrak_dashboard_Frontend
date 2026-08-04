import React from "react";
import { Plus } from "lucide-react";
import PageHeader from "../../components/Ui/PageHeader";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";

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
      <HeaderActionButton icon={Plus} iconPosition="right" onClick={onAddVehicleClick} className="min-w-[120px]">
        Add Vehicle
      </HeaderActionButton>
    </PageHeader>
  );
}
