import { Plus } from "lucide-react";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";

import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

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
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 w-full select-none shrink-0 min-w-0">
      <MainLayoutHeader
        title="Mobilize / Immobilize"
        subtitle="Remotely control supported vehicles and monitor command execution."
      />
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-start sm:justify-end">
        <MainDropDown
          label="All Fleets"
          options={FLEET_OPTIONS}
          selectedValue={fleetFilter}
          onSelect={onFleetChange}
          className="rounded-xl bg-[#18181b] py-1.5"
        />

        <MainSearchInput
          placeholder="Search Vehicle..."
          onChange={(event) => onSearch?.(event.target.value)}
          iconPosition="left"
          containerClassName="min-w-40 sm:min-w-48"
          className="rounded-xl bg-[#18181b] py-1.5"
        />

        <MainHeaderActionButton
          icon={Plus}
          iconPosition="right"
          onClick={onHistoryClick}
          className="min-w-[170px]"
        >
          Command History
        </MainHeaderActionButton>
      </div>
    </div>
  );
}
