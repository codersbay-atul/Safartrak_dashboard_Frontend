/**
 * Dashboard summary → StatsCard value mapping.
 *
 * ---------------------------------------------------------------------------
 * LIVE INSPECTION (2026-07-25)
 * GET https://web.backend.safartrak.zevon.systems/v1/dashboard/summary
 *
 * Unauthenticated response (actual):
 *   HTTP 401
 *   { "detail": "Authentication credentials were not provided." }
 *
 * Authenticated HTTP 200 body: NOT INSPECTED (credentials required).
 * Therefore SUMMARY_FIELD_KEYS stays empty until a 200 sample is confirmed.
 * Missing / unknown keys always render as "-". Never invent KPI numbers.
 * ---------------------------------------------------------------------------
 *
 * When you have a real 200 JSON body, set exact keys only, e.g.:
 *   totalVehicles: "total_vehicles",
 *   criticalAlerts: "critical_alerts",
 *   ...
 */

export const DASHBOARD_SUMMARY_PLACEHOLDER = {
  totalVehicles: "-",
  criticalAlerts: "-",
  maintenanceDue: "-",
  predictionAccuracy: "-",
  noGps: "-",
};

/**
 * Exact response field names for each StatsCard slot.
 * Leave null until confirmed from an authenticated 200 response.
 */
export const SUMMARY_FIELD_KEYS = {
  totalVehicles: null,
  criticalAlerts: null,
  maintenanceDue: null,
  predictionAccuracy: null,
  noGps: null,
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

function toDisplayValue(value, { asPercent = false } = {}) {
  if (isMissingValue(value)) return "-";

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

  // Dev aid: log actual keys once a 200 payload arrives so SUMMARY_FIELD_KEYS
  // can be filled without guessing.
  if (import.meta.env.DEV) {
    console.info(
      "[dashboard/summary] payload keys:",
      Object.keys(apiSummary)
    );
  }

  return {
    totalVehicles: toDisplayValue(
      readField(apiSummary, SUMMARY_FIELD_KEYS.totalVehicles)
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
