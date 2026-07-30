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
        onClick={onExportClick}
         className="!w-[120px] min-w-[130px] !h-[35px] !rounded-[8px] !bg-[#FFC107] hover:!bg-[#e6ac00] active:scale-[0.98] !text-black !font-normal !text-[16px] !px-[18px] !py-0 gap-2 whitespace-nowrap flex-nowrap flex-shrink-0 [&_svg]:size-[15px] [&_span]:!overflow-visible [&_span]:!max-w-none"
      >
        Export Data
      </Button>

      <Button
        variant="primary"
        size="sm"
        icon={Plus}
        iconPosition="right"
        onClick={onAddVehicleClick}
    className="!w-[120px] min-w-[130px] !h-[35px] !rounded-[8px] !bg-[#FFC107] hover:!bg-[#e6ac00] active:scale-[0.98] !text-black !font-normal !text-[16px] !px-[18px] !py-0 gap-2 whitespace-nowrap flex-nowrap flex-shrink-0 [&_svg]:size-[15px] [&_span]:!overflow-visible [&_span]:!max-w-none"
      >
        Add Vehicle
      </Button>
    </PageHeader>
  );
}