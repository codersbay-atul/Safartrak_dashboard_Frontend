const VEHICLE_SUMMARY_PLACEHOLDER = {
  totalVehicles: "-",
  tracking: "-",
  offline: "-",
  groups: "-",
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

function readValue(source, keys = []) {
  if (!source || typeof source !== "object") return undefined;

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      return source[key];
    }
  }

  return undefined;
}

function formatMetric(value) {
  if (isMissingValue(value)) return "-";

  if (typeof value === "number") {
    return Number.isInteger(value) ? String(value) : String(value);
  }

  return String(value);
}

export function mapVehicleSummary(apiSummary) {
  if (apiSummary == null || typeof apiSummary !== "object") {
    return { ...VEHICLE_SUMMARY_PLACEHOLDER };
  }

  if (
    Object.prototype.hasOwnProperty.call(apiSummary, "detail") &&
    Object.keys(apiSummary).length === 1
  ) {
    return { ...VEHICLE_SUMMARY_PLACEHOLDER };
  }

  const totalVehicles = formatMetric(
    readValue(apiSummary, ["total_vehicles", "totalVehicles", "total", "count", "vehicles_count"])
  );

  
  const tracking = formatMetric(
    readValue(apiSummary, [
      "tracking",
      "tracking_vehicles",
      "active_vehicles",
      "active",
      "gps_connected",
      "connected_vehicles",
      "moving",
    ])
  );

  const offline = formatMetric(
    readValue(apiSummary, [
      "offline",
      "offline_vehicles",
      "disconnected_vehicles",
      "inactive_vehicles",
      "inactive",
      "idle",
    ])
  );

  const groups = formatMetric(
    readValue(apiSummary, [
      "groups",
      "fleet_groups",
      "fleet_group_count",
      "group_count",
      "groups_count",
      "fleet_groups_count",
    ])
  );

  return {
    totalVehicles,
    tracking,
    offline,
    groups,
  };
}

export default mapVehicleSummary;
