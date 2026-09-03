/**
 * Map GET /v1/vehicles payload (unique_id / reg_no / lat / lng).
 */

export function getVehicleApiId(vehicle) {
  if (!vehicle) return "";

  const candidates = [
    vehicle.unique_id,
    vehicle.id,
    vehicle.externalDeviceId,
    vehicle.raw?.unique_id,
    vehicle.raw?.uniqueId,
  ];

  for (const value of candidates) {
    if (value == null) continue;
    const next = String(value).trim();
    if (next) return next;
  }

  return "";
}

function statusLabel(liveStatus) {
  const raw = String(liveStatus ?? "").trim();
  if (!raw) return "Offline";

  const lower = raw.toLowerCase().replace(/[_-]+/g, " ");
  if (lower === "moving" || lower === "running") return "Moving";
  if (lower === "idle" || lower === "stopped") return "Idle";
  if (lower.includes("crit")) return "Critical";
  if (lower.includes("no gps") || lower === "nogps") return "No GPS";
  if (lower.includes("off")) return "Offline";
  if (lower === "online" || lower === "active" || lower === "tracking") {
    return "Moving";
  }

  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function lastSeenAtFromRow(device) {
  if (device.lastSeenAt != null && device.lastSeenAt !== "") {
    return device.lastSeenAt;
  }
  const seconds = Number(device.last_seen_sec);
  if (Number.isFinite(seconds)) {
    return new Date(Date.now() - seconds * 1000).toISOString();
  }
  return null;
}

function formatAgo(lastSeenAt) {
  if (lastSeenAt == null || lastSeenAt === "") return null;

  const past = new Date(lastSeenAt).getTime();
  if (Number.isNaN(past)) return null;

  const diffInSec = Math.max(0, Math.floor((Date.now() - past) / 1000));
  if (diffInSec < 60) return `${diffInSec} sec ago`;

  const diffInMin = Math.floor(diffInSec / 60);
  if (diffInMin < 60) return `${diffInMin} min ago`;

  const hours = Math.floor(diffInMin / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function resolveLiveStatus(device) {
  const explicit =
    device.liveStatus ?? device.live_status ?? device.status ?? null;
  if (explicit != null && String(explicit).trim() !== "") return explicit;

  const speed =
    device.speed_kmh != null
      ? Number(device.speed_kmh)
      : device.lastSpeed != null
        ? Number(device.lastSpeed)
        : 0;
  if (!Number.isNaN(speed) && speed > 0) return "moving";
  const lat = device.lat ?? device.lastLat;
  const lng = device.lng ?? device.lastLng;
  if (lat == null || lng == null) return "no_gps";
  return "idle";
}

function toCoord(value) {
  if (value == null || value === "") return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

/**
 * @param {object} item - Single API vehicle/device row
 */
export function mapVehicleItem(item) {
  if (!item || typeof item !== "object") return null;

  const device = item;
  const uniqueId =
    device.unique_id ||
    device.uniqueId ||
    device.externalDeviceId ||
    device._id ||
    device.id;
  const liveStatus = resolveLiveStatus(device);
  const lastSeenAt = lastSeenAtFromRow(device);
  const speed =
    device.speed_kmh != null
      ? Number(device.speed_kmh)
      : device.lastSpeed != null
        ? Number(device.lastSpeed)
        : 0;

  return {
    id: uniqueId,
    unique_id: uniqueId,
    vehicleNumber:
      device.reg_no ||
      device.vehicleNumber ||
      device.vehicle_number ||
      device.name,
    externalDeviceId: uniqueId,
    name: device.name || device.reg_no || device.vehicleNumber,
    vehicleType: device.vehicle_type || device.vehicleType,
    driverName: device.driver_name || device.driverName,
    liveStatus,
    statusLabel: statusLabel(liveStatus),
    speed: Number.isNaN(speed) ? 0 : speed,
    city: device.city || device.lastCity,
    address: device.address || device.lastAddress,
    lastSeenAt,
    lastSeenAgo: formatAgo(lastSeenAt),
    lat: toCoord(device.lat ?? device.lastLat),
    lng: toCoord(device.lng ?? device.lastLng),
    raw: device,
  };
}

/**
 * @param {object|null|undefined} payload - getVehicles() result
 */
export function mapVehiclesList(payload) {
  const results = Array.isArray(payload?.vehicles)
    ? payload.vehicles
    : Array.isArray(payload?.results)
      ? payload.results
      : [];

  const pagination =
    payload?.pagination && typeof payload.pagination === "object"
      ? payload.pagination
      : {};

  return {
    vehicles: results.map(mapVehicleItem).filter(Boolean),
    counts:
      payload?.counts && typeof payload.counts === "object"
        ? payload.counts
        : {},
    total: pagination.total ?? payload?.total ?? 0,
    page: pagination.page ?? payload?.page ?? 1,
    pageSize: pagination.limit ?? payload?.page_size ?? payload?.limit ?? 25,
  };
}

/**
 * Map API counts → existing filter tab labels.
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
