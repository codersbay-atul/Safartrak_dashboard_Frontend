import React from "react";
import { Plus } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

export default function AssignVehicleHeader({
  title = "Trips",
  subtitle = "Assign trips to vehicles and drivers, and manage existing trip assignments.",
  onAssignVehicle,
}) {
  return (
    <MainLayoutHeader
      title={title}
      subtitle={subtitle}
      showSearch={false}
      showExport={false}
      showFilters={false}
      actionButtons={[
        {
          label: "Schedule Trip",
          icon: Plus,
          iconPosition: "right",
          onClick: onAssignVehicle,
          className: "min-w-[140px]",
        },
      ]}
    />
  );
}
