import { Download } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";
import MainDropDown from "../../components/Ui/MainLayoutUI/MainDropDown";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";
import MainSearchInput from "../../components/Ui/MainLayoutUI/MainSearchInput";

export default function AnalyticsHeader({
  title = "Analytics",
  subtitle = "Understand fleet usage, movement and operational performance.",
  searchPlaceholder = "Search Vehicle...",
  onSearch,
  onExportClick,
  selectedVehicleText = "All Vehicles (59)",
  onVehicleSelectClick,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 xl:gap-4 w-full select-none shrink-0 min-w-0">
      <MainLayoutHeader title={title} subtitle={subtitle} />
      <div className="flex items-center gap-2 xl:gap-2.5 w-full lg:w-auto shrink-0 justify-start sm:justify-end min-w-0 flex-wrap">
        <MainDropDown
          label={selectedVehicleText}
          options={[{ label: selectedVehicleText, value: selectedVehicleText }]}
          selectedValue={selectedVehicleText}
          onSelect={onVehicleSelectClick}
        />

        <MainSearchInput
          placeholder={searchPlaceholder}
          onChange={(event) => onSearch?.(event.target.value)}
          iconPosition="left"
          containerClassName="w-full min-w-0 sm:w-[180px]"
        />

        <MainHeaderActionButton icon={Download} iconPosition="right" onClick={onExportClick} className="min-w-[120px]">
          Export Data
        </MainHeaderActionButton>
      </div>
    </div>
  );
}
