import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getAlertSummary } from "../services/alertsService";

/**
 * React Query: GET /v1/alerts/summary
 */
export function useAlertSummary() {
  const lastErrorAtRef = useRef(null);

  const query = useQuery({
    queryKey: queryKeys.alerts.summary,
    queryFn: getAlertSummary,
    staleTime: 30_000,
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
    console.error("Failed to load alert summary:", query.error);
  }, [query.isError, query.errorUpdatedAt, query.error]);

  return {
    ...query,
    summary: query.data ?? null,
  };
}

export default useAlertSummary;
