/**
 * Dashboard summary → StatsCard value mapping.
 *
 * GET /api/client/dashboard/summary
 * Unwrapped payload: { summary: { totalVehicles, moving, idle, offline, noGps, ... } }
 */

export const DASHBOARD_SUMMARY_PLACEHOLDER = {
  totalVehicles: "Not Available",
  inactiveVehicles: "Not Available",
  activeVehiclesRegistered: "Not Available",
  moving: "Not Available",
  movingSubtitle: "of Total Fleet",
  idle: "Not Available",
  idleSubtitle: "of Total Fleet",
  offline: "Not Available",
  offlineSubtitle: "Need Attention",
  noGps: "Not Available",
  noGpsSubtitle: "Last Sync: Not Available",
  critical: "Not Available",
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

function readCount(source) {
  if (source == null) return undefined;
  if (typeof source === "number") return source;
  if (typeof source === "object" && !isMissingValue(source.count)) {
    return source.count;
  }
  return undefined;
}

function formatPercentSubtitle(bucket, fallbackLabel = "of Total Fleet") {
  if (!bucket || typeof bucket !== "object") return fallbackLabel;

  const label =
    !isMissingValue(bucket.label) && typeof bucket.label === "string"
      ? bucket.label.trim()
      : fallbackLabel;

  if (isMissingValue(bucket.percent)) return label;

  const raw = String(bucket.percent).trim();
  const percent = raw.endsWith("%") ? raw : `${raw}%`;
  return `${percent} ${label}`;
}

function formatNoGpsSubtitle(noGps) {
  if (!noGps || typeof noGps !== "object") return "Last Sync: Not Available";

  if (!isMissingValue(noGps.lastSyncAgo)) {
    const ago = String(noGps.lastSyncAgo).trim();
    if (/^last sync/i.test(ago)) return ago;
    return `Last Sync: ${ago}`;
  }

  return "Last Sync: Not Available";
}

function formatOfflineSubtitle(offline) {
  if (!offline || typeof offline !== "object") return "Need Attention";
  if (!isMissingValue(offline.label) && typeof offline.label === "string") {
    return offline.label.trim();
  }
  return "Need Attention";
}

function computeInactive(totalVehicles, activeVehiclesRegistered) {
  const total = Number(totalVehicles);
  const active = Number(activeVehiclesRegistered);
  if (!Number.isFinite(total) || !Number.isFinite(active)) return undefined;
  return Math.max(0, total - active);
}

/**
 * Accepts the full envelope, unwrapped `{ summary }`, or the summary object itself.
 */
function unwrapSummary(apiSummary) {
  if (apiSummary == null || typeof apiSummary !== "object") return null;

  if (
    Object.prototype.hasOwnProperty.call(apiSummary, "detail") &&
    Object.keys(apiSummary).length === 1
  ) {
    return null;
  }

  const nested = apiSummary.summary ?? apiSummary.data?.summary;
  if (nested && typeof nested === "object") return nested;

  if (
    Object.prototype.hasOwnProperty.call(apiSummary, "totalVehicles") ||
    Object.prototype.hasOwnProperty.call(apiSummary, "moving") ||
    Object.prototype.hasOwnProperty.call(apiSummary, "idle")
  ) {
    return apiSummary;
  }

  return null;
}

/**
 * @param {object|null|undefined} apiSummary - Raw/unwrapped API payload
 */
export function mapDashboardSummary(apiSummary) {
  const summary = unwrapSummary(apiSummary);

  if (!summary || Object.keys(summary).length === 0) {
    return { ...DASHBOARD_SUMMARY_PLACEHOLDER };
  }

  const inactiveVehicles = computeInactive(
    summary.totalVehicles,
    summary.activeVehiclesRegistered
  );

  return {
    totalVehicles: toDisplayValue(summary.totalVehicles),
    inactiveVehicles: toDisplayValue(inactiveVehicles),
    activeVehiclesRegistered: toDisplayValue(summary.activeVehiclesRegistered),
    moving: toDisplayValue(readCount(summary.moving)),
    movingSubtitle: formatPercentSubtitle(summary.moving),
    idle: toDisplayValue(readCount(summary.idle)),
    idleSubtitle: formatPercentSubtitle(summary.idle),
    offline: toDisplayValue(readCount(summary.offline)),
    offlineSubtitle: formatOfflineSubtitle(summary.offline),
    noGps: toDisplayValue(readCount(summary.noGps)),
    noGpsSubtitle: formatNoGpsSubtitle(summary.noGps),
    critical: toDisplayValue(readCount(summary.critical)),
  };
}
