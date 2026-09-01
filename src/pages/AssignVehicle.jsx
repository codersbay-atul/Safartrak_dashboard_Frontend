import React, { useMemo, useState } from "react";
import { ClipboardCheck, Truck, User, CircleDot, Clock, Calendar, Thermometer } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import AssignVehicleHeader from "../features/assignVehicle/assignVehicleHeader";
import AssignVehicleStats from "../features/assignVehicle/AssignVehicleStats";
import AssignVehicleTable from "../features/assignVehicle/AssignVehicleTable";
import AssignVehicleFormSlider from "../features/assignVehicle/AssignVehicleFormSlider";
import TableSlider from "../components/Ui/MainLayoutUI/TableSlider";
import { ASSIGN_VEHICLE_TRIPS_DUMMY } from "../features/assignVehicle/assignVehicleData";

export default function AssignVehicle() {
  const [isTableHelpOpen, setIsTableHelpOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  const summary = {
    tripCount: 10,
    totalKm: 1000,
    tempCompliancePct: "100%",
  };
  const isLoading = false;
  const trips = ASSIGN_VEHICLE_TRIPS_DUMMY;

  const TRIP_HELP_ITEMS = useMemo(
    () => [
      {
        icon: ClipboardCheck,
        header: "Trip ID",
        content:
          "Unique trip identifier in YYMMDD + SFT + sequence format. Example: 260731SFT0001. You can copy it using the copy icon.",
      },
      {
        icon: Truck,
        header: "Vehicle Number",
        content: "The registered number of the vehicle assigned to this trip.",
      },
      {
        icon: User,
        header: "Driver",
        content: "The driver assigned to complete this trip.",
      },
      {
        icon: CircleDot,
        header: "Status",
        content: "Shows the current state of the trip assignment.",
        statuses: [
          { status: "Upcoming", content: "Trip is scheduled and has not started." },
          { status: "Ongoing", content: "Trip is currently in progress." },
          { status: "Delivered", content: "Trip has been completed successfully." },
          { status: "Expired", content: "Trip window has passed without completion." },
        ],
      },
      {
        icon: Clock,
        header: "Pickup Date & Time",
        content: "The scheduled pickup date and time for this trip.",
      },
      {
        icon: Calendar,
        header: "Delivery Date & Time",
        content: "The planned delivery date and time for this trip.",
      },
      {
        icon: Thermometer,
        header: "Temp Abuse",
        content:
          "Shows whether the temperature went outside the allowed range during the trip.",
      },
    ],
    [],
  );

  return (
    <MainLayout InactiveTab="Trip Schedules" allowPageScroll>
      <div className="flex-1 flex flex-col gap-4 xl:gap-5 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden no-scrollbar pr-0.5">
        <div className="shrink-0">
          <AssignVehicleHeader onAssignVehicle={() => setIsAssignOpen(true)} />
        </div>

        <div className="shrink-0">
          <AssignVehicleStats summary={summary} isLoading={isLoading} />
        </div>

        <div className="shrink-0 w-full overflow-visible">
          <TableSlider
            isOpen={isTableHelpOpen}
            onOpen={() => setIsTableHelpOpen(true)}
            onClose={() => setIsTableHelpOpen(false)}
            items={TRIP_HELP_ITEMS}
          />
          <AssignVehicleTable
            trips={trips}
            isLoading={isLoading}
            onHelpClick={() => setIsTableHelpOpen(true)}
          />
        </div>
      </div>

      <AssignVehicleFormSlider
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
      />
    </MainLayout>
  );
}
