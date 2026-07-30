import { getTrackSummary as getTrackSummaryRequest } from "../api/trackApi";

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
