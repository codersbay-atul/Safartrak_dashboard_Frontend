import React from "react";
import { Plus } from "lucide-react";
import SearchInput from "../../components/Ui/SearchInput";
import Dropdown from "../../components/Ui/DropDown";
import Button from "../../components/Ui/Button";
import {
  VEHICLE_OPTIONS,
  EVENT_OPTIONS,
  DRIVER_OPTIONS,
} from "./activityData";

export default function ActivityHeader({
  vehicleFilter = "all",
  onVehicleChange,
  eventFilter = "all",
  onEventChange,
  driverFilter = "all",
  onDriverChange,
  searchQuery = "",
  onSearchChange,
  onExportClick,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 w-full select-none shrink-0">
      <div className="flex-1 min-w-0">
        <h1 className="text-[16px] sm:text-lg font-bold text-white tracking-tight leading-none">
          Activity
        </h1>
        <p className="mt-1 text-[10px] text-[#a1a1aa] leading-normal max-w-2xl">
          Review historical trips, movement timeline, and vehicle events.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto shrink-0 justify-start sm:justify-end">
        <Dropdown
          label="Select Vehicle"
          options={VEHICLE_OPTIONS}
          selectedValue={vehicleFilter}
          onSelect={onVehicleChange}
          className="rounded-xl bg-[#18181b] py-1.5"
        />

        <Dropdown
          label="Select Event"
          options={EVENT_OPTIONS}
          selectedValue={eventFilter}
          onSelect={onEventChange}
          className="rounded-xl bg-[#18181b] py-1.5"
        />

        <Dropdown
          label="Select Driver"
          options={DRIVER_OPTIONS}
          selectedValue={driverFilter}
          onSelect={onDriverChange}
          className="rounded-xl bg-[#18181b] py-1.5"
        />

        <SearchInput
          placeholder="Search Vehicle..."
          value={searchQuery}
          onChange={onSearchChange}
          iconPosition="left"
          containerClassName="min-w-36 sm:min-w-44"
          className="sm:w-44 rounded-xl bg-[#18181b] py-1.5"
        />

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={onExportClick}
          className="font-bold whitespace-nowrap rounded-md px-3 py-1.5 text-[10.5px] shadow-sm shadow-[#FDBB24]/15"
        >
          Export
        </Button>
      </div>
    </div>
  );
}
