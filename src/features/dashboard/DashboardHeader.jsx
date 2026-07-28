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
      <Button
        variant="primary"
        icon={Plus}
        iconPosition="right"
        onClick={onAddVehicleClick}
        className="!w-[170px] min-w-[170px] !h-[40px] !rounded-[8px] !bg-[#FFC107] hover:!bg-[#e6ac00] active:scale-[0.98] !text-black !font-normal !text-[16px] !px-[18px] !py-0 gap-2 whitespace-nowrap flex-nowrap flex-shrink-0 [&_svg]:size-[15px] [&_span]:!overflow-visible [&_span]:!max-w-none"
      >
        Add Vehicle
      </Button>
    </PageHeader>
  );
}
