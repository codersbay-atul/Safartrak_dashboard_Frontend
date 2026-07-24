import React from "react";
import SearchInput from "../../components/Ui/SearchInput";
import Dropdown from "../../components/Ui/DropDown";
import Button from "../../components/Ui/Button";
import { FLEET_OPTIONS, SEVERITY_OPTIONS } from "./alertsData";

export default function AlertsHeader({
  searchQuery = "",
  onSearchChange,
  fleetFilter = "all",
  onFleetChange,
  severityFilter = "all",
  onSeverityChange,
  onConfigClick,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 w-full select-none shrink-0">
      <div className="flex-1 min-w-0">
        <h1 className="text-[16px] sm:text-lg font-bold text-white tracking-tight leading-none">
          Alerts
        </h1>
        <p className="mt-1 text-[10px] text-[#a1a1aa] leading-normal max-w-2xl">
          Monitor fleet alerts, review severity, and manage configurations.
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

        <Dropdown
          label="All Severity"
          options={SEVERITY_OPTIONS}
          selectedValue={severityFilter}
          onSelect={onSeverityChange}
          className="rounded-xl bg-[#18181b] py-1.5"
        />

        <Button
          variant="primary"
          size="sm"
          onClick={onConfigClick}
          className="font-bold whitespace-nowrap rounded-md px-3 py-1.5 text-[10.5px] shadow-sm shadow-[#FDBB24]/15"
        >
          Configurations
        </Button>
      </div>
    </div>
  );
}
