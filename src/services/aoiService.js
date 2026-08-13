import {
  createAoi as createAoiRequest,
  updateAoi as updateAoiRequest,
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
 * Create an AOI.
 * @returns {Promise<object>} Unwrapped API payload
 */
export function createAoi(payload) {
  return createAoiRequest(payload);
}

/**
 * Update an AOI by id.
 * @param {string} aoiId - The AOI ID to update
 * @param {object} payload - Update payload
 * @returns {Promise<object>} Unwrapped API payload
 */
export function updateAoi(aoiId, payload) {
  return updateAoiRequest(aoiId, payload);
}

export function deleteAoi(aoiId) {
  return deleteAoiRequest(aoiId);
}
