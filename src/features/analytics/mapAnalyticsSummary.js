/**
 * Analytics summary → AnalyticsStatsCard value mapping.
 *
 * GET /v1/analytics/summary?range={range}
 *
 * Expected shape:
 * {
 *   metrics: {
 *     fleet_distance_km, running_time_hrs, idle_time_hrs,
 *     halt_time_hrs, fleet_score_pct
 *   },
 *   change_pct: { ...same keys... }
 * }
 */

export const ANALYTICS_SUMMARY_PLACEHOLDER = {
  fleetDistance: "-",
  runningTime: "-",
  idleTime: "-",
  haltTime: "-",
  fleetScore: "-",
  fleetDistanceChange: null,
  runningTimeChange: null,
  idleTimeChange: null,
  haltTimeChange: null,
  fleetScoreChange: null,
};

const METRIC_KEYS = {
  fleetDistance: "fleet_distance_km",
  runningTime: "running_time_hrs",
  idleTime: "idle_time_hrs",
  haltTime: "halt_time_hrs",
  fleetScore: "fleet_score_pct",
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

function readField(source, key) {
  if (!key || source == null || typeof source !== "object") return undefined;
  if (!Object.prototype.hasOwnProperty.call(source, key)) return undefined;
  return source[key];
}

function unwrapMetricValue(raw) {
  if (raw != null && typeof raw === "object" && !Array.isArray(raw)) {
    if (Object.prototype.hasOwnProperty.call(raw, "value")) return raw.value;
    if (Object.prototype.hasOwnProperty.call(raw, "amount")) return raw.amount;
  }
  return raw;
}

function unwrapMetricChange(raw) {
  if (raw != null && typeof raw === "object" && !Array.isArray(raw)) {
    if (Object.prototype.hasOwnProperty.call(raw, "change_pct")) {
      return raw.change_pct;
    }
  }
  return undefined;
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

function formatHrs(value) {
  if (isMissingValue(value)) return "-";
  return `${formatNumber(value)} hrs`;
}

function formatPct(value) {
  if (isMissingValue(value)) return "-";
  const raw = String(value).trim();
  if (raw.endsWith("%")) return raw;
  return `${formatNumber(value)}%`;
}

/**
 * @param {unknown} change
 * @returns {string|null} e.g. "+8.4% vs previous period"
 */
export function formatChangeSubtitle(change) {
  if (isMissingValue(change)) return null;
  const num = typeof change === "number" ? change : Number(change);
  if (!Number.isFinite(num)) return null;
  const sign = num > 0 ? "+" : "";
  return `${sign}${formatNumber(num)}% vs previous period`;
}

function resolveChange(metrics, changePct, key) {
  const fromChangeObj = readField(changePct, key);
  if (!isMissingValue(fromChangeObj)) return fromChangeObj;

  const metricRaw = readField(metrics, key);
  const nested = unwrapMetricChange(metricRaw);
  if (!isMissingValue(nested)) return nested;

  return null;
}

/**
 * @param {object|null|undefined} apiSummary
 */
export function mapAnalyticsSummary(apiSummary) {
  if (apiSummary == null || typeof apiSummary !== "object") {
    return { ...ANALYTICS_SUMMARY_PLACEHOLDER };
  }

  if (
    Object.prototype.hasOwnProperty.call(apiSummary, "detail") &&
    Object.keys(apiSummary).length === 1
  ) {
    return { ...ANALYTICS_SUMMARY_PLACEHOLDER };
  }

  const metrics =
    apiSummary.metrics && typeof apiSummary.metrics === "object"
      ? apiSummary.metrics
      : apiSummary;

  const changePct =
    apiSummary.change_pct && typeof apiSummary.change_pct === "object"
      ? apiSummary.change_pct
      : {};

  const fleetDistanceRaw = unwrapMetricValue(
    readField(metrics, METRIC_KEYS.fleetDistance)
  );
  const runningTimeRaw = unwrapMetricValue(
    readField(metrics, METRIC_KEYS.runningTime)
  );
  const idleTimeRaw = unwrapMetricValue(
    readField(metrics, METRIC_KEYS.idleTime)
  );
  const haltTimeRaw = unwrapMetricValue(
    readField(metrics, METRIC_KEYS.haltTime)
  );
  const fleetScoreRaw = unwrapMetricValue(
    readField(metrics, METRIC_KEYS.fleetScore)
  );

  return {
    fleetDistance: formatKm(fleetDistanceRaw),
    runningTime: formatHrs(runningTimeRaw),
    idleTime: formatHrs(idleTimeRaw),
    haltTime: formatHrs(haltTimeRaw),
    fleetScore: formatPct(fleetScoreRaw),
    fleetDistanceChange: resolveChange(
      metrics,
      changePct,
      METRIC_KEYS.fleetDistance
    ),
    runningTimeChange: resolveChange(
      metrics,
      changePct,
      METRIC_KEYS.runningTime
    ),
    idleTimeChange: resolveChange(metrics, changePct, METRIC_KEYS.idleTime),
    haltTimeChange: resolveChange(metrics, changePct, METRIC_KEYS.haltTime),
    fleetScoreChange: resolveChange(metrics, changePct, METRIC_KEYS.fleetScore),
  };
}
