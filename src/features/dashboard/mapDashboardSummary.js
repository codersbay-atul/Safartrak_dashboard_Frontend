/**
 * Dashboard summary → StatsCard value mapping.
 *
 * GET /v1/dashboard/summary (authenticated)
 */

export const DASHBOARD_SUMMARY_PLACEHOLDER = {
  totalVehicles: "Not Available",
  activeVehicles: "Not Available",
  criticalAlerts: "Not Available",
  maintenanceDue: "Not Available",
  predictionAccuracy: "Not Available",
  noGps: "Not Available",
};

/**
 * Exact response field names for each StatsCard slot.
 */
export const SUMMARY_FIELD_KEYS = {
  totalVehicles: "total_vehicles",
  activeVehicles: "active_vehicles",
  criticalAlerts: "critical_alerts",
  maintenanceDue: "maintenance_due",
  predictionAccuracy: "prediction_accuracy_pct",
  // Closest existing widget to offline vehicles (no dedicated Offline card).
  noGps: "offline_vehicles",
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

function toDisplayValue(value, { asPercent = false } = {}) {
  if (isMissingValue(value)) return "Not Available";

  if (asPercent) {
    const raw = String(value).trim();
    if (raw.endsWith("%")) return raw;
    return `${raw}%`;
  }

  return String(value);
}

function readField(source, key) {
  if (!key || source == null || typeof source !== "object") return undefined;
  if (!Object.prototype.hasOwnProperty.call(source, key)) return undefined;
  return source[key];
}

/**
 * @param {object|null|undefined} apiSummary - Raw/unwrapped API payload
 */
export function mapDashboardSummary(apiSummary) {
  if (apiSummary == null || typeof apiSummary !== "object") {
    return { ...DASHBOARD_SUMMARY_PLACEHOLDER };
  }

  // Ignore auth-error shaped payloads — not KPI data.
  if (
    Object.prototype.hasOwnProperty.call(apiSummary, "detail") &&
    Object.keys(apiSummary).length === 1
  ) {
    return { ...DASHBOARD_SUMMARY_PLACEHOLDER };
  }

  if (Object.keys(apiSummary).length === 0) {
    return { ...DASHBOARD_SUMMARY_PLACEHOLDER };
  }

  return {
    totalVehicles: toDisplayValue(
      readField(apiSummary, SUMMARY_FIELD_KEYS.totalVehicles)
    ),
    activeVehicles: toDisplayValue(
      readField(apiSummary, SUMMARY_FIELD_KEYS.activeVehicles)
    ),
    criticalAlerts: toDisplayValue(
      readField(apiSummary, SUMMARY_FIELD_KEYS.criticalAlerts)
    ),
    maintenanceDue: toDisplayValue(
      readField(apiSummary, SUMMARY_FIELD_KEYS.maintenanceDue)
    ),
    predictionAccuracy: toDisplayValue(
      readField(apiSummary, SUMMARY_FIELD_KEYS.predictionAccuracy),
      { asPercent: true }
    ),
    noGps: toDisplayValue(readField(apiSummary, SUMMARY_FIELD_KEYS.noGps)),
  };
}
