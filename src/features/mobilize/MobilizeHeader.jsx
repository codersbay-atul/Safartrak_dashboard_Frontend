import React from "react";
import { Plus } from "lucide-react";
import PageHeader from "../../components/Ui/PageHeader";
import Dropdown from "../../components/Ui/DropDown";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";

const FLEET_OPTIONS = [
  { label: "All Fleets", value: "all" },
  { label: "Mumbai Fleet", value: "mumbai" },
  { label: "Pune Fleet", value: "pune" },
  { label: "Nashik Fleet", value: "nashik" },
];

export default function MobilizeHeader({
  onSearch,
  fleetFilter = "all",
  onFleetChange,
  onHistoryClick,
}) {
  return (
    <PageHeader
      title="Mobilize / Immobilize"
      subtitle="Remotely control supported vehicles and monitor command execution."
      searchPlaceholder="Search Vehicle..."
      onSearch={onSearch}
      showFilters={false}
      showExport={false}
    >
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-start sm:justify-end">
        <Dropdown
          label="All Fleets"
          options={FLEET_OPTIONS}
          selectedValue={fleetFilter}
          onSelect={onFleetChange}
          className="rounded-xl bg-[#18181b] py-1.5"
        />

        <HeaderActionButton
          icon={Plus}
          iconPosition="right"
          onClick={onHistoryClick}
          className="min-w-[170px]"
        >
          Command History
        </HeaderActionButton>
      </div>
    </PageHeader>
  );
}
