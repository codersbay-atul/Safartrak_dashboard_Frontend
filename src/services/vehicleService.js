import {
  getVehicles,
  getVehiclesSummary as getVehiclesSummaryRequest,
  getVehiclesExport as getVehiclesExportRequest,
  getVehicleStats as getVehicleStatsRequest,
} from "../api/vehicleApi";

/**
 * Vehicle service layer.
 * Keeps feature/hooks decoupled from transport details in `api/`.
 */

/**
 * Load vehicles list from GET /v1/vehicles.
 * @param {{ search?: string, page?: number, page_size?: number }} [params]
 */
export function getVehiclesList(params) {
  return getVehicles(params);
}

export function getVehiclesSummary() {
  return getVehiclesSummaryRequest();
}

export function getVehiclesExport(params) {
  return getVehiclesExportRequest(params);
}

export function getVehicleStats(uniqueId) {
  return getVehicleStatsRequest(uniqueId);
}
