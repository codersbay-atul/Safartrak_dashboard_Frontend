import React, { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MainLayout from "../layouts/MainLayout";
import AssignVehicleHeader from "../features/assignVehicle/assignVehicleHeader";
import AssignVehicleStats from "../features/assignVehicle/AssignVehicleStats";
import AssignVehicleTable from "../features/assignVehicle/AssignVehicleTable";
import AssignVehicleFormSlider from "../features/assignVehicle/AssignVehicleFormSlider";
import { ASSIGN_VEHICLE_OPTIONS } from "../features/assignVehicle/assignVehicleData";
import { useTripSchedulesList, useTripSchedulesSummary } from "../hooks/useTripSchedules";
import { useVehiclesList } from "../hooks/useVehiclesList";
import { createTripSchedule } from "../services/tripSchedulesService";
import { toast } from "../components/Ui/toast";

export default function AssignVehicle() {
  const queryClient = useQueryClient();
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const { trips, isLoading, isError, error } = useTripSchedulesList();
  const { summary, isLoading: summaryLoading } = useTripSchedulesSummary();
  const { vehicles } = useVehiclesList({ page: 1, limit: 200, status: "all" });

  const vehicleOptions = useMemo(() => {
    const fromApi = (vehicles || [])
      .map((vehicle) => {
        const value = String(
          vehicle.vehicleNumber || vehicle.reg_no || vehicle.externalDeviceId || vehicle.unique_id || ""
        ).trim();
        if (!value) return null;
        return { label: value, value };
      })
      .filter(Boolean);

    return fromApi.length ? fromApi : ASSIGN_VEHICLE_OPTIONS;
  }, [vehicles]);

  const createMutation = useMutation({
    mutationFn: createTripSchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["trip-schedules-list"] });
      await queryClient.invalidateQueries({ queryKey: ["trip-schedules-summary"] });
      toast.success("Trip scheduled");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to schedule trip");
    },
  });

  return (
    <MainLayout InactiveTab="Trip Schedules" allowPageScroll>
      <div className="flex-1 flex flex-col gap-4 xl:gap-5 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden no-scrollbar pr-0.5">
        <div className="shrink-0">
          <AssignVehicleHeader onAssignVehicle={() => setIsAssignOpen(true)} />
        </div>

        <div className="shrink-0">
          <AssignVehicleStats summary={summary} isLoading={summaryLoading} />
        </div>

        <div className="shrink-0 w-full overflow-visible">
          <AssignVehicleTable
            trips={trips}
            isLoading={isLoading}
            onHelpClick={() => {}}
          />
          {isError ? (
            <p className="mt-2 text-[12px] text-[#F87171]">
              {error?.message || "Failed to load trip schedules"}
            </p>
          ) : null}
        </div>
      </div>

      <AssignVehicleFormSlider
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        vehicleOptions={vehicleOptions}
        onSubmit={(payload) => createMutation.mutateAsync(payload)}
      />
    </MainLayout>
  );
}
