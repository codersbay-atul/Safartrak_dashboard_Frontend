import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { toast } from "../components/Ui/toast";
import { getTrackSummary } from "../services/trackService";

const ERROR_TOAST = "Unable to load track summary.";

export const TRACK_SUMMARY_PLACEHOLDER = {
  running: "Not Available",
  distanceKm: "Not Available",
  fuelL: "Not Available",
  tripsCompleted: "Not Available",
  tripsActive: "Not Available",
  avgSpeedKmh: "Not Available",
  idleTimeMin: "Not Available",
  totalVehicles: "Not Available",
};

function isMissingValue(value) {
  if (value == null) return true;
  if (typeof value === "number" && Number.isNaN(value)) return true;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (
      trimmed === "" ||
      trimmed === "-" ||
      trimmed.toLowerCase() === "nan"
    ) {
      return true;
    }
  }
  return false;
}

function formatNumber(value) {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return String(value).trim();
  return num.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

function formatPlain(value) {
  if (isMissingValue(value)) return "Not Available";
  return formatNumber(value);
}

function formatKm(value) {
  if (isMissingValue(value)) return "Not Available";
  return `${formatNumber(value)} km`;
}

function formatLiters(value) {
  if (isMissingValue(value)) return "Not Available";
  return `${formatNumber(value)} L`;
}

function formatSpeed(value) {
  if (isMissingValue(value)) return "Not Available";
  return `${formatNumber(value)} km/h`;
}

function formatIdleMinutes(value) {
  if (isMissingValue(value)) return "Not Available";
  const mins = Math.round(Number(value));
  if (!Number.isFinite(mins)) return "Not Available";
  const hours = Math.floor(mins / 60);
  const remainder = Math.abs(mins % 60);
  if (hours === 0) return `${remainder}m`;
  return `${hours}h ${remainder}m`;
}

/**
 * Map GET /v1/track/summary payload for Today's Summary widget.
 */
export function mapTrackSummary(payload) {
  if (payload == null || typeof payload !== "object") {
    return { ...TRACK_SUMMARY_PLACEHOLDER };
  }

  if (
    Object.prototype.hasOwnProperty.call(payload, "detail") &&
    Object.keys(payload).length === 1
  ) {
    return { ...TRACK_SUMMARY_PLACEHOLDER };
  }

  return {
    running: formatPlain(payload.running),
    distanceKm: formatKm(payload.distance_km),
    fuelL: formatLiters(payload.fuel_l),
    tripsCompleted: formatPlain(payload.trips_completed),
    tripsActive: formatPlain(payload.trips_active),
    avgSpeedKmh: formatSpeed(payload.avg_speed_kmh),
    idleTimeMin: formatIdleMinutes(payload.idle_time_min),
    totalVehicles: formatPlain(payload.total_vehicles),
  };
}

/**
 * React Query: GET /v1/track/summary?period={period}
 */
export function useTrackSummary(period = "today") {
  const lastToastAtRef = useRef(null);

  const query = useQuery({
    queryKey: queryKeys.tracking.summary(period),
    queryFn: () => getTrackSummary({ period }),
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

  const summary = query.isError
    ? TRACK_SUMMARY_PLACEHOLDER
    : query.data
      ? mapTrackSummary(query.data)
      : TRACK_SUMMARY_PLACEHOLDER;

  return {
    ...query,
    summary,
  };
}

export default useTrackSummary;
