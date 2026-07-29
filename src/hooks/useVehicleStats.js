import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getVehicleStats } from "../services/vehicleService";

export function useVehicleStats(uniqueId) {
  const resolvedId =
    typeof uniqueId === "string"
      ? uniqueId
      : uniqueId?.statsId ?? uniqueId?.id ?? uniqueId?.raw?.unique_id ?? uniqueId?.raw?.uniqueId ?? uniqueId?.raw?.id ?? null;

  const query = useQuery({
    queryKey: [...queryKeys.vehicles.all, "stats", resolvedId],
    queryFn: () => getVehicleStats(uniqueId),
    enabled: !!resolvedId,
    staleTime: 10_000,
    retry: 2,
    refetchInterval: 15_000,
    refetchIntervalInBackground: true,
  });

  return {
    ...query,
    stats: query.data ?? null,
  };
}

export default useVehicleStats;
