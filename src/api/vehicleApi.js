import apiClient from "./client";

/* =========================
   VEHICLE APIs
========================= */

/**
 * GET /v1/vehicles
 *
 * @param {{ search?: string, page?: number, page_size?: number }} [params]
 * @returns {Promise<{ results: array, counts: object, total: number, page: number, page_size: number }>}
 */
export async function getVehicles(params = {}) {
  const search = String(params.search ?? "").trim();
  const page = params.page ?? 1;
  const page_size = params.page_size ?? 25;

  const response = await apiClient.get("/v1/vehicles", {
    params: {
      ...(search ? { search } : {}),
      page,
      page_size,
    },
  });

  const payload = response?.data?.data ?? response?.data ?? {};

  return {
    results: Array.isArray(payload.results) ? payload.results : [],
    counts:
      payload.counts && typeof payload.counts === "object"
        ? payload.counts
        : {},
    total: payload.total ?? 0,
    page: payload.page ?? page,
    page_size: payload.page_size ?? page_size,
  };
}
