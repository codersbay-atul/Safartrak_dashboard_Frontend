import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { getAnalyticsPerformance } from "../services/analyticsService";

function isMissingValue(value) {
  if (value == null) return true;
  if (typeof value === "number" && Number.isNaN(value)) return true;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "" || trimmed.toLowerCase() === "nan") return true;
  }
  return false;
}

function formatNumber(value) {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return String(value).trim();
  return num.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

function formatKm(value) {
  if (isMissingValue(value)) return "-";
  return `${formatNumber(value)} km`;
}

function formatChangePct(change) {
  if (isMissingValue(change)) return null;
  // Support `{ fleet_distance_km: n }` style objects by ignoring them here.
  if (typeof change === "object") return null;
  const num = typeof change === "number" ? change : Number(change);
  if (!Number.isFinite(num)) return null;
  const abs = formatNumber(Math.abs(num));
  return {
    value: num,
    label: `${abs}%`,
    signedLabel: `${num > 0 ? "+" : num < 0 ? "-" : ""}${abs}%`,
    isPositive: num >= 0,
  };
}

function mapSparkline(raw) {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  return raw
    .map((p) => {
      if (typeof p === "number") return Number.isFinite(p) ? p : null;
      if (p != null && typeof p === "object") {
        const v = Number(p.value ?? p.y ?? p.distance_km ?? p.km);
        return Number.isFinite(v) ? v : null;
      }
      const n = Number(p);
      return Number.isFinite(n) ? n : null;
    })
    .filter((v) => v != null);
}

/**
 * Normalize a performance result row for PerformanceSummary.
 */
export function mapPerformanceResult(item) {
  if (item == null || typeof item !== "object") return null;

  const plate =
    item.registration_number ??
    item.vehicle_number ??
    item.plate ??
    item.reg_no ??
    item.registration ??
    item.vehicle_reg ??
    null;

  const vehicleType =
    item.vehicle_type ?? item.type ?? item.category ?? item.fleet_type ?? null;

  const distanceRaw =
    item.distance_km ?? item.distance ?? item.total_distance_km ?? null;

  const change = formatChangePct(item.change_pct ?? item.change ?? null);

  const sparkline = mapSparkline(
    item.sparkline ?? item.trend ?? item.series ?? item.points ?? []
  );

  return {
    plate: isMissingValue(plate) ? "-" : String(plate),
    vehicleType: isMissingValue(vehicleType) ? "-" : String(vehicleType),
    distance: formatKm(distanceRaw),
    distanceRaw: isMissingValue(distanceRaw) ? null : Number(distanceRaw),
    change,
    sparkline,
  };
}

/**
 * React Query: GET /v1/analytics/performance?range={range}&sort=distance
 */
export function useAnalyticsPerformance(range = "24h", sort = "distance") {
  const query = useQuery({
    queryKey: queryKeys.analytics.performance(range, sort),
    queryFn: () => getAnalyticsPerformance({ range, sort }),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8_000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const totalDistanceRaw =
    query.data?.total_distance_km ??
    query.data?.total_distance ??
    query.data?.metrics?.fleet_distance_km ??
    null;

  const results = Array.isArray(query.data?.results)
    ? query.data.results.map(mapPerformanceResult).filter(Boolean)
    : [];

  const resolvedTotalDistance =
    totalDistanceRaw != null
      ? totalDistanceRaw
      : (() => {
          const nums = results
            .map((row) => row.distanceRaw)
            .filter((v) => typeof v === "number" && Number.isFinite(v));
          return nums.length > 0 ? nums.reduce((a, b) => a + b, 0) : null;
        })();

  const totalChange = formatChangePct(
    query.data?.change_pct ??
      query.data?.total_change_pct ??
      query.data?.metrics?.change_pct ??
      null
  );

  // If change_pct is an object (per-metric), prefer fleet distance key.
  const totalChangeResolved =
    totalChange ??
    (query.data?.change_pct &&
    typeof query.data.change_pct === "object" &&
    !Array.isArray(query.data.change_pct)
      ? formatChangePct(
          query.data.change_pct.fleet_distance_km ??
            query.data.change_pct.distance_km ??
            query.data.change_pct.distance
        )
      : null);

  const periodLabel =
    query.data?.period_label ??
    query.data?.date_range ??
    query.data?.period ??
    null;

  return {
    ...query,
    results,
    totalDistance: formatKm(resolvedTotalDistance),
    totalChange: totalChangeResolved,
    periodLabel: periodLabel != null ? String(periodLabel) : null,
  };
}

export default useAnalyticsPerformance;
