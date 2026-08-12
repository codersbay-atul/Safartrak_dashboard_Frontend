import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryKeys";
import { toast } from "../components/Ui/toast";
import { getFleetHealth } from "../services/fleetService";

const ERROR_TOAST = "Unable to load fleet health data.";

const PLACEHOLDER = {
  scorePct: "Not Available",
  scoreWidth: 0,
  label: "Not Available",
  healthy: "Not Available",
  warning: "Not Available",
  critical: "Not Available",
  offline: "Not Available",
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

function toDisplayValue(value) {
  if (isMissingValue(value)) return "Not Available";
  return String(value);
}

/**
 * Map GET /v1/fleet/health payload for the Fleet Health widget.
 */
export function mapFleetHealth(payload) {
  if (payload == null || typeof payload !== "object") {
    return { ...PLACEHOLDER };
  }

  if (
    Object.prototype.hasOwnProperty.call(payload, "detail") &&
    Object.keys(payload).length === 1
  ) {
    return { ...PLACEHOLDER };
  }

  const scoreRaw = payload.score_pct;
  const scoreNum =
    !isMissingValue(scoreRaw) && Number.isFinite(Number(scoreRaw))
      ? Number(scoreRaw)
      : null;

  return {
    scorePct: scoreNum == null ? "Not Available" : String(scoreNum),
    scoreWidth: scoreNum == null ? 0 : Math.max(0, Math.min(100, scoreNum)),
    label: toDisplayValue(payload.label),
    healthy: toDisplayValue(payload.healthy),
    warning: toDisplayValue(payload.warning),
    critical: toDisplayValue(payload.critical),
    offline: toDisplayValue(payload.offline),
  };
}

/**
 * React Query: GET /v1/fleet/health
 */
export function useFleetHealth() {
  const lastToastAtRef = useRef(null);

  const query = useQuery({
    queryKey: queryKeys.fleet.health,
    queryFn: getFleetHealth,
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

  const health = query.isError
    ? PLACEHOLDER
    : query.data
      ? mapFleetHealth(query.data)
      : PLACEHOLDER;

  return {
    ...query,
    health,
  };
}

export default useFleetHealth;
