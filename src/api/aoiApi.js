import apiClient from "./client";

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
 * DELETE /v1/aoi/:aoiId
 * @returns {Promise<object>} Delete response payload from the server
 */
export async function deleteAoi(aoiId) {
  const response = await apiClient.delete(`/v1/aoi/${aoiId}`);
  return response?.data?.data ?? response?.data ?? {};
}
