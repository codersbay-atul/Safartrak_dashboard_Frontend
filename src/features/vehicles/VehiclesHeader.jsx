import React from "react";
import { Download, Upload, Plus } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

export default function VehiclesHeader({
  title = "Vehicles",
  subtitle = "Manage fleet vehicles, GPS devices, assignments, and tracking status.",
  onImportClick,
  onExportClick,
  onAddVehicleClick,
}) {
  return (
    <MainLayoutHeader
      title={title}
      subtitle={subtitle}
      showSearch={false}
      showExport={false}
      showFilters={false}
      actionButtons={[
        // {
        //   label: "Import Data",
        //   icon: Download,
        //   iconPosition: "left",
        //   onClick: onImportClick,
        //   variant: "secondary",
        //   className: "min-w-[110px]",
        // },
        {
          label: "Export Data",
          icon: Upload,
          iconPosition: "left",
          onClick: onExportClick,
          className: "min-w-[110px]",
        },
        {
          label: "Add Vehicle",
          icon: Plus,
          iconPosition: "right",
          onClick: onAddVehicleClick,
          className: "min-w-[120px]",
        },
      ]}
    />
  );
}