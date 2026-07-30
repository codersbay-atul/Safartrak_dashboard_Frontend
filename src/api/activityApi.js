import apiClient from "./client";

/* =========================
   ACTIVITY APIs
========================= */

/**
 * GET /v1/activity/summary?period=today
 * @param {string} period
 * @returns {Promise<object>} Raw/unwrapped API payload
 */
export async function getActivitySummary(period = "today") {
  const response = await apiClient.get("/v1/activity/summary", {
    params: { period },
  });
  const payload = response?.data;

  if (
    payload &&
    typeof payload === "object" &&
    Object.prototype.hasOwnProperty.call(payload, "data") &&
    payload.data != null &&
    typeof payload.data === "object"
  ) {
    return payload.data;
  }

  return payload ?? {};
}

/**
 * GET /v1/activity?
 * @param {{ period?: string, from?: string, to?: string, vehicle?: string, driver?: string, search?: string, page?: number, page_size?: number }} [params]
 * @returns {Promise<object>} Raw/unwrapped API payload
 */
export async function getActivityList(params = {}) {
  const normalizedParams = {
    ...params,
    vehicle: params.vehicle || undefined,
    driver: params.driver || undefined,
    search: params.search || undefined,
    page: params.page ?? 1,
    page_size: params.page_size ?? 25,
    period: params.period || undefined,
    from: params.from || undefined,
    to: params.to || undefined,
  };

  const response = await apiClient.get("/v1/activity", {
    params: normalizedParams,
  });

  const payload = response?.data;
  if (
    payload &&
    typeof payload === "object" &&
    Object.prototype.hasOwnProperty.call(payload, "data") &&
    payload.data != null &&
    typeof payload.data === "object"
  ) {
    return payload.data;
  }

  return payload ?? { activities: [], count: 0, total: 0 };
}

/**
 * GET /v1/activity/export
 * Returns a Blob response for file download.
 * @param {object} [params]
 */
export async function getActivityExport(params = {}) {
  const response = await apiClient.get("/v1/activity/export", {
    params,
    responseType: "blob",
  });

  return response;
}

/**
 * POST /v1/activity/notes
 * @param {{ unique_id: string, event_at?: string, event_kind?: string, body: string }} payload
 */
export async function postActivityNote(payload = {}) {
  const response = await apiClient.post("/v1/activity/notes", payload);
  return response?.data ?? {};
}
