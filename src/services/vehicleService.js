import { getVehicles } from "../api/vehicleApi";

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
