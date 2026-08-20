import { Plus } from "lucide-react";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";
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
      <MainLayoutHeader
        title="Activity"
        subtitle="Review historical trips, movement timeline, and vehicle events."
      />

      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto shrink-0 justify-start sm:justify-end">
        <MainDropDown
          label="Select Vehicle"
          options={VEHICLE_OPTIONS}
          selectedValue={vehicleFilter}
          onSelect={onVehicleChange}
          className="rounded-xl bg-[#18181b] py-1.5"
        />

        <MainDropDown
          label="Select Event"
          options={EVENT_OPTIONS}
          selectedValue={eventFilter}
          onSelect={onEventChange}
          className="rounded-xl bg-[#18181b] py-1.5"
        />

        <MainDropDown
          label="Select Driver"
          options={DRIVER_OPTIONS}
          selectedValue={driverFilter}
          onSelect={onDriverChange}
          className="rounded-xl bg-[#18181b] py-1.5"
        />

        <MainSearchInput
          placeholder="Search Vehicle..."
          value={searchQuery}
          onChange={onSearchChange}
          iconPosition="left"
          containerClassName="min-w-36 sm:min-w-44"
          className="sm:w-44 rounded-xl bg-[#18181b] py-1.5"
        />

        <MainHeaderActionButton icon={Plus} onClick={onExportClick}>
          Export
        </MainHeaderActionButton>
      </div>
    </div>
  );
}
