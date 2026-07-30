import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getAnalyticsSummary } from "../services/analyticsService";
import { mapAnalyticsSummary } from "../features/analytics/mapAnalyticsSummary";

/**
 * React Query: GET /v1/analytics/summary?range={range}
 */
export function useAnalyticsSummary(range = "24h") {
  const query = useQuery({
    queryKey: queryKeys.analytics.summary(range),
    queryFn: () => getAnalyticsSummary({ range }),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8_000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const summary = query.data ? mapAnalyticsSummary(query.data) : null;

  return {
    ...query,
    summary,
  };
}

export default useAnalyticsSummary;
