import { getFleetHealth as getFleetHealthRequest } from "../api/fleetApi";

/**
 * Fleet service layer.
 */

/**
 * Load fleet health widget data from GET /v1/fleet/health.
 * @returns {Promise<object>}
 */
export function getFleetHealth() {
  return getFleetHealthRequest();
}
