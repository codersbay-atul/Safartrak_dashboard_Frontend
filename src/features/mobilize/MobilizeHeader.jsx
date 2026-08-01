import React from "react";
import { Plus } from "lucide-react";
import SearchInput from "../../components/Ui/SearchInput";
import Dropdown from "../../components/Ui/DropDown";
import Button from "../../components/Ui/Button";
import { FLEET_OPTIONS } from "./mobilizeData";

export default function MobilizeHeader({
  searchQuery = "",
  onSearchChange,
  fleetFilter = "all",
  onFleetChange,
  onHistoryClick,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 w-full select-none shrink-0">
      <div className="flex-1 min-w-0">
        <h1 className="text-[16px] sm:text-lg font-bold text-white tracking-tight leading-none">
          Mobilize / Immobilize
        </h1>
        <p className="mt-1 text-[10px] text-[#a1a1aa] leading-normal max-w-2xl">
          Remotely control supported vehicles and monitor command execution.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-start sm:justify-end">
        <SearchInput
          placeholder="Search Vehicle..."
          value={searchQuery}
          onChange={onSearchChange}
          iconPosition="left"
          containerClassName="min-w-40 sm:min-w-48"
          className="sm:w-52 rounded-xl bg-[#18181b] py-1.5"
        />

        <Dropdown
          label="All Fleets"
          options={FLEET_OPTIONS}
          selectedValue={fleetFilter}
          onSelect={onFleetChange}
          className="rounded-xl bg-[#18181b] py-1.5"
        />

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          iconPosition="right"
          onClick={onHistoryClick}
          className="!w-[170px] min-w-[170px] !h-[35px] !rounded-[8px] !bg-[#FFC107] hover:!bg-[#e6ac00] active:scale-[0.98] !text-black !font-normal !text-[16px] !px-[18px] !py-0 gap-2 whitespace-nowrap flex-nowrap flex-shrink-0 [&_svg]:size-[15px] [&_span]:!overflow-visible [&_span]:!max-w-none"
        >
          Command History
        </Button>
      </div>
    </div>
  );
}
