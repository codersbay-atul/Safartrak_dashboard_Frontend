import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getAlertTypes } from "../services/alertsService";
import { mapAlertTypes } from "../features/alerts/mapAlerts";

/**
 * React Query: GET /v1/alerts/types
 */
export function useAlertTypes() {
  const lastErrorAtRef = useRef(null);

  const query = useQuery({
    queryKey: queryKeys.alerts.types,
    queryFn: getAlertTypes,
    staleTime: 60_000,
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
    console.error("Failed to load alert types:", query.error);
  }, [query.isError, query.errorUpdatedAt, query.error]);

  const types = query.data ? mapAlertTypes(query.data) : [];

  return {
    ...query,
    types,
  };
}

export default useAlertTypes;
