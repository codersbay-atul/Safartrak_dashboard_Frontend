import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getTripSchedulesList, getTripSchedulesSummary } from "../services/tripSchedulesService";

export function useTripSchedulesList() {
  const query = useQuery({
    queryKey: queryKeys.tripSchedules.list(),
    queryFn: () => getTripSchedulesList(),
    staleTime: 15_000,
    gcTime: 5 * 60_000,
    retry: 2,
    refetchOnWindowFocus: true,
    refetchInterval: 30_000,
  });

  return {
    ...query,
    trips: Array.isArray(query.data?.trips) ? query.data.trips : [],
    total: query.data?.total ?? 0,
  };
}

export function useTripSchedulesSummary() {
  const query = useQuery({
    queryKey: queryKeys.tripSchedules.summary,
    queryFn: getTripSchedulesSummary,
    staleTime: 15_000,
    gcTime: 5 * 60_000,
    retry: 2,
    refetchOnWindowFocus: true,
    refetchInterval: 30_000,
  });

  return {
    ...query,
    summary: query.data ?? { tripCount: 0, totalKm: 0, tempCompliancePct: "100%" },
  };
}
