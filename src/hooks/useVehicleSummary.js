import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getVehiclesSummary } from "../services/vehicleService";
import { mapVehicleSummary } from "../features/vehicles/mapVehicleSummary";

export function useVehicleSummary() {
  const query = useQuery({
    queryKey: [...queryKeys.vehicles.all, "summary"],
    queryFn: getVehiclesSummary,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8_000),
    // Poll for live KPIs every 15s. Adjust as needed for load/real-timeness.
    refetchInterval: 15_000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    ...query,
    summary: query.data ? mapVehicleSummary(query.data) : null,
  };
}

export default useVehicleSummary;
