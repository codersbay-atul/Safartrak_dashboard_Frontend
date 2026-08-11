import React from "react";
import { Upload, Plus } from "lucide-react";
import PageHeader from "../../components/Ui/PageHeader";
import HeaderActionButton from "../../components/Ui/HeaderActionButton";
import { getVehiclesExport } from "../../services/vehicleService";
import { toast } from "../../components/Ui/toast";

export default function VehicleDetailsHeader({
  title = "Vehicles Details",
  subtitle = "View complete vehicle information, tracking device details, documents, trip history, and operational status.",
  onImportClick,
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
    <PageHeader
      title={title}
      subtitle={subtitle}
      showSearch={false}
      showFilters={false}
      showExport={false}
    >
    

      <HeaderActionButton icon={Upload} onClick={onExportClick} className="min-w-[110px]">
        Export Data
      </HeaderActionButton>

      <HeaderActionButton icon={Plus} iconPosition="right" onClick={onAddVehicleClick} className="min-w-[120px]">
        Add Vehicle
      </HeaderActionButton>
    </PageHeader>
  );
}