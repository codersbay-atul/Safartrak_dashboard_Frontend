import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getAlerts } from "../services/alertsService";
import { mapAlertsList } from "../features/alerts/mapAlerts";

/**
 * React Query: GET /v1/alerts
 * @param {{ type?: string, from?: string, to?: string, severity?: string, search?: string, enabled?: boolean }} [params]
 */
export function useAlertsList({
  type,
  from,
  to,
  severity,
  search,
  enabled = true,
} = {}) {
  const lastErrorAtRef = useRef(null);
  const filters = { type, from, to, severity, search };

  const query = useQuery({
    queryKey: queryKeys.alerts.list(filters),
    queryFn: () => getAlerts(filters),
    enabled,
    staleTime: 15_000,
    gcTime: 5 * 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8_000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (!query.isError) return;
    if (lastErrorAtRef.current === query.errorUpdatedAt) return;
    lastErrorAtRef.current = query.errorUpdatedAt;
    console.error("Failed to load alerts list:", query.error);
  }, [query.isError, query.errorUpdatedAt, query.error]);

  const alerts = query.data ? mapAlertsList(query.data) : [];

  return {
    ...query,
    alerts,
    count: query.data?.count ?? alerts.length,
  };
}

export default useAlertsList;
