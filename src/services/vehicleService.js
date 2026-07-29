import {
  getVehicles,
  getVehiclesSummary as getVehiclesSummaryRequest,
  getVehiclesExport as getVehiclesExportRequest,
  getVehicleStats as getVehicleStatsRequest,
  patchVehicle as patchVehicleRequest,
  patchVehicleRegistration as patchVehicleRegistrationRequest,
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

export function patchVehicle(uniqueId, payload) {
  return patchVehicleRequest(uniqueId, payload);
}

export function patchVehicleRegistration(uniqueId, payload) {
  return patchVehicleRegistrationRequest(uniqueId, payload);
}
