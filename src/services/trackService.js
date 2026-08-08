import {
  getTrackSummary as getTrackSummaryRequest,
  getTrackLocations as getTrackLocationsRequest,
} from "../api/trackApi";

/**
 * Track service layer.
 */

/**
 * Load track summary from GET /v1/track/summary?period={period}.
 * @param {{ period?: string }} [params]
 * @returns {Promise<object>}
 */
export function getTrackSummary(params) {
  return getTrackSummaryRequest(params);
}

/**
 * Load live tracking locations from GET /v1/tracking/locations.
 * @param {{}} [params]
 * @returns {Promise<object>}
 */
export function getTrackLocations(params) {
  return getTrackLocationsRequest(params);
}
