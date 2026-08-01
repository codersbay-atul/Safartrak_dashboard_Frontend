import {
  deleteAoi as deleteAoiRequest,
  getAoiList as getAoiListRequest,
  getAoiSummary as getAoiSummaryRequest,
} from "../api/aoiApi";

/**
 * Load AOI KPI summary from GET /v1/aoi/summary.
 * @returns {Promise<object>} Unwrapped API payload
 */
export function getAoiSummary() {
  return getAoiSummaryRequest();
}

/**
 * Load AOI list from GET /v1/aoi with optional filters.
 * @returns {Promise<object>} Unwrapped API payload
 */
export function getAoiList({ search = "", status = "all", geometry = false } = {}) {
  return getAoiListRequest({ search, status, geometry });
}

/**
 * Delete an AOI by id.
 * @returns {Promise<object>} Unwrapped API payload
 */
export function deleteAoi(aoiId) {
  return deleteAoiRequest(aoiId);
}
