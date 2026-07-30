import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { toast } from "../components/Ui/toast";
import { getDashboardHealth } from "../services/dashboardService";

const ERROR_TOAST = "Unable to load dashboard health data.";

function isMissingValue(value) {
  if (value == null) return true;
  if (typeof value === "number" && Number.isNaN(value)) return true;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "" || trimmed.toLowerCase() === "nan") return true;
  }
  return false;
}

function toDisplayCount(value) {
  if (isMissingValue(value)) return "-";
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return String(value);
  return String(num);
}

function toNumber(value) {
  if (isMissingValue(value)) return 0;
  const num = typeof value === "number" ? value : Number(value);
  return Number.isFinite(num) ? num : 0;
}

/**
 * Normalize a health series point.
 */
export function mapHealthSeriesPoint(point) {
  if (point == null || typeof point !== "object") return null;
  return {
    label: point.label != null ? String(point.label) : "",
    healthy: toNumber(point.healthy),
    warning: toNumber(point.warning),
    critical: toNumber(point.critical),
    unknown: toNumber(point.unknown),
  };
}

/**
 * Map `current` counts for the bottom summary chips.
 */
export function mapHealthCurrent(current = {}) {
  const source = current && typeof current === "object" ? current : {};

  const vehicle =
    source.vehicles ??
    source.vehicle ??
    source.total ??
    source.total_vehicles ??
    null;

  return {
    vehicle: toDisplayCount(vehicle),
    healthy: toDisplayCount(source.healthy),
    warning: toDisplayCount(source.warning),
    critical: toDisplayCount(source.critical),
    alert: toDisplayCount(source.alert ?? source.unknown),
  };
}

/**
 * React Query: GET /v1/dashboard/health?range={range}
 */
export function useDashboardHealth(range = "24h") {
  const lastToastAtRef = useRef(null);

  const query = useQuery({
    queryKey: queryKeys.dashboard.health(range),
    queryFn: () => getDashboardHealth({ range }),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8_000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (!query.isError) return;
    if (lastToastAtRef.current === query.errorUpdatedAt) return;
    lastToastAtRef.current = query.errorUpdatedAt;
    toast.error(ERROR_TOAST);
  }, [query.isError, query.errorUpdatedAt]);

  const series = Array.isArray(query.data?.series)
    ? query.data.series.map(mapHealthSeriesPoint).filter(Boolean)
    : [];

  const current = mapHealthCurrent(query.data?.current);
  const scorePct = isMissingValue(query.data?.score_pct)
    ? null
    : Number(query.data.score_pct);

  return {
    ...query,
    series,
    current,
    scorePct: Number.isFinite(scorePct) ? scorePct : null,
    lastUpdated:
      query.data?.last_updated ?? query.data?.updated_at ?? null,
  };
}

export default useDashboardHealth;
