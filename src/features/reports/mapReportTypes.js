import {
  Route,
  CirclePause,
  Timer,
  Gauge,
  Fuel,
  MapPinned,
  Ruler,
  BellRing,
  Sparkles,
  FileText,
} from "lucide-react";

/**
 * Icon lookup by report type key only (not by display name).
 */
export const REPORT_TYPE_ICONS = {
  trip: Route,
  halt: CirclePause,
  idle: Timer,
  overspeed: Gauge,
  fuel: Fuel,
  geofence: MapPinned,
  distance: Ruler,
  alert: BellRing,
  prediction: Sparkles,
};

function isMissingText(value) {
  if (value == null) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  return false;
}

/**
 * Whether a report type should appear as an actionable card.
 */
export function isActionableReport(report) {
  if (report == null || typeof report !== "object") return false;
  return report.available === true || report.generatable === true;
}

/**
 * Map a single API report type into card props.
 */
export function mapReportType(report) {
  if (report == null || typeof report !== "object") return null;

  const type = String(
    report.type ?? report.id ?? report.key ?? report.slug ?? ""
  ).trim();
  if (!type) return null;

  const label = report.label ?? report.title ?? report.name ?? type;
  const description = isMissingText(report.description)
    ? "-"
    : String(report.description);

  return {
    id: type,
    type,
    title: String(label),
    description,
    icon: REPORT_TYPE_ICONS[type] ?? FileText,
    available: report.available === true,
    generatable: report.generatable === true,
    raw: report,
  };
}

/**
 * @param {{ reports?: array }|array|null|undefined} payload
 * @returns {array}
 */
export function mapReportTypes(payload) {
  const list = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.reports)
      ? payload.reports
      : [];

  return list.map(mapReportType).filter(Boolean).filter(isActionableReport);
}
