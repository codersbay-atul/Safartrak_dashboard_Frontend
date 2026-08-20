import { Download, Upload, Plus } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";


export default function VehiclesHeader({
  title = "Vehicles",
  subtitle = "Manage fleet vehicles, GPS devices, assignments, and tracking status.",
  onImportClick,
  onExportClick,
  onAddVehicleClick,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 w-full shrink-0">
      <MainLayoutHeader title={title} subtitle={subtitle} />
    
      <MainHeaderActionButton icon={Download} onClick={onImportClick} variant="secondary" className="min-w-[110px]">
        Import Data
      </MainHeaderActionButton>

      <MainHeaderActionButton icon={Upload} onClick={onExportClick} className="min-w-[110px]">
        Export Data
      </MainHeaderActionButton>

      <MainHeaderActionButton icon={Plus} iconPosition="right" onClick={onAddVehicleClick} className="min-w-[120px]">
        Add Vehicle
      </MainHeaderActionButton>
    </div>
  );
}