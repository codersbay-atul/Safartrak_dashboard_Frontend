import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getVehiclesList } from "../services/vehicleService";
import {
  mapVehicleFilterCounts,
  mapVehiclesList,
} from "../features/dashboard/mapVehiclesList";

/**
 * React Query: fetch / cache vehicles list (GET /v1/vehicles).
 * Auth token is attached by the shared axios interceptor.
 */
export function useVehiclesList({
  search = "",
  page = 1,
  pageSize = 25,
  tab = "all",
  fleetGroup = "",
  vehicleType = "",
  trackingStatus = "",
} = {}) {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(String(search ?? "").trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const query = useQuery({
    queryKey: queryKeys.vehicles.list({
      search: debouncedSearch,
      page,
      pageSize,
      tab,
      fleetGroup,
      vehicleType,
      trackingStatus,
    }),
    queryFn: () =>
      getVehiclesList({
        search: debouncedSearch,
        page,
        page_size: pageSize,
        tab,
        fleet: fleetGroup,
        type: vehicleType,
        tracking_status: trackingStatus,
      }),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8_000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (!query.isError) return;
    console.error("[vehicles] Failed to load vehicles list:", query.error);
  }, [query.isError, query.error]);

  const mapped = query.data ? mapVehiclesList(query.data) : null;
  const vehicles = mapped?.vehicles ?? [];
  const filterCounts = mapVehicleFilterCounts(
    mapped?.counts,
    mapped?.total ?? query.data?.total
  );

  return {
    ...query,
    vehicles,
    counts: mapped?.counts ?? {},
    filterCounts,
    total: mapped?.total ?? 0,
    page: mapped?.page ?? page,
    pageSize: mapped?.pageSize ?? pageSize,
  };
}

export default useVehiclesList;
