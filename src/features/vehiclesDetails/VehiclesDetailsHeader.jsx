import React from "react";
import { Download, Upload, Plus } from "lucide-react";
import Button from "../../components/Ui/Button";
import PageHeader from "../../components/Ui/PageHeader";
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
      showFilter={false}
      showExport={false}
    >
    

      <Button
        variant="secondary"
        size="sm"
        icon={Upload}
        iconPosition="left"
        onClick={handleExport}
        className="px-3 py-1.5 text-[10.5px]"
      >
        Export Data
      </Button>

      <Button
        variant="primary"
        size="sm"
        icon={Plus}
        iconPosition="right"
        onClick={onAddVehicleClick}
        className="font-bold whitespace-nowrap px-3 py-1.5 text-[10.5px]"
      >
        Add Vehicle
      </Button>
    </PageHeader>
  );
}