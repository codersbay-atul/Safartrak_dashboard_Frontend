import { Upload, Plus } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

import { getVehiclesExport } from "../../services/vehicleService";
import { toast } from "../../components/Ui/toast";
import MainHeaderActionButton from "../../components/Ui/MainLayoutUI/MainHeaderActionButton";

export default function VehicleDetailsHeader({
  title = "Vehicles Details",
  subtitle = "View complete vehicle information, tracking device details, documents, trip history, and operational status.",
  onExportClick,
  onAddVehicleClick,
}) {
  const handleExport = async () => {
    try {
      if (onExportClick) {
        onExportClick();
        return;
      }

      const response = await getVehiclesExport({ tab: "all" });
      const disposition = response.headers?.["content-disposition"] || response.headers?.["Content-Disposition"];
      let filename = "vehicles_export";
      if (disposition) {
        const match = /filename\*?=([^;]+)/i.exec(disposition);
        if (match) {
          filename = match[1].replace(/UTF-8''/, "").replace(/"/g, "");
        }
      }

      const blob = new Blob([response.data], {
        type: response.data?.type || "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Export started");
    } catch (error) {
      console.error("Export failed", error);
      toast.error(error?.message || "Export failed");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 w-full shrink-0">
      <MainLayoutHeader title={title} subtitle={subtitle} />
    

      <MainHeaderActionButton icon={Upload} onClick={handleExport} className="min-w-[110px]">
        Export Data
      </MainHeaderActionButton>

      <MainHeaderActionButton icon={Plus} iconPosition="right" onClick={onAddVehicleClick} className="min-w-[120px]">
        Add Vehicle
      </MainHeaderActionButton>
    </div>
  );
}