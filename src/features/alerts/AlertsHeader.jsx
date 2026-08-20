import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";
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
      <MainLayoutHeader
        title="Alerts"
        subtitle="Monitor fleet alerts, review severity, and manage configurations."
      />

      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-start sm:justify-end">
        <MainSearchInput
          placeholder="Search Vehicle..."
          value={searchQuery}
          onChange={onSearchChange}
          iconPosition="left"
          containerClassName="min-w-40 sm:min-w-48"
          className="sm:w-52 rounded-xl bg-[#18181b] py-1.5"
        />

        <MainDropDown
          label="All Fleets"
          options={FLEET_OPTIONS}
          selectedValue={fleetFilter}
          onSelect={onFleetChange}
          className="rounded-xl bg-[#18181b] py-1.5"
        />

        <MainDropDown
          label="All Severity"
          options={SEVERITY_OPTIONS}
          selectedValue={severityFilter}
          onSelect={onSeverityChange}
          className="rounded-xl bg-[#18181b] py-1.5"
        />

        <MainHeaderActionButton onClick={onConfigClick} className="min-w-[130px]">
          Configurations
        </MainHeaderActionButton>
      </div>
    </div>
  );
}
