/**
 * Map GET /v1/vehicles payload → VehiclesList UI shape.
 * Keep display fields compatible with existing list / details / map consumers.
 */

import { formatLastSeen } from "../../utils/formatLastSeen";

const STATUS_TEXT_CLASS = {
  Running: "text-[#10b981]",
  Idle: "text-[#f59e0b]",
  Critical: "text-[#f97316]",
  Offline: "text-[#ef4444]",
};

function normalizeStatusLabel(status) {
  const raw = String(status ?? "").trim();
  if (!raw) return "Offline";

  const lower = raw.toLowerCase();
  if (lower.includes("idle")) return "Idle";
  if (lower.includes("crit")) return "Critical";
  if (lower.includes("off")) return "Offline";
  if (
    lower.includes("run") ||
    lower.includes("mov") ||
    lower.includes("active") ||
    lower.includes("track")
  ) {
    return "Running";
  }

  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function formatSpeed(speedKmh) {
  if (speedKmh == null || speedKmh === "" || speedKmh === "-") {
    return "Not Available";
  }
  const n = Number(speedKmh);
  if (Number.isNaN(n)) return String(speedKmh);
  return `${n} km/h`;
}

function displayOrDash(value) {
  if (value == null) return "Not Available";

  if (typeof value === "string") {
    const normalizedValue = value.trim();
    if (normalizedValue === "" || normalizedValue === "-") {
      return "Not Available";
    }
  }

  return String(value);
}

/**
 * @param {object} item - Single API vehicle row
 */
export function mapVehicleItem(item) {
  if (!item || typeof item !== "object") return null;

  const status = normalizeStatusLabel(item.status);
  const lat = item.lat != null ? Number(item.lat) : null;
  const lng = item.lng != null ? Number(item.lng) : null;
  const hasPosition =
    lat != null &&
    lng != null &&
    !Number.isNaN(lat) &&
    !Number.isNaN(lng);

  const uniqueId = item.unique_id ?? item.uniqueId ?? null;
  const vehicleNumber = item.vehicle_number ?? item.vehicleNumber ?? null;
  const driverName = item.driver_name ?? item.driverName ?? null;
  const fleetGroup = item.fleet_group ?? item.fleetGroup ?? null;
  const vehicleType = item.vehicle_type ?? item.vehicleType ?? null;
  const model = item.model ?? null;
  const deviceStatus = item.device_status ?? item.deviceStatus ?? null;
  const inMaintenance = item.in_maintenance ?? item.inMaintenance;
  const lastUpdatedSec = item.last_updated_sec ?? item.lastUpdatedSec;
  const speedKmh = item.speed_kmh ?? item.speedKmh;

  return {
    id: uniqueId ?? vehicleNumber ?? item.id,
    statsId: uniqueId ?? item.id,
    uniqueId: displayOrDash(uniqueId),
    plate: displayOrDash(vehicleNumber),
    status,
    statusColor: STATUS_TEXT_CLASS[status] || "text-[#a1a1aa]",
    driver: displayOrDash(driverName),
    info: formatLastSeen(lastUpdatedSec),
    lastUpdated: formatLastSeen(lastUpdatedSec),
    speed: formatSpeed(speedKmh),
    location: displayOrDash(fleetGroup),
    fleetGroup: displayOrDash(fleetGroup),
    type: displayOrDash(vehicleType),
    model: displayOrDash(model),
    deviceStatus: displayOrDash(deviceStatus),
    inMaintenance:
      typeof inMaintenance === "boolean"
        ? inMaintenance
          ? "Yes"
          : "No"
        : "Not Available",
    lat: hasPosition ? lat : null,
    lng: hasPosition ? lng : null,
    latDisplay: hasPosition ? String(lat) : "Not Available",
    lngDisplay: hasPosition ? String(lng) : "Not Available",
    position: hasPosition ? [lat, lng] : undefined,
    raw: item,
  };
}

/**
 * @param {object|null|undefined} payload - getVehicles() result
 */
export function mapVehiclesList(payload) {
  const results =
    Array.isArray(payload?.results)
      ? payload.results
      : Array.isArray(payload?.items)
        ? payload.items
        : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.vehicles)
            ? payload.vehicles
            : [];

  const vehicles = results.map(mapVehicleItem).filter(Boolean);
  const counts =
    payload?.counts && typeof payload.counts === "object"
      ? payload.counts
      : payload?.count && typeof payload.count === "object"
        ? payload.count
        : {};

  return {
    vehicles,
    counts,
    total: payload?.total ?? payload?.count ?? vehicles.length,
    page: payload?.page ?? 1,
    pageSize: payload?.page_size ?? payload?.pageSize ?? 25,
  };
}

/**
 * Map API counts → existing filter tab labels.
 * Tabs: All, Moving, Idle, Critical, Offline
 */
export function mapVehicleFilterCounts(counts = {}, total = null) {
  const c = counts && typeof counts === "object" ? counts : {};

  return {
    All: c.all ?? total ?? null,
    Moving: c.moving ?? c.active ?? c.tracking ?? null,
    Idle: c.idle ?? null,
    Critical: c.critical ?? null,
    Offline: c.offline ?? null,
  };
}
