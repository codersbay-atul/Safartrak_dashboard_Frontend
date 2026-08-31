import React from "react";
import { Plus } from "lucide-react";
import MainLayoutHeader from "../../components/Ui/MainLayoutUI/MainLayoutHeader";

export default function AssignVehicleHeader({
  title = "Assign Vehicles",
  subtitle = "Assign and manage vehicles routes and assignments",
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
          label: "Assign Vehicle",
          icon: Plus,
          iconPosition: "right",
          onClick: onAssignVehicle,
          className: "min-w-[140px]",
        },
      ]}
    />
  );
}
