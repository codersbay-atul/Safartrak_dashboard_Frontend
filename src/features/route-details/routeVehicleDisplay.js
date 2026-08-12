/**
 * Shared display helpers for Route Dashboard (selected vehicle only).
 * No hardcoded trip/route values.
 */

export function displayOrDash(value) {
  if (value == null) return "Not Available";

  if (typeof value === "string") {
    const normalizedValue = value.trim();
    if (normalizedValue === "" || normalizedValue === "-") {
      return "Not Available";
    }
  }

  return String(value);
}

function readRaw(vehicle) {
  return vehicle?.raw && typeof vehicle.raw === "object" ? vehicle.raw : {};
}

function readSpeedKmh(vehicle) {
  const raw = readRaw(vehicle);
  const fromRaw = raw.speed_kmh ?? raw.speedKmh;
  if (fromRaw != null && fromRaw !== "" && fromRaw !== "-") {
    const n = Number(fromRaw);
    return Number.isFinite(n) ? n : null;
  }

  const mapped = vehicle?.speed;
  if (
    mapped == null ||
    mapped === "-" ||
    mapped === "Not Available" ||
    mapped === ""
  ) {
    return null;
  }
  const parsed = Number(String(mapped).replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * True when API provides any active-trip / route fields.
 */
export function hasActiveTripData(vehicle) {
  if (!vehicle) return false;
  const raw = readRaw(vehicle);

  const candidates = [
    raw.trip_id,
    raw.tripId,
    raw.active_trip,
    raw.activeTrip,
    raw.eta,
    raw.trip_progress,
    raw.tripProgress,
    raw.trip_progress_pct,
    raw.remaining_distance_km,
    raw.remainingDistanceKm,
    raw.remaining_km,
    raw.origin,
    raw.destination,
    raw.route_origin,
    raw.route_destination,
    vehicle.tripId,
    vehicle.eta,
    vehicle.tripProgress,
    vehicle.remainingDistance,
    vehicle.origin,
    vehicle.destination,
  ];

  return candidates.some((value) => {
    if (value == null) return false;
    if (typeof value === "string" && value.trim() === "") return false;
    if (typeof value === "boolean") return value === true;
    return true;
  });
}

export function isVehicleOffline(vehicle) {
  if (!vehicle) return true;
  const raw = readRaw(vehicle);
  const status = String(raw.status ?? vehicle.status ?? "")
    .toLowerCase()
    .trim();
  const device = String(raw.device_status ?? vehicle.deviceStatus ?? "")
    .toLowerCase()
    .trim();

  return status.includes("off") || device.includes("off");
}

/**
 * Route view rule: offline, speed 0, or no trip/route data → treat as no active trip.
 */
export function shouldShowNoActiveTrip(vehicle) {
  if (!vehicle) return true;
  if (isVehicleOffline(vehicle)) return true;

  const speed = readSpeedKmh(vehicle);
  if (speed != null && speed === 0) return true;

  if (!hasActiveTripData(vehicle)) return true;

  return false;
}

/**
 * Status label for route panel.
 * When no active trip (offline / speed 0 / missing trip data) → Offline.
 */
export function resolveRouteStatusLabel(vehicle) {
  if (shouldShowNoActiveTrip(vehicle)) return "Offline";

  const raw = readRaw(vehicle);
  if (raw.in_maintenance === true || raw.inMaintenance === true) {
    return "Maintenance";
  }

  const status = String(raw.status ?? "").toLowerCase().trim();
  if (status === "moving") return "Running";
  if (status === "idle") return "Idle";
  if (status === "offline") return "Offline";

  const mapped = vehicle?.status;
  if (mapped != null && String(mapped).trim() !== "") {
    return String(mapped);
  }

  return "Not Available";
}

export function getTripField(vehicle, keys) {
  if (!vehicle) return null;
  const raw = readRaw(vehicle);
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(raw, key) && raw[key] != null) {
      return raw[key];
    }
    if (
      Object.prototype.hasOwnProperty.call(vehicle, key) &&
      vehicle[key] != null
    ) {
      return vehicle[key];
    }
  }
  return null;
}
