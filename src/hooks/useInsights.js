import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Battery, Wrench, Truck, Thermometer, AlertTriangle } from "lucide-react";
import { queryKeys } from "../api/queryKeys";
import { toast } from "../components/Ui/toast";
import { getInsights } from "../services/insightsService";

const ERROR_TOAST = "Unable to load insights.";

const TYPE_VISUALS = {
  battery: { icon: Battery, iconBg: "#5A0028" },
  route: { icon: Wrench, iconBg: "#5A2D00" },
  health: { icon: Truck, iconBg: "#004D22" },
  temperature: { icon: Thermometer, iconBg: "#4D2800" },
  alert: { icon: AlertTriangle, iconBg: "#4D0A0A" },
  fuel: { icon: Wrench, iconBg: "#5A2D00" },
};

const DEFAULT_VISUAL = { icon: Truck, iconBg: "#004D22" };

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
 * Map a single insight API item into AI Insights row props.
 */
export function mapInsightItem(item, index = 0) {
  if (item == null || typeof item !== "object") return null;

  const type = String(item.type ?? "").trim().toLowerCase();
  const visual = TYPE_VISUALS[type] ?? DEFAULT_VISUAL;

  return {
    id: item.id ?? `insight-${index}`,
    type,
    title: toDisplayValue(item.title),
    value: toDisplayValue(item.impact_amount),
    subtitle: toDisplayValue(item.impact_label),
    vehicle: toDisplayValue(item.vehicle),
    icon: visual.icon,
    iconBg: visual.iconBg,
  };
}

/**
 * React Query: GET /v1/insights
 */
export function useInsights() {
  const lastToastAtRef = useRef(null);

  const query = useQuery({
    queryKey: queryKeys.insights.all,
    queryFn: getInsights,
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

  const insights = Array.isArray(query.data?.insights)
    ? query.data.insights.map(mapInsightItem).filter(Boolean)
    : [];

  return {
    ...query,
    insights,
  };
}

export default useInsights;
