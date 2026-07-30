import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Battery, Wrench, Thermometer, AlertTriangle } from "lucide-react";
import { queryKeys } from "../api/queryKeys";
import { toast } from "../components/Ui/toast";
import { getActions } from "../services/actionsService";

const ERROR_TOAST = "Unable to load actions.";

const COMPONENT_VISUALS = {
  battery: { icon: Battery, iconBg: "#5A0028" },
  brake: { icon: Wrench, iconBg: "#5A2D00" },
  engine: { icon: Thermometer, iconBg: "#4D2800" },
  temperature: { icon: Thermometer, iconBg: "#4D2800" },
  fuel: { icon: AlertTriangle, iconBg: "#4D0A0A" },
  alert: { icon: AlertTriangle, iconBg: "#4D0A0A" },
};

const DEFAULT_VISUAL = { icon: AlertTriangle, iconBg: "#4D0A0A" };

const SEVERITY_COLORS = {
  critical: "#FF3B30",
  high: "#FF7A00",
  medium: "#FFD84D",
  low: "#22C55E",
};

function isMissingValue(value) {
  if (value == null) return true;
  if (typeof value === "number" && Number.isNaN(value)) return true;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "" || trimmed.toLowerCase() === "nan") return true;
  }
  return false;
}

function toDisplayValue(value) {
  if (isMissingValue(value)) return "-";
  return String(value);
}

function resolveSeverityColor(severity) {
  if (isMissingValue(severity)) return SEVERITY_COLORS.medium;
  const key = String(severity).trim().toLowerCase();
  return SEVERITY_COLORS[key] ?? SEVERITY_COLORS.medium;
}

/**
 * Map a single action API item into Action Center row props.
 */
export function mapActionItem(item, index = 0) {
  if (item == null || typeof item !== "object") return null;

  const componentKey = String(item.component ?? item.type ?? "")
    .trim()
    .toLowerCase();
  const visual = COMPONENT_VISUALS[componentKey] ?? DEFAULT_VISUAL;
  const severity = toDisplayValue(item.severity);

  return {
    id: item.id ?? `action-${index}`,
    title: toDisplayValue(item.title),
    vehicle: toDisplayValue(item.vehicle),
    component: toDisplayValue(item.component),
    severity,
    severityColor: resolveSeverityColor(item.severity),
    status: toDisplayValue(item.status),
    startedAt: toDisplayValue(item.started_at),
    amount: toDisplayValue(item.impact_amount),
    icon: visual.icon,
    iconBg: visual.iconBg,
  };
}

/**
 * React Query: GET /v1/actions
 */
export function useActions() {
  const lastToastAtRef = useRef(null);

  const query = useQuery({
    queryKey: queryKeys.actions.all,
    queryFn: getActions,
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

  const actions = Array.isArray(query.data?.actions)
    ? query.data.actions.map(mapActionItem).filter(Boolean)
    : [];

  return {
    ...query,
    actions,
  };
}

export default useActions;
