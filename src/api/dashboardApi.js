import apiClient from "./client";

/* =========================
   DASHBOARD APIs
========================= */

function unwrapPayload(response) {
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
 * GET /v1/dashboard/summary
 * @returns {Promise<object>} Raw/unwrapped API payload
 */
export async function getDashboardSummary() {
  const response = await apiClient.get("/v1/dashboard/summary");
  return unwrapPayload(response);
}

/**
 * GET /v1/dashboard/health?range={range}
 * @param {{ range?: "24h"|"7d"|"30d" }} [params]
 * @returns {Promise<object>}
 */
export async function getDashboardHealth(params = {}) {
  const range = params.range ?? "24h";
  const response = await apiClient.get("/v1/dashboard/health", {
    params: { range },
  });
  const payload = unwrapPayload(response);

  return {
    ...payload,
    series: Array.isArray(payload.series) ? payload.series : [],
    current:
      payload.current && typeof payload.current === "object"
        ? payload.current
        : {},
  };
}

/**
 * GET /v1/dashboard/export
 * Returns a file blob for download
 * @param {object} [params]
 */
export async function getDashboardExport(params = {}) {
  const response = await apiClient.get("/v1/dashboard/export", {
    params,
    responseType: "blob",
  });

  return response;
}

/** @deprecated Prefer getDashboardSummary — kept for existing imports. */
export const fetchDashboardSummary = getDashboardSummary;
