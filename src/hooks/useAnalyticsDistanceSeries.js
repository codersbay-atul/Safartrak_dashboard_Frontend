import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getAnalyticsDistanceSeries } from "../services/analyticsService";

/**
 * Normalize a single series point into { label, value }.
 */
export function mapSeriesPoint(point, index = 0) {
  if (point == null) return null;

  if (Array.isArray(point)) {
    const [labelOrTs, value] = point;
    const num = Number(value);
    if (!Number.isFinite(num)) return null;
    return {
      label: labelOrTs != null ? String(labelOrTs) : String(index + 1),
      value: num,
    };
  }

  if (typeof point !== "object") {
    const num = Number(point);
    if (!Number.isFinite(num)) return null;
    return { label: String(index + 1), value: num };
  }

  const valueRaw =
    point.distance_km ??
    point.value ??
    point.km ??
    point.y ??
    point.distance ??
    null;
  const num = Number(valueRaw);
  if (!Number.isFinite(num)) return null;

  const label =
    point.label ??
    point.day ??
    point.date ??
    point.timestamp ??
    point.x ??
    String(index + 1);

  return { label: String(label), value: num };
}

/**
 * React Query: GET /v1/analytics/distance-series?range={range}
 */
export function useAnalyticsDistanceSeries(range = "24h") {
  const query = useQuery({
    queryKey: queryKeys.analytics.distanceSeries(range),
    queryFn: () => getAnalyticsDistanceSeries({ range }),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8_000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const series = Array.isArray(query.data?.series)
    ? query.data.series
        .map((point, index) => mapSeriesPoint(point, index))
        .filter(Boolean)
    : [];

  return {
    ...query,
    series,
    lastUpdated: query.data?.last_updated ?? query.data?.updated_at ?? null,
  };
}

export default useAnalyticsDistanceSeries;
