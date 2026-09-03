import {
  TriangleAlert,
  ShieldAlert,
  Bell,
  FileCheck,
  Zap,
  KeyRound,
  WifiOff,
  BatteryLow,
  Wrench,
  MapPinned,
  Gauge,
  Activity,
  Siren,
  Truck,
  Pause,
  Fuel,
  Thermometer,
  AlertTriangle,
} from "lucide-react";

const ALERT_TYPE_ICONS = {
  "power-cut": Zap,
  power_cut: Zap,
  powercut: Zap,
  ignition: KeyRound,
  "no-data": WifiOff,
  no_data: WifiOff,
  nodata: WifiOff,
  "low-battery": BatteryLow,
  low_battery: BatteryLow,
  lowbattery: BatteryLow,
  tampering: Wrench,
  geofence: MapPinned,
  aoi: MapPinned,
  overspeed: Gauge,
  harsh: Activity,
  sos: Siren,
  panic: Siren,
  towing: Truck,
  idle: Pause,
  fuel: Fuel,
  temperature: Thermometer,
};

function isMissing(value) {
  if (value == null) return true;
  if (typeof value === "number" && Number.isNaN(value)) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  return false;
}

function toDisplay(value) {
  if (isMissing(value)) return "-";
  return String(value);
}

function toCountDisplay(value) {
  if (isMissing(value)) return "-";
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  return String(n);
}

function capitalizeSeverity(value) {
  if (isMissing(value)) return "-";
  const raw = String(value).trim();
  if (!raw) return "-";
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

/**
 * Format API datetime for the existing Date & Time column.
 */
export function formatAlertDateTime(value) {
  if (isMissing(value)) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Map a single alert from GET /v1/alerts into existing table row shape.
 * Columns stay the same; values come from API fields.
 */
export function mapAlertItem(item, index = 0) {
  if (item == null || typeof item !== "object") return null;

  const type = String(item.type ?? "").trim();
  const severity = capitalizeSeverity(item.severity);

  return {
    id: item.id ?? `alert-${index}`,
    alertId: toDisplay(item.id),
    type,
    severity,
    status: severity,
    apiStatus: toDisplay(item.status),
    vehicle: toDisplay(item.vehicle),
    component: toDisplay(item.component),
    message: toDisplay(item.message),
    coveragePct: isMissing(item.coverage_pct) ? null : Number(item.coverage_pct),
    // Existing table columns (unchanged headers)
    dateTime: formatAlertDateTime(item.started_at),
    driver: toDisplay(item.component),
    location: toDisplay(item.message),
    recordedSpeed: null,
    speedLimit: null,
    fleet: item.fleet != null ? String(item.fleet).toLowerCase() : null,
    raw: item,
  };
}

/**
 * Map GET /v1/alerts payload → table rows.
 */
export function mapAlertsList(payload) {
  const list = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.alerts)
      ? payload.alerts
      : [];

  return list.map(mapAlertItem).filter(Boolean);
}

/**
 * Map GET /v1/alerts/types → chip grid items.
 */
export function mapAlertTypes(payload) {
  const list = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.types)
      ? payload.types
      : [];

  return list
    .map((item, index) => {
      if (item == null || typeof item !== "object") return null;

      const type = String(item.type ?? item.id ?? item.key ?? "").trim();
      if (!type) return null;

      const label = toDisplay(item.label ?? item.title ?? item.name ?? type);
      const countRaw = item.count;
      const count =
        countRaw == null || countRaw === ""
          ? null
          : Number.isFinite(Number(countRaw))
            ? Number(countRaw)
            : null;

      return {
        id: type,
        type,
        label: label === "-" ? type : label,
        count: count && count > 0 ? count : null,
        icon: ALERT_TYPE_ICONS[type.toLowerCase()] ?? AlertTriangle,
        raw: item,
        _index: index,
      };
    })
    .filter(Boolean);
}

/**
 * Build existing AlertsStats card models from summary + count APIs.
 * UI structure/titles/accents stay identical.
 */
export function mapAlertStatsCards(summary, count, { isLoading = false } = {}) {
  const s = summary && typeof summary === "object" ? summary : {};
  const c = count && typeof count === "object" ? count : {};

  const total = toCountDisplay(c.total ?? s.total);
  const critical = toCountDisplay(c.critical ?? s.critical);
  const high = toCountDisplay(c.high ?? s.high);
  const newCount = toCountDisplay(s.new);
  const resolved = toCountDisplay(s.resolved);

  const valueOrDash = (value) => (isLoading ? "-" : value);

  const criticalLabel = critical === "-" ? "0" : critical;
  const highLabel = high === "-" ? "0" : high;

  return [
    {
      id: "total",
      icon: TriangleAlert,
      value: valueOrDash(total),
      subtitle: isLoading
        ? "Loading..."
        : `${criticalLabel} Critical, ${highLabel} High`,
      title: "Total Alerts",
      accent: "red",
    },
    {
      id: "critical",
      icon: ShieldAlert,
      value: valueOrDash(critical),
      subtitle: "Requires immediate attention",
      title: "Critical Alerts",
      accent: "red",
    },
    {
      id: "new",
      icon: Bell,
      value: valueOrDash(newCount),
      subtitle: "Not yet reviewed",
      title: "New Alerts",
      accent: "yellow",
    },
    {
      id: "resolved",
      icon: FileCheck,
      value: valueOrDash(resolved),
      subtitle: "Issues handled",
      title: "Resolved",
      accent: "green",
    },
  ];
}

/**
 * Default from/to for geofence (saved place) alerts when no date UI is present.
 */
export function getDefaultGeofenceRange() {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 30);

  const toIsoDate = (d) => d.toISOString().slice(0, 10);

  return {
    from: toIsoDate(from),
    to: toIsoDate(to),
  };
}

export function isGeofenceAlertType(type) {
  const key = String(type ?? "")
    .trim()
    .toLowerCase();
  return key === "geofence" || key === "aoi";
}
