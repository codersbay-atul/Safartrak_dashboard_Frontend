import apiClient from "./client";

/**
 * POST /v1/aoi
 * @returns {Promise<object>} create response payload from the server
 */
export async function createAoi(payload = {}) {
  const response = await apiClient.post("/v1/aoi", payload);
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * GET /v1/aoi/summary
 * @returns {Promise<object>} summary payload from the server
 */
export async function getAoiSummary() {
  const response = await apiClient.get("/v1/aoi/summary");
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * GET /v1/aoi
 * Supports search, status, and geometry query options.
 * @returns {Promise<object>} AOI list payload from the server
 */
export async function getAoiList({ search = "", status = "all", geometry = false } = {}) {
  const params = {};

  if (search) {
    params.search = search;
  }

  if (status && status !== "all") {
    params.status = status;
  }

  if (geometry !== undefined) {
    params.geometry = geometry;
  }

  const response = await apiClient.get("/v1/aoi", { params });
  return response?.data?.data ?? response?.data ?? { areas: [], count: 0, total: 0 };
}

/**
 * PATCH /v1/aoi/:aoiId
 * @param {string} aoiId - The AOI ID to update
 * @param {object} payload - Update payload
 * @returns {Promise<object>} Update response payload from the server
 */
export async function updateAoi(aoiId, payload = {}) {
  const response = await apiClient.patch(`/v1/aoi/${aoiId}`, payload);
  return response?.data?.data ?? response?.data ?? {};
}

/**
 * DELETE /v1/aoi/:aoiId
 * @returns {Promise<object>} Delete response payload from the server
 */
export async function deleteAoi(aoiId) {
  const response = await apiClient.delete(`/v1/aoi/${aoiId}`);
  return response?.data?.data ?? response?.data ?? {};
}
