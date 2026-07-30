import apiClient from "./client";

/* =========================
   ANALYTICS APIs
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
 * GET /v1/analytics/summary?range={range}
 * @param {{ range?: string }} [params]
 */
export async function getAnalyticsSummary(params = {}) {
  const range = params.range ?? "24h";
  const response = await apiClient.get("/v1/analytics/summary", {
    params: { range },
  });
  return unwrapPayload(response);
}

/**
 * GET /v1/analytics/distance-series?range={range}
 * @param {{ range?: string }} [params]
 */
export async function getAnalyticsDistanceSeries(params = {}) {
  const range = params.range ?? "24h";
  const response = await apiClient.get("/v1/analytics/distance-series", {
    params: { range },
  });
  const payload = unwrapPayload(response);

  return {
    ...payload,
    series: Array.isArray(payload.series) ? payload.series : [],
  };
}

/**
 * GET /v1/analytics/performance?range={range}&sort=distance
 * @param {{ range?: string, sort?: string }} [params]
 */
export async function getAnalyticsPerformance(params = {}) {
  const range = params.range ?? "24h";
  const sort = params.sort ?? "distance";
  const response = await apiClient.get("/v1/analytics/performance", {
    params: { range, sort },
  });
  const payload = unwrapPayload(response);

  return {
    ...payload,
    results: Array.isArray(payload.results) ? payload.results : [],
  };
}

/**
 * GET /v1/analytics/export?range={range}
 * Returns a file (CSV/Excel) as a binary blob.
 * @param {{ range?: string }} [params]
 */
export async function getAnalyticsExport(params = {}) {
  const range = params.range ?? "24h";
  const response = await apiClient.get("/v1/analytics/export", {
    params: { range },
    responseType: "blob",
  });
  return response;
}
